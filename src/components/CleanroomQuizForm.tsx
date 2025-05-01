
import React from 'react';
import { FormProvider, useFormContext } from '../contexts/FormContext';
import FormStepper from './FormStepper';
import Step1Form from './Step1Form';
import Step2Form from './Step2Form';
import Step3Form from './Step3Form';
import Step4Form from './Step4Form';
import SuccessMessage from './SuccessMessage';

const FormContent: React.FC = () => {
  const { currentStep, submissionSuccess } = useFormContext();

  // If submission was successful, show the success message
  if (submissionSuccess) {
    return <SuccessMessage />;
  }

  return (
    <div>
      <FormStepper />
      
      {currentStep === 1 && <Step1Form />}
      {currentStep === 2 && <Step2Form />}
      {currentStep === 3 && <Step3Form />}
      {currentStep === 4 && <Step4Form />}
    </div>
  );
};

const CleanroomQuizForm: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Modular Cleanroom Quote Request</h1>
        <p className="text-gray-600 mt-2">
          Complete this short questionnaire to receive a customized quote for your modular cleanroom project.
        </p>
      </div>
      
      <FormProvider>
        <FormContent />
      </FormProvider>
      
      <div className="mt-10 text-center text-xs text-gray-500">
        <p>
          Your information is secure and will only be used to process your quote request.
          See our <a href="#" className="text-cleanroom-500 hover:underline">Privacy Policy</a> for details.
        </p>
      </div>
    </div>
  );
};

export default CleanroomQuizForm;
