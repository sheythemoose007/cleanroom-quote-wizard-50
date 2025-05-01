
import React, { useState } from 'react';
import { useFormContext } from '../contexts/FormContext';
import { validateStep } from '../utils/validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/sonner';

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
  const [isBusinessEmail, setIsBusinessEmail] = useState(true);

  const handleBack = () => {
    setCurrentStep(3);
  };

  const checkEmailDomain = (email: string) => {
    if (!email.includes('@')) return true;
    
    const domain = email.split('@')[1].toLowerCase();
    const commonFreeEmails = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'icloud.com'];
    
    const isBusiness = !commonFreeEmails.includes(domain);
    setIsBusinessEmail(isBusiness);
    return isBusiness;
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

    // Check if it's a business email
    const isBusinessEmail = checkEmailDomain(formData.businessEmail);
    if (!isBusinessEmail) {
      // We'll show a warning but still allow submission
      toast.warning("A business email is preferred for requesting quotes.");
    }
    
    setIsSubmitting(true);
    
    try {
      // For now, we'll simulate a successful submission
      // In production, this would connect to Supabase
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Log the form data for now (in production, this would be sent to Supabase)
      console.log("Form submission data:", formData);
      
      setSubmissionSuccess(true);
      toast.success("Your quote request has been successfully submitted!");
      
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="fullName" className="text-base block mb-2">Full Name*</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Your full name"
              value={formData.fullName}
              onChange={(e) => updateFormData({ fullName: e.target.value })}
              className="w-full"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="businessEmail" className="text-base block mb-2">Business Email*</Label>
            <Input
              id="businessEmail"
              type="email"
              placeholder="your.name@company.com"
              value={formData.businessEmail}
              onChange={(e) => {
                updateFormData({ businessEmail: e.target.value });
                checkEmailDomain(e.target.value);
              }}
              className={`w-full ${!isBusinessEmail && formData.businessEmail ? 'border-yellow-500' : ''}`}
            />
            {!isBusinessEmail && formData.businessEmail && (
              <p className="text-yellow-600 text-sm mt-1">Business email addresses are preferred.</p>
            )}
            {errors.businessEmail && (
              <p className="text-red-500 text-sm mt-1">{errors.businessEmail}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="phoneNumber" className="text-base block mb-2">Phone Number*</Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="Your phone number"
              value={formData.phoneNumber}
              onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
              className="w-full"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
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
          
          <div className="md:col-span-2">
            <Label htmlFor="projectLocation" className="text-base block mb-2">Project Location (City, State/Country)*</Label>
            <Input
              id="projectLocation"
              type="text"
              placeholder="e.g., Boston, MA, USA"
              value={formData.projectLocation}
              onChange={(e) => updateFormData({ projectLocation: e.target.value })}
              className="w-full"
            />
            {errors.projectLocation && (
              <p className="text-red-500 text-sm mt-1">{errors.projectLocation}</p>
            )}
          </div>
        </div>
        
        {/* Honeypot field - hidden from users but bots will fill it out */}
        <div className="hidden">
          <Label htmlFor="website" className="text-base block mb-2">Website</Label>
          <Input
            id="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            placeholder="Your website"
            value={formData.website || ''}
            onChange={(e) => updateFormData({ website: e.target.value })}
          />
        </div>
        
        <div className="flex items-start space-x-3 mt-6">
          <Checkbox
            id="consentGiven"
            checked={formData.consentGiven}
            onCheckedChange={(checked) => {
              updateFormData({ consentGiven: checked === true });
            }}
            className="mt-1"
          />
          <Label htmlFor="consentGiven" className="text-sm font-normal">
            I consent to receiving communications regarding my cleanroom quote request. 
            I understand that my information will be processed in accordance with the privacy policy.
          </Label>
        </div>
        {errors.consentGiven && (
          <p className="text-red-500 text-sm">{errors.consentGiven}</p>
        )}

        <div className="flex justify-between pt-4">
          <Button 
            type="button"
            onClick={handleBack}
            variant="outline"
            className="border-cleanroom-500 text-cleanroom-500 hover:bg-cleanroom-50"
          >
            Back
          </Button>
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="bg-cleanroom-500 hover:bg-cleanroom-600 text-white min-w-[200px]"
          >
            {isSubmitting ? 'Submitting...' : 'Get My Modular Cleanroom Quote'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Step4Form;
