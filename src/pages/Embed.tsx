
import React, { useEffect } from 'react';
import CleanroomQuizForm from '../components/CleanroomQuizForm';

const Embed: React.FC = () => {
  // Get theme color from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const themeColor = params.get('theme');
    
    if (themeColor) {
      // Apply theme color to the top border of the form container
      const formContainer = document.querySelector('.max-w-3xl');
      if (formContainer) {
        formContainer.classList.add('border-t-4');
        (formContainer as HTMLElement).style.borderColor = themeColor;
      }
      
      // You could also update button colors or other theme elements here
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <CleanroomQuizForm />
    </div>
  );
};

export default Embed;
