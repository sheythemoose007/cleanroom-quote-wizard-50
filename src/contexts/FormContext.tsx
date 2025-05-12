
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Storage key for localStorage
const STORAGE_KEY = 'mobile_cleanroom_form';
const STORAGE_EXPIRY_KEY = 'mobile_cleanroom_form_expiry';
// Set expiration time to 7 days (in milliseconds)
const EXPIRY_TIME = 7 * 24 * 60 * 60 * 1000;

export type FormData = {
  // Step 1: Application & Classification
  primaryApplication: string;
  isoClassification: string;
  
  // Step 2: Size & Duration
  cleanroomSize: string;
  durationOfUse: string;
  
  // Step 3: Logistics & Specifics
  projectLocation: string;
  specificFeatures: string;
  
  // Step 4: Contact Information
  fullName: string;
  businessEmail: string;
  phoneNumber: string;
  companyName: string;
  
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
  clearSavedData: () => void;
  hasSavedData: boolean;
};

const defaultFormData: FormData = {
  primaryApplication: '',
  isoClassification: '',
  cleanroomSize: '',
  durationOfUse: '',
  projectLocation: '',
  specificFeatures: '',
  fullName: '',
  businessEmail: '',
  phoneNumber: '',
  companyName: '',
  consentGiven: false,
};

// Helper functions for localStorage
const saveToLocalStorage = (data: FormData, step: number) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    localStorage.setItem('mobile_cleanroom_step', String(step));
    // Set expiry timestamp
    const expiryTime = new Date().getTime() + EXPIRY_TIME;
    localStorage.setItem(STORAGE_EXPIRY_KEY, String(expiryTime));
  } catch (error) {
    console.error('Error saving form data to localStorage:', error);
  }
};

const getFromLocalStorage = (): { data: FormData | null; step: number | null } => {
  try {
    // Check if saved data has expired
    const expiryTime = localStorage.getItem(STORAGE_EXPIRY_KEY);
    if (expiryTime && new Date().getTime() > Number(expiryTime)) {
      // Data has expired, clear it
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('mobile_cleanroom_step');
      localStorage.removeItem(STORAGE_EXPIRY_KEY);
      return { data: null, step: null };
    }
    
    const savedData = localStorage.getItem(STORAGE_KEY);
    const savedStep = localStorage.getItem('mobile_cleanroom_step');
    
    if (savedData) {
      return { 
        data: JSON.parse(savedData), 
        step: savedStep ? Number(savedStep) : null 
      };
    }
  } catch (error) {
    console.error('Error retrieving form data from localStorage:', error);
  }
  
  return { data: null, step: null };
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [hasSavedData, setHasSavedData] = useState(false);
  
  // Initialize state from localStorage or use defaults
  const { data: savedData, step: savedStep } = getFromLocalStorage();
  const [currentStep, setCurrentStep] = useState(savedStep || 1);
  const [formData, setFormData] = useState<FormData>(savedData || defaultFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // Check if we have saved data on initial load
  useEffect(() => {
    const { data } = getFromLocalStorage();
    setHasSavedData(!!data);
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    if (!submissionSuccess) {
      saveToLocalStorage(formData, currentStep);
    }
  }, [formData, currentStep, submissionSuccess]);

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prevData => ({ ...prevData, ...data }));
  };
  
  // Function to clear saved data (used after successful submission)
  const clearSavedData = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('mobile_cleanroom_step');
    localStorage.removeItem(STORAGE_EXPIRY_KEY);
    setHasSavedData(false);
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
        setSubmissionError,
        clearSavedData,
        hasSavedData
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
