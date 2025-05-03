
import React, { useState } from 'react';
import { useFormContext } from '../contexts/FormContext';
import { validateStep } from '../utils/validation';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const Step2Form: React.FC = () => {
  const { formData, updateFormData, setCurrentStep } = useFormContext();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const sizeOptions = [
    'Standard Container Size - 20\'',
    'Standard Container Size - 40\'',
    'Custom Size',
    'Unsure'
  ];

  const durationOptions = [
    'Less than 3 months',
    '3-12 months',
    'Over 1 year',
    'Permanent but mobile'
  ];

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleContinue = () => {
    const validationErrors = validateStep(2, formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setCurrentStep(3);
    setErrors({});
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Size & Duration</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 text-gray-700">What approximate internal size do you need?</h3>
        <div className="grid gap-4">
          <RadioGroup 
            value={formData.cleanroomSize}
            onValueChange={(value) => updateFormData({ cleanroomSize: value })}
            className="grid grid-cols-1 md:grid-cols-2 gap-2"
          >
            {sizeOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`size-${option}`} />
                <Label htmlFor={`size-${option}`} className="text-base">{option}</Label>
              </div>
            ))}
          </RadioGroup>
          {errors.cleanroomSize && (
            <p className="text-red-500 text-sm mt-1">{errors.cleanroomSize}</p>
          )}
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-3 text-gray-700">What is the expected duration of use?</h3>
        <div className="grid gap-4">
          <RadioGroup 
            value={formData.durationOfUse}
            onValueChange={(value) => updateFormData({ durationOfUse: value })}
            className="grid grid-cols-1 md:grid-cols-2 gap-2"
          >
            {durationOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`duration-${option}`} />
                <Label htmlFor={`duration-${option}`} className="text-base">{option}</Label>
              </div>
            ))}
          </RadioGroup>
          {errors.durationOfUse && (
            <p className="text-red-500 text-sm mt-1">{errors.durationOfUse}</p>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <Button 
          type="button"
          onClick={handleBack}
          variant="outline"
          className="border-cleanroom-500 text-cleanroom-500 hover:bg-cleanroom-50"
        >
          Back
        </Button>
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

export default Step2Form;
