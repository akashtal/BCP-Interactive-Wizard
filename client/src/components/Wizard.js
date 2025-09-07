import React, { useState, useEffect } from 'react';
import StepIndicator from './StepIndicator';
import Step1ServiceCapture from './steps/Step1ServiceCapture';
import Step2BIA from './steps/Step2BIA';
import Step3Communication from './steps/Step3Communication';
import Step4Risk from './steps/Step4Risk';
import { saveBCP, getBCP } from '../services/api';

const Wizard = ({ bcpData, setBcpData, currentStep, setCurrentStep }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [bcpId, setBcpId] = useState(null);

  const steps = [
    { number: 1, title: 'Service & Process Capture', component: Step1ServiceCapture },
    { number: 2, title: 'Business Impact Analysis', component: Step2BIA },
    { number: 3, title: 'Communication', component: Step3Communication },
    { number: 4, title: 'Risk Assessment', component: Step4Risk }
  ];

  const handleNext = async (stepData) => {
    setIsLoading(true);
    try {
      const updatedData = { ...bcpData, ...stepData, currentStep: currentStep + 1 };
      
      if (bcpId) {
        await saveBCP(bcpId, updatedData);
      } else {
        const response = await saveBCP(null, updatedData);
        setBcpId(response._id);
      }
      
      setBcpData(updatedData);
      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.error('Error saving step:', error);
      alert('Error saving data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveDraft = async () => {
    setIsLoading(true);
    try {
      if (bcpId) {
        await saveBCP(bcpId, { ...bcpData, status: 'draft' });
      } else {
        const response = await saveBCP(null, { ...bcpData, status: 'draft' });
        setBcpId(response._id);
      }
      alert('Draft saved successfully!');
    } catch (error) {
      console.error('Error saving draft:', error);
      alert('Error saving draft. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      await saveBCP(bcpId, { ...bcpData, status: 'completed' });
      alert('BCP completed successfully!');
      // Redirect to dashboard or show success page
    } catch (error) {
      console.error('Error completing BCP:', error);
      alert('Error completing BCP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const currentStepComponent = steps.find(step => step.number === currentStep);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Business Continuity Planning Wizard
          </h1>
          <p className="text-gray-600">
            Complete your BCP in 4 simple steps
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator 
          steps={steps} 
          currentStep={currentStep} 
        />

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-8">
          <div className="p-6">
            {currentStepComponent && (
              <currentStepComponent.component
                data={bcpData}
                onNext={handleNext}
                onBack={handleBack}
                onSaveDraft={handleSaveDraft}
                onComplete={handleComplete}
                isLoading={isLoading}
                isFirstStep={currentStep === 1}
                isLastStep={currentStep === steps.length}
              />
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handleSaveDraft}
            disabled={isLoading}
            className="btn-secondary disabled:opacity-50"
          >
            Save Draft
          </button>
          
          <div className="text-sm text-gray-500">
            Step {currentStep} of {steps.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wizard;