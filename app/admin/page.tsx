import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'

const AdminPage = async () => {
    // const session = await getServerSession(authOptions);

    // if(session?.user?.role !== "admin"){

    }
  return (
    <div>AdminPage</div>
  )
}

export default AdminPage
