
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface HoneypotFieldProps {
  website: string | undefined;
  updateFormData: (data: any) => void;
}

const HoneypotField: React.FC<HoneypotFieldProps> = ({
  website,
  updateFormData
}) => {
  return (
    <div className="hidden">
      <Label htmlFor="website" className="text-base block mb-2">Website</Label>
      <Input
        id="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        placeholder="Your website"
        value={website || ''}
        onChange={(e) => updateFormData({ website: e.target.value })}
      />
    </div>
  );
};

export default HoneypotField;
