import { Button } from '@/components/ui/button'
import { Info } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {

  return (
    <div className='container max-w-fit rounded-lg mx-auto text-center mt-20 bg-gray-500 p-4 text-slate-300 flex flex-col gap-3'>
        <div className='flex justify-center items-center gap-2'>
            <Info />
            <h1>404 - Page Not Found</h1>
        </div>
        <p className=''>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        <Link href={"/"}>
            <Button>Go to home</Button>
        </Link>
    </div>
  )
}

export default NotFound
