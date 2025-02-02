"use client"

import { signOut } from 'next-auth/react'
import React from 'react'
import { Button } from './ui/button'

const Logout = () => {
  return <Button onClick={() => signOut()}>log out</Button>
}

export default Logout
