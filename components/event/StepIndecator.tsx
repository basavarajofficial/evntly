// Step indicator component
const StepIndicator = ({ currentStep, totalSteps }: { currentStep: number, totalSteps: number }) => {
    return (
      <div className="w-full py-4">
        <div className="flex justify-between mb-2">
          {[...Array(totalSteps)].map((_, index) => (
            <div
              key={index}
              className={`w-8 h-8 rounded-full flex items-center justify-center
                ${index < currentStep ? 'bg-blue-600 text-white' :
                  index === currentStep ? 'bg-blue-100 border-2 border-blue-600 text-blue-600' :
                  'bg-gray-100 text-gray-400'}`}
            >
              {index + 1}
            </div>
          ))}
        </div>
        <div className="flex justify-between px-2 text-sm text-gray-600">
          <span>Basic Info</span>
          <span>Date & Time</span>
          <span>Location</span>
          <span>Media</span>
          <span>Review</span>
        </div>
      </div>
    );
  };


export default StepIndicator;
