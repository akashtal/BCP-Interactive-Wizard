import React from 'react';

const StepIndicator = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-center space-x-4">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex flex-col items-center">
            <div
              className={`step-indicator ${
                step.number < currentStep
                  ? 'step-completed'
                  : step.number === currentStep
                  ? 'step-active'
                  : 'step-pending'
              }`}
            >
              {step.number < currentStep ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                step.number
              )}
            </div>
            <span
              className={`text-xs mt-2 text-center ${
                step.number <= currentStep ? 'text-gray-900' : 'text-gray-500'
              }`}
            >
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-0.5 ${
                step.number < currentStep ? 'bg-green-500' : 'bg-gray-300'
              }`}
              style={{ width: '60px' }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;