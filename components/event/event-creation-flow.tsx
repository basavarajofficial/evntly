"use client"

import { ImageIcon,ChevronLeft, ChevronRight, Calendar, MapPin } from 'lucide-react';
import StepIndicator from "./StepIndecator";
import { useState } from "react";



// Review Form
interface FormData {
    title: string;
    description: string;
    category: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    locationType: string;
    locationLink: string;
    venueName: string;
    address: string;
    eventImage: string | null;
    imageFile: File | null;
  }

// Basic Information Form
export const BasicInfoForm = ({ formData, updateFormData }: { formData: FormData, updateFormData: (updates: Partial<FormData>) => void }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Event Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => updateFormData({ title: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          placeholder="Enter event title"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => updateFormData({ description: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          rows={4}
          placeholder="Describe your event"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          value={formData.category}
          onChange={(e) => updateFormData({ category: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        >
          <option value="">Select a category</option>
          <option value="conference">Conference</option>
          <option value="webinar">Webinar</option>
          <option value="workshop">Workshop</option>
          <option value="meetup">Meetup</option>
        </select>
      </div>
    </div>
  );
};

// Date & Time Form
export const DateTimeForm = ({ formData, updateFormData }: { formData: FormData, updateFormData: (updates: Partial<FormData>) => void }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => updateFormData({ startDate: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Time</label>
          <input
            type="time"
            value={formData.startTime}
            onChange={(e) => updateFormData({ startTime: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            value={formData.endDate}
            onChange={(e) => updateFormData({ endDate: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">End Time</label>
          <input
            type="time"
            value={formData.endTime}
            onChange={(e) => updateFormData({ endTime: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
      </div>
    </div>
  );
};

// Location Form
export const LocationForm = ({ formData, updateFormData }: { formData: FormData, updateFormData: (updates: Partial<FormData>) => void }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Event Type</label>
        <select
          value={formData.locationType}
          onChange={(e) => updateFormData({ locationType: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        >
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>
      </div>
      {formData.locationType === 'online' ? (
        <div>
          <label className="block text-sm font-medium text-gray-700">Meeting Link</label>
          <input
            type="url"
            value={formData.locationLink}
            onChange={(e) => updateFormData({ locationLink: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="Enter meeting URL"
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Venue Name</label>
            <input
              type="text"
              value={formData.venueName}
              onChange={(e) => updateFormData({ venueName: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="Enter venue name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              value={formData.address}
              onChange={(e) => updateFormData({ address: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              rows={3}
              placeholder="Enter full address"
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Media Upload Form
export const MediaUploadForm = ({ formData, updateFormData }: { formData: FormData, updateFormData: (updates: Partial<FormData>) => void }) => {
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real implementation, you would upload to S3 here
      updateFormData({
        eventImage: URL.createObjectURL(file),
        imageFile: file
      });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Event Banner</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          {formData.eventImage ? (
            <div className="space-y-1 text-center">
              <img
                src={formData.eventImage}
                alt="Event banner preview"
                className="mx-auto h-32 w-auto"
              />
              <button
                onClick={() => updateFormData({ eventImage: null, imageFile: null })}
                className="text-sm text-red-600 hover:text-red-500"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="space-y-1 text-center">
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 hover:text-blue-500">
                  <span>Upload a file</span>
                  <input
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};



export const ReviewForm = ({ formData }: { formData: FormData }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Review Event Details</h3>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Basic Information</h4>
            <p className="mt-1 text-sm text-gray-900">{formData.title}</p>
            <p className="mt-1 text-sm text-gray-600">{formData.description}</p>
            <p className="mt-1 text-sm text-gray-600">Category: {formData.category}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">Date & Time</h4>
            <p className="mt-1 text-sm text-gray-900">
              From: {formData.startDate} {formData.startTime}
            </p>
            <p className="mt-1 text-sm text-gray-900">
              To: {formData.endDate} {formData.endTime}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">Location</h4>
            <p className="mt-1 text-sm text-gray-900">Type: {formData.locationType}</p>
            {formData.locationType === 'online' ? (
              <p className="mt-1 text-sm text-gray-600">{formData.locationLink}</p>
            ) : (
              <>
                <p className="mt-1 text-sm text-gray-900">{formData.venueName}</p>
                <p className="mt-1 text-sm text-gray-600">{formData.address}</p>
              </>
            )}
          </div>

          {formData.eventImage && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">Event Banner</h4>
              <img
                src={formData.eventImage}
                alt="Event banner"
                className="mt-1 h-32 w-auto rounded-md"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};



const CreateEvent = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<FormData>({
      title: '',
      description: '',
      category: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      locationType: 'online',
      locationLink: '',
      venueName: '',
      address: '',
      eventImage: null,
      imageFile: null,
    });

  const updateFormData = (updates: Partial<FormData>) => {
      setFormData(prev => ({ ...prev, ...updates }));
  };

    const handleNext = () => {
      if (currentStep < 4) setCurrentStep(prev => prev + 1);
    };

    const handleBack = () => {
      if (currentStep > 0) setCurrentStep(prev => prev - 1);
    };

    const handleSubmit = async () => {
      // Here you would implement the API call to create the event
      console.log('Submitting event:', formData);
    };

    const renderStep = () => {
      switch (currentStep) {
        case 0:
          return <BasicInfoForm formData={formData} updateFormData={updateFormData} />;
        case 1:
          return <DateTimeForm formData={formData} updateFormData={updateFormData} />;
        case 2:
          return <LocationForm formData={formData} updateFormData={updateFormData} />;
        case 3:
          return <MediaUploadForm formData={formData} updateFormData={updateFormData} />;
        case 4:
          return <ReviewForm formData={formData} />;
        default:
          return null;
      }
    };

    return (
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Event</h1>

        <StepIndicator currentStep={currentStep} totalSteps={5} />

        <div className="mt-6">
          {renderStep()}
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`flex items-center px-4 py-2 rounded-md
              ${currentStep === 0 ? 'bg-gray-100 text-gray-400' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back
          </button>

          {currentStep === 4 ? (
            <button
              onClick={handleSubmit}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Publish Event
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          )}
        </div>
      </div>
    );
  };

  export default CreateEvent;
