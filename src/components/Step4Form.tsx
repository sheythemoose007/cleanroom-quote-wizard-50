
import React, { useState } from 'react';
import { useFormContext } from '../contexts/FormContext';
import { validateStep } from '../utils/validation';
import { toast } from '@/components/ui/sonner';
import ContactFormFields from './forms/ContactFormFields';
import HoneypotField from './forms/HoneypotField';
import ConsentCheckbox from './forms/ConsentCheckbox';
import FormControls from './forms/FormControls';

const Step4Form: React.FC = () => {
  const { 
    formData, 
    updateFormData, 
    setCurrentStep,
    isSubmitting,
    setIsSubmitting,
    setSubmissionSuccess,
    setSubmissionError
  } = useFormContext();
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleBack = () => {
    setCurrentStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check honeypot field
    if (formData.website) {
      console.log("Bot detected, form submission blocked");
      toast.error("Something went wrong with your submission. Please try again.");
      return;
    }

    const validationErrors = validateStep(4, formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // For now, we'll simulate a successful submission
      // In production, this would connect to Supabase
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Log the form data for now (in production, this would be sent to Supabase)
      console.log("Form submission data:", formData);
      
      setSubmissionSuccess(true);
      toast.success("Your mobile cleanroom quote request has been successfully submitted!");
      
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmissionError("There was an error submitting your form. Please try again.");
      toast.error("There was an error submitting your form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Information</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <ContactFormFields 
          fullName={formData.fullName}
          phoneNumber={formData.phoneNumber}
          projectLocation={formData.projectLocation}
          errors={errors}
          updateFormData={updateFormData}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="businessEmail" className="text-base block mb-2">Business Email*</Label>
            <Input
              id="businessEmail"
              type="email"
              placeholder="Your business email"
              value={formData.businessEmail}
              onChange={(e) => updateFormData({ businessEmail: e.target.value })}
              className="w-full"
            />
            {errors.businessEmail && (
              <p className="text-red-500 text-sm mt-1">{errors.businessEmail}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="companyName" className="text-base block mb-2">Company Name*</Label>
            <Input
              id="companyName"
              type="text"
              placeholder="Your company name"
              value={formData.companyName}
              onChange={(e) => updateFormData({ companyName: e.target.value })}
              className="w-full"
            />
            {errors.companyName && (
              <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
            )}
          </div>
        </div>
        
        <HoneypotField
          website={formData.website}
          updateFormData={updateFormData}
        />
        
        <ConsentCheckbox
          consentGiven={formData.consentGiven}
          updateFormData={updateFormData}
          error={errors.consentGiven}
        />

        <FormControls 
          onBack={handleBack}
          isSubmitting={isSubmitting}
        />
      </form>
    </div>
  );
};

export default Step4Form;

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
