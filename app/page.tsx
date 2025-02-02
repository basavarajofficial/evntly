'use client';

import CreateEvent from '@/components/event/event-creation-flow';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
// import { useTheme } from 'next-themes';

export default function LandingPage(): JSX.Element {
//   const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  // Prevent hydration mismatch by ensuring the component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">


      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <section className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Manage Your Events Seamlessly
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Create, manage, and join events effortlessly with our state-of-the-art platform built on the MERN stack.
          </p>
          <a
            href="/register"
            className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition"
          >
            Get Started
          </a>
        </section>



        {/* Features Section */}
        <section id="features" className="mt-20 grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">User Authentication</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Secure login/signup with JWT and Google OAuth, ensuring role-based access for Admins, Organizers, and Participants.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Event Management</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Create, update, and delete events effortlessly. Upload images, manage statuses, and enjoy a responsive UI.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Search & Filtering</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Easily find events by name, type, location, or date with advanced search and categorization features.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Notifications & Reminders</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Receive automated email reminders and real-time notifications to stay updated on event changes.
            </p>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="mt-20 text-center">
          <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">About Our Platform</h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our event management platform leverages the MERN stack to provide a modern, efficient solution for organizing and managing events. Whether you're an admin, organizer, or participant, our intuitive interface and robust feature set ensure a seamless experience from start to finish.
          </p>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mt-20 text-center">
          <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">Get In Touch</h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-8">
            For inquiries, partnerships, or feedback, please contact us at{' '}
            <a href="mailto:info@eventify.com" className="text-blue-600 dark:text-blue-400">
              info@eventify.com
            </a>.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 shadow py-6 mt-20">
        <div className="container mx-auto text-center text-gray-600 dark:text-gray-300">
          © {new Date().getFullYear()} Eventify. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
