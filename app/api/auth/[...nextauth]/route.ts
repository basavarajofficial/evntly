import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import clientPromise, { connectToDatabase } from "@/lib/mongodb"
import User from "@/models/user"

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials")
        }

        await connectToDatabase()

        const user = await User.findOne({ email: credentials.email })

        if (!user || !user.password) {
          throw new Error("User not found")
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordCorrect) {
          throw new Error("Invalid credentials")
        }

        return {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role || "participant",
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
        // If the provider is Google and the user's email exists,
        // consider updating the user record to include a link to the Google account.
        console.log("SignIn callback:", { user, account, profile });
        if (account.provider === "google" && !user.role) {
            user.role = "participant";
          // Retrieve the user from your database
          const existingUser = await User.findOne({ email: profile.email });
          if (existingUser) {
            // Check if the user is not yet linked to Google
            // This is a simplified example; you may want to add conditions to update only if necessary.
            if (!existingUser.googleId) {
              existingUser.googleId = profile.sub;
              await existingUser.save();
            }
          }
        }
        return true;
      },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role
        session.user.id = token.id
      }
      return session
    }
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
