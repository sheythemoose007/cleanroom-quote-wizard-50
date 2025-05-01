
import React, { useState } from 'react';
import { useFormContext } from '../contexts/FormContext';
import { validateStep } from '../utils/validation';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const Step2Form: React.FC = () => {
  const { formData, updateFormData, setCurrentStep } = useFormContext();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const sizeOptions = [
    '< 500 sq ft',
    '500-1500 sq ft',
    '1500-5000 sq ft',
    '5000+ sq ft',
    'Unsure'
  ];

  const layoutOptions = [
    'Single room',
    'Multi-room layout',
    'Airlocks',
    'Gowning rooms',
    'Specific workflow needs'
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
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Size & Layout</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 text-gray-700">Approximately what size cleanroom do you need?</h3>
        <div className="grid gap-4">
          <RadioGroup 
            value={formData.cleanroomSize}
            onValueChange={(value) => updateFormData({ cleanroomSize: value })}
            className="grid grid-cols-1 md:grid-cols-3 gap-2"
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
        <h3 className="text-lg font-medium mb-3 text-gray-700">Do you have layout requirements?</h3>
        <div className="grid gap-4">
          <div className="grid grid-cols-1 gap-3">
            {layoutOptions.map((option) => (
              <div key={option} className="flex items-center">
                <input
                  type="checkbox"
                  id={`layout-${option}`}
                  checked={formData.layoutRequirements.includes(option)}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    let updatedLayouts = formData.layoutRequirements
                      ? formData.layoutRequirements.split(', ').filter(Boolean)
                      : [];
                    
                    if (isChecked && !updatedLayouts.includes(option)) {
                      updatedLayouts.push(option);
                    } else if (!isChecked) {
                      updatedLayouts = updatedLayouts.filter(item => item !== option);
                    }
                    
                    updateFormData({ layoutRequirements: updatedLayouts.join(', ') });
                  }}
                  className="h-4 w-4 mr-2"
                />
                <Label htmlFor={`layout-${option}`} className="text-base">{option}</Label>
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <Label htmlFor="layout-details" className="text-base mb-2 block">Additional Layout Details</Label>
            <Textarea 
              id="layout-details"
              placeholder="Please describe any specific layout requirements"
              value={formData.layoutRequirements.includes('Specific workflow needs') ? 
                formData.layoutRequirements.replace(/Specific workflow needs(, )?/g, '').trim() : 
                ''}
              onChange={(e) => {
                let updatedLayout = formData.layoutRequirements;
                if (e.target.value) {
                  if (!updatedLayout.includes('Specific workflow needs')) {
                    updatedLayout = updatedLayout ? `Specific workflow needs, ${updatedLayout}` : 'Specific workflow needs';
                  }
                  
                  // Replace any existing text after "Specific workflow needs"
                  updatedLayout = `Specific workflow needs: ${e.target.value}`;
                }
                updateFormData({ layoutRequirements: updatedLayout });
              }}
              className="w-full"
              rows={4}
            />
          </div>
          
          {errors.layoutRequirements && (
            <p className="text-red-500 text-sm mt-1">{errors.layoutRequirements}</p>
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
