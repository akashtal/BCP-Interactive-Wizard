import React, { useState } from 'react';

const Step4Risk = ({ data, onNext, onBack, isLoading, isLastStep }) => {
  const [formData, setFormData] = useState({
    risks: data?.risks || ''
  });

  const [showSkipConfirmation, setShowSkipConfirmation] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData);
  };

  const handleSkip = () => {
    setShowSkipConfirmation(true);
  };

  const confirmSkip = () => {
    onNext({ ...formData, skipped: true });
  };

  const handleComplete = () => {
    onNext({ ...formData, status: 'completed' });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Step 4: Risk Assessment
        </h2>
        <p className="text-gray-600">
          Identify and document any major risks to your service
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Risk Assessment */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Documentation</h3>
          
          <div>
            <label className="label-optional">
              Any major risks to note? (e.g., power outage, cyber incident, supply issue)
            </label>
            <textarea
              value={formData.risks}
              onChange={(e) => handleInputChange('risks', e.target.value)}
              className="input-field"
              rows={6}
              placeholder="Describe any major risks that could impact your service..."
            />
            
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Common Risk Examples
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Power outages or electrical failures</li>
                      <li>Cyber security incidents or data breaches</li>
                      <li>Supply chain disruptions</li>
                      <li>Natural disasters (floods, earthquakes, etc.)</li>
                      <li>Key personnel unavailability</li>
                      <li>Technology system failures</li>
                      <li>Regulatory or compliance issues</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={onBack}
            className="btn-secondary"
            disabled={isLoading}
          >
            Back
          </button>
          
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={handleSkip}
              className="btn-secondary"
              disabled={isLoading}
            >
              Skip Step
            </button>
            
            {isLastStep ? (
              <button
                type="button"
                onClick={handleComplete}
                className="btn-primary"
                disabled={isLoading}
              >
                {isLoading ? 'Completing...' : 'Complete BCP'}
              </button>
            ) : (
              <button
                type="submit"
                className="btn-primary"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Next'}
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Skip Confirmation Modal */}
      {showSkipConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Skip Risk Assessment?
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to skip this step? You can always come back to complete it later.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowSkipConfirmation(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmSkip}
                className="btn-primary"
              >
                Skip Step
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step4Risk;