
import React, { useState } from 'react';
import { useFormContext } from '../contexts/FormContext';
import { validateStep } from '../utils/validation';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const Step3Form: React.FC = () => {
  const { formData, updateFormData, setCurrentStep } = useFormContext();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const buildingOptions = ['Yes', 'No'];
  
  const timeframeOptions = [
    'Within 3 months',
    '3-6 months',
    '6-12 months',
    'Budgeting/Planning'
  ];

  const handleBack = () => {
    setCurrentStep(2);
  };

  const handleContinue = () => {
    const validationErrors = validateStep(3, formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setCurrentStep(4);
    setErrors({});
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Facility & Timing</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 text-gray-700">Will this be installed inside an existing building?</h3>
        <div className="grid gap-4">
          <RadioGroup 
            value={formData.existingBuilding}
            onValueChange={(value) => {
              updateFormData({ 
                existingBuilding: value,
                // Reset ceiling height if "No" is selected
                ...(value === 'No' ? { ceilingHeight: '' } : {})
              })
            }}
            className="flex space-x-4"
          >
            {buildingOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`building-${option}`} />
                <Label htmlFor={`building-${option}`} className="text-base">{option}</Label>
              </div>
            ))}
          </RadioGroup>
          {errors.existingBuilding && (
            <p className="text-red-500 text-sm mt-1">{errors.existingBuilding}</p>
          )}
        </div>
      </div>
      
      {formData.existingBuilding === 'Yes' && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3 text-gray-700">What is the available ceiling height?</h3>
          <div className="grid gap-4">
            <div className="w-full md:w-1/2">
              <Input
                type="text"
                placeholder="e.g., 10 feet"
                value={formData.ceilingHeight}
                onChange={(e) => updateFormData({ ceilingHeight: e.target.value })}
                className="w-full"
              />
              {errors.ceilingHeight && (
                <p className="text-red-500 text-sm mt-1">{errors.ceilingHeight}</p>
              )}
            </div>
          </div>
        </div>
      )}
      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-3 text-gray-700">What is your desired project completion timeframe?</h3>
        <div className="grid gap-4">
          <RadioGroup 
            value={formData.completionTimeframe}
            onValueChange={(value) => updateFormData({ completionTimeframe: value })}
            className="grid grid-cols-1 md:grid-cols-2 gap-2"
          >
            {timeframeOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`time-${option}`} />
                <Label htmlFor={`time-${option}`} className="text-base">{option}</Label>
              </div>
            ))}
          </RadioGroup>
          {errors.completionTimeframe && (
            <p className="text-red-500 text-sm mt-1">{errors.completionTimeframe}</p>
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

export default Step3Form;
