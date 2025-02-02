// 'use client'

// app/dashboard/page.tsx
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { signOut } from 'next-auth/react'
import Logout from '@/components/Logout'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
//   console.log(session?.user);


  if (!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto dark:bg-gray-800 rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className=" p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Welcome, {session.user?.name}!</h2>
          <p>Role: {session.user?.role}</p>
          <p>Email: {session.user?.email}</p>
        {/* <button className='bg-black text-white' onClick={() => signOut()}>log out</button> */}
        <Logout />
        </div>
      </div>
    </div>
  )
}
