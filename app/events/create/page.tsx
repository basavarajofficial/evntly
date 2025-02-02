import CreateEventForm from '@/components/CreateEventForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function CreateEventPage() {
  const session = await getServerSession(authOptions);

  // Redirect unauthenticated users
  if (!session?.user) {
    redirect('/login');
  }

  // Check user role
  if (session.user.role !== 'admin' && session.user.role !== 'organizer') {
    redirect('/');
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Create New Event</h1>
      <CreateEventForm />
    </div>
  );
}
