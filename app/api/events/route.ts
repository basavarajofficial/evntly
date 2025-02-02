import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { z } from 'zod';
import { Event } from '@/models/events';
import { connectToDatabase } from '@/lib/mongodb';

const eventSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  date: z.string().datetime(),
  location: z.string().min(3),
  type: z.enum(['online', 'offline']),
  image: z.string().optional(),
});

export async function POST(req: Request) {
  await connectToDatabase();
  const session = await getServerSession(authOptions);

  // Authentication check
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Authorization check
  if (session.user.role !== 'admin' && session.user.role !== 'organizer') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const validation = eventSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.format() },
        { status: 400 }
      );
    }

    // Create event
    const event = await Event.create({
      ...validation.data,
      organizer: session.user.id,
      status: 'upcoming'
    });

    return NextResponse.json(event);

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Event creation failed' },
      { status: 500 }
    );
  }
}
