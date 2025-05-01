
import React from 'react';
import { useFormContext } from '../contexts/FormContext';

interface StepItem {
  number: number;
  title: string;
}

const steps: StepItem[] = [
  { number: 1, title: 'Scope & Classification' },
  { number: 2, title: 'Size & Layout' },
  { number: 3, title: 'Facility & Timing' },
  { number: 4, title: 'Contact Information' },
];

const FormStepper: React.FC = () => {
  const { currentStep } = useFormContext();

  return (
    <div className="mb-8">
      <div className="hidden sm:flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            {/* Step indicator */}
            <div className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 
                ${
                  currentStep === step.number
                    ? 'border-cleanroom-500 bg-cleanroom-500 text-white'
                    : currentStep > step.number
                    ? 'border-cleanroom-500 bg-cleanroom-100 text-cleanroom-500'
                    : 'border-gray-300 bg-white text-gray-400'
                }`}
              >
                {currentStep > step.number ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-sm font-medium">{step.number}</span>
                )}
              </div>
              <span className={`mt-2 text-xs font-medium 
                ${currentStep >= step.number ? 'text-cleanroom-600' : 'text-gray-400'}`}>
                {step.title}
              </span>
            </div>
            
            {/* Connector line between steps */}
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-4 
                ${currentStep > index + 1 ? 'bg-cleanroom-500' : 'bg-gray-300'}`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      
      {/* Mobile stepper */}
      <div className="sm:hidden">
        <p className="text-sm font-medium text-cleanroom-600">
          Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
        </p>
        <div className="mt-2 h-2 w-full bg-gray-200 rounded-full">
          <div 
            className="h-full bg-cleanroom-500 rounded-full transition-all duration-300 ease-in-out" 
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default FormStepper;
