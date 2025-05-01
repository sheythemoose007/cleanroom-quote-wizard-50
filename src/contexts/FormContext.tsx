
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type FormData = {
  // Step 1: Scope & Classification
  primaryApplication: string;
  isoClassification: string;
  
  // Step 2: Size & Layout
  cleanroomSize: string;
  layoutRequirements: string;
  
  // Step 3: Facility & Timing
  existingBuilding: string;
  ceilingHeight: string;
  completionTimeframe: string;
  
  // Step 4: Contact Information
  fullName: string;
  businessEmail: string;
  phoneNumber: string;
  companyName: string;
  projectLocation: string;
  
  // Consent
  consentGiven: boolean;
  
  // Honeypot for bot prevention
  website?: string;
};

type FormContextType = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  submissionSuccess: boolean;
  setSubmissionSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  submissionError: string | null;
  setSubmissionError: React.Dispatch<React.SetStateAction<string | null>>;
};

const defaultFormData: FormData = {
  primaryApplication: '',
  isoClassification: '',
  cleanroomSize: '',
  layoutRequirements: '',
  existingBuilding: '',
  ceilingHeight: '',
  completionTimeframe: '',
  fullName: '',
  businessEmail: '',
  phoneNumber: '',
  companyName: '',
  projectLocation: '',
  consentGiven: false,
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prevData => ({ ...prevData, ...data }));
  };

  return (
    <FormContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        formData,
        updateFormData,
        isSubmitting,
        setIsSubmitting,
        submissionSuccess,
        setSubmissionSuccess,
        submissionError,
        setSubmissionError
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
