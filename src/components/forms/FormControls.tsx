
import React from 'react';
import { Button } from '@/components/ui/button';

interface FormControlsProps {
  onBack: () => void;
  isSubmitting: boolean;
}

const FormControls: React.FC<FormControlsProps> = ({
  onBack,
  isSubmitting
}) => {
  return (
    <div className="flex justify-between pt-4">
      <Button 
        type="button"
        onClick={onBack}
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
        {isSubmitting ? 'Submitting...' : 'Get My Mobile Cleanroom Quote'}
      </Button>
    </div>
  );
};

export default FormControls;
