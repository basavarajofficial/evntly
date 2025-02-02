import React from 'react'
import { ModeToggle } from '@/components/ThemToggle';
import Link from 'next/link';


function Header() {
  return (
    <>
    {/* Header */}
    <header className="bg-white dark:bg-gray-800 shadow">
    <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href={"/"}>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Eventify</h1>
        </Link>
      <nav className="flex items-center space-x-4">
        <a
          href="#features"
          className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
        >
          Features
        </a>
        <a
          href="#about"
          className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
        >
          About
        </a>
        <a
          href="#contact"
          className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
        >
          Contact
        </a>
        <ModeToggle />
      </nav>
    </div>
  </header>
  </>
  )
}

export default Header
