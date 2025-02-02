import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { registerSchema } from "@/lib/validators";


export async function POST(req: Request){
    try {
        await connectToDatabase();

        const { name, email, password } = await req.json();

        const validation = registerSchema.safeParse({ name, email, password });
            if (!validation.success) {
            return NextResponse.json(
                { error: validation.error.format() },
                { status: 400 }
            );
            }

        // Validate input
        if (!name || !email || !password) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
        return NextResponse.json(
            { error: 'Email already exists' },
            { status: 409 }
        );
        }

        //* hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        //* create a new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,role: 'participant', // Default role
            emailVerified: new Date(),
        });

        return NextResponse.json(
            { message: 'Registration successful', user: newUser },
            { status: 201 }
        )
    } catch (error: unknown) {
        return NextResponse.json(
            { error: error.message || 'Registration failed' },                                                                                          
            { status: 500 }
        );
    }
}
