
import React, { useState } from 'react';
import { useFormContext } from '../contexts/FormContext';
import { validateStep } from '../utils/validation';
import { toast } from '@/components/ui/sonner';
import ContactFormFields from './forms/ContactFormFields';
import HoneypotField from './forms/HoneypotField';
import ConsentCheckbox from './forms/ConsentCheckbox';
import FormControls from './forms/FormControls';
import { supabase } from "@/integrations/supabase/client";

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
      // Get user agent for analytics
      const userAgent = navigator.userAgent;
      
      // Insert data into Supabase
      const { data, error } = await supabase
        .from('mobile_cleanroom_quotes')
        .insert({
          // Step 1: Application & Classification
          primary_application: formData.primaryApplication,
          iso_classification: formData.isoClassification,
          
          // Step 2: Size & Duration
          cleanroom_size: formData.cleanroomSize,
          duration_of_use: formData.durationOfUse,
          
          // Step 3: Logistics & Specifics
          project_location: formData.projectLocation,
          specific_features: formData.specificFeatures,
          
          // Step 4: Contact Information
          full_name: formData.fullName,
          business_email: formData.businessEmail,
          phone_number: formData.phoneNumber,
          company_name: formData.companyName,
          
          // Metadata
          consent_given: formData.consentGiven,
          user_agent: userAgent,
          
          // Honeypot
          website: formData.website
        })
        .select();
      
      if (error) {
        throw error;
      }
      
      console.log("Quote request submitted successfully:", data);
      
      setSubmissionSuccess(true);
      toast.success("Your mobile cleanroom quote request has been successfully submitted!");
      
    } catch (error: any) {
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
