
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface ConsentCheckboxProps {
  consentGiven: boolean;
  updateFormData: (data: any) => void;
  error?: string;
}

const ConsentCheckbox: React.FC<ConsentCheckboxProps> = ({
  consentGiven,
  updateFormData,
  error
}) => {
  return (
    <>
      <div className="flex items-start space-x-3 mt-6">
        <Checkbox
          id="consentGiven"
          checked={consentGiven}
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
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </>
  );
};

export default ConsentCheckbox;
