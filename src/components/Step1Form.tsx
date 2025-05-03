
import React, { useState } from 'react';
import { useFormContext } from '../contexts/FormContext';
import { validateStep } from '../utils/validation';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const Step1Form: React.FC = () => {
  const { formData, updateFormData, setCurrentStep } = useFormContext();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const applicationOptions = [
    'Temporary Lab',
    'Event Support',
    'Remote Project',
    'Equipment Housing',
    'Other'
  ];

  const isoOptions = [
    'ISO 5',
    'ISO 6',
    'ISO 7',
    'ISO 8',
    'Unsure'
  ];

  const handleContinue = () => {
    const validationErrors = validateStep(1, formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setCurrentStep(2);
    setErrors({});
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Application & Classification</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 text-gray-700">What is the primary application for the mobile cleanroom?</h3>
        <div className="grid gap-4">
          <RadioGroup 
            value={formData.primaryApplication}
            onValueChange={(value) => updateFormData({ primaryApplication: value })}
            className="grid grid-cols-1 md:grid-cols-2 gap-2"
          >
            {applicationOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`app-${option}`} />
                <Label htmlFor={`app-${option}`} className="text-base">{option}</Label>
              </div>
            ))}
          </RadioGroup>
          {errors.primaryApplication && (
            <p className="text-red-500 text-sm mt-1">{errors.primaryApplication}</p>
          )}
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-3 text-gray-700">What is the required ISO classification?</h3>
        <div className="grid gap-4">
          <RadioGroup 
            value={formData.isoClassification}
            onValueChange={(value) => updateFormData({ isoClassification: value })}
            className="grid grid-cols-1 md:grid-cols-3 gap-2"
          >
            {isoOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`iso-${option}`} />
                <Label htmlFor={`iso-${option}`} className="text-base">{option}</Label>
              </div>
            ))}
          </RadioGroup>
          {errors.isoClassification && (
            <p className="text-red-500 text-sm mt-1">{errors.isoClassification}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button 
          type="button"
          onClick={handleContinue}
          className="bg-cleanroom-500 hover:bg-cleanroom-600 text-white"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Step1Form;
