
import React from 'react';
import { Button } from '@/components/ui/button';
import { useFormContext } from '../contexts/FormContext';
import { ShieldCheck } from 'lucide-react';

interface SavedFormPromptProps {
  onContinue: () => void;
  onStartNew: () => void;
}

const SavedFormPrompt: React.FC<SavedFormPromptProps> = ({ onContinue, onStartNew }) => {
  const { clearSavedData } = useFormContext();
  
  const handleStartNew = () => {
    clearSavedData();
    onStartNew();
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-auto text-center transition-all duration-300 hover:shadow-xl animate-fade-in">
      <div className="flex justify-center mb-6">
        <div className="h-20 w-20 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
          <ShieldCheck size={40} />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-3 text-gray-800">Resume Your Quote Request</h2>
      <p className="text-gray-600 mb-6">
        We noticed you have a saved quote request in progress. Would you like to continue where you left off?
      </p>
      
      <div className="space-y-3">
        <Button 
          className="w-full bg-cleanroom-500 hover:bg-cleanroom-600 text-white"
          onClick={onContinue}
        >
          Continue Where I Left Off
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full border-gray-300 hover:bg-gray-50"
          onClick={handleStartNew}
        >
          Start a New Quote Request
        </Button>
      </div>
    </div>
  );
};

export default SavedFormPrompt;
