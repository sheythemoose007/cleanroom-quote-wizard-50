
import React, { useState } from 'react';
import { useFormContext } from '../contexts/FormContext';
import { validateStep } from '../utils/validation';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

const Step3Form: React.FC = () => {
  const { formData, updateFormData, setCurrentStep } = useFormContext();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const featureOptions = [
    'Personnel airlock',
    'Equipment pass-through',
    'Specific utilities',
    'Windows',
    'Unsure'
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
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Logistics & Specifics</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 text-gray-700">Where will the mobile cleanroom primarily be located?</h3>
        <div className="grid gap-4">
          <Input
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
      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-3 text-gray-700">Do you require specific features?</h3>
        <div className="grid gap-2">
          {featureOptions.map((feature) => (
            <div key={feature} className="flex items-center space-x-2">
              <Checkbox
                id={`feature-${feature}`}
                checked={formData.specificFeatures.includes(feature)}
                onCheckedChange={(checked) => {
                  const isChecked = checked === true;
                  let features = formData.specificFeatures
                    ? formData.specificFeatures.split(', ').filter(Boolean)
                    : [];
                  
                  if (isChecked && !features.includes(feature)) {
                    features.push(feature);
                  } else if (!isChecked) {
                    features = features.filter(item => item !== feature);
                  }
                  
                  updateFormData({ specificFeatures: features.join(', ') });
                }}
              />
              <Label htmlFor={`feature-${feature}`} className="text-base font-normal">
                {feature}
              </Label>
            </div>
          ))}
          {errors.specificFeatures && (
            <p className="text-red-500 text-sm mt-1">{errors.specificFeatures}</p>
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
