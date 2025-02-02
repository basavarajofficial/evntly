'use client';

import { useToast } from '@/hooks/use-toast';
import React, { useState, ChangeEvent } from 'react';

interface UploadResponse {
  message?: string;
  fileUrl?: string;
  error?: string;
}

export default function UploadPage(): JSX.Element {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');

  const { toast } = useToast();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (): Promise<void> => {
    if (!file) {
      alert('Please select a file.');
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    console.log(formData);


    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data: UploadResponse = await response.json();
      if (response.ok && data.fileUrl) {
        setImageUrl(data.fileUrl);
        toast({
            title: 'Upload successful',
            description: "Your file stored in aws s3 bucket",
        })
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload Error:', error);
      toast({
        title: 'Upload Failed',
        description: `message : ${error.message}`,
    })
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <input type="file" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {imageUrl && (
        <div className="mt-4">
          <p>Uploaded Image:</p>
          <img src={imageUrl} alt="Uploaded" className="w-64 h-64 object-cover" />
        </div>
      )}
    </div>
  );
}
