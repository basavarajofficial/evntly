'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function CreateEventForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  interface EventData {
    title: string;
    description: string;
    date: string;
    location: string;
    type: string;
    image: string;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session?.user) return;
    setLoading(true);
    setError('');

    try {
      const formElement = e.target as HTMLFormElement; // ✅ Ensure it's a valid form element
      if (!formElement) throw new Error('Form element not found');

      const formData = new FormData(formElement); // ✅ This will work now

      // 1. Upload image to S3
      let imageUrl = '';
      if (file) {
        const imageFormData = new FormData();
        imageFormData.append('file', file);
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: imageFormData,
        });

        if (!uploadRes.ok) throw new Error('Image upload failed');
        const { fileUrl } = await uploadRes.json();
        imageUrl = fileUrl;
      }

      const eventData: EventData = {
        title: String(formData.get('title')),
        description: String(formData.get('description')),
        date: new Date(String(formData.get('date'))).toISOString(), // ✅ Convert to ISO
        location: String(formData.get('location')),
        type: String(formData.get('type')),
        image: imageUrl || '',
      };

      const createRes = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      });

      if (!createRes.ok) throw new Error('Event creation failed');
    //   router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
      <div>
        <label className="block mb-2">Event Title</label>
        <input name="title" type="text" required className="w-full p-2 border rounded" />
      </div>

      <div>
        <label className="block mb-2">Description</label>
        <textarea name="description" rows={4} required className="w-full p-2 border rounded" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Date</label>
          <input name="date" type="datetime-local" required className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block mb-2">Location</label>
          <input name="location" type="text" required className="w-full p-2 border rounded" />
        </div>
      </div>

      <div>
        <label className="block mb-2">Event Type</label>
        <select name="type" required className="w-full p-2 border rounded">
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>
      </div>

      <div>
        <label className="block mb-2">Event Image</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? 'Creating Event...' : 'Create Event'}
      </button>
    </form>
  );
}
