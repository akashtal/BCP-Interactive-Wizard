import React, { useState } from 'react';
import DynamicInputList from '../DynamicInputList';

const Step2BIA = ({ data, onNext, onBack, isLoading }) => {
  const [formData, setFormData] = useState({
    criticality: data?.criticality || { timeframe: 'Hours', value: '' },
    headcountRequirements: data?.headcountRequirements || [],
    dependencies: data?.dependencies || []
  });

  const [showSkipConfirmation, setShowSkipConfirmation] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCriticalityChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      criticality: {
        ...prev.criticality,
        [field]: value
      }
    }));
  };

  const handleDependenciesChange = (dependencies) => {
    setFormData(prev => ({
      ...prev,
      dependencies
    }));
  };

  const handleHeadcountAdd = () => {
    const newRequirement = {
      siteId: '',
      processId: '',
      headcount: ''
    };
    setFormData(prev => ({
      ...prev,
      headcountRequirements: [...prev.headcountRequirements, newRequirement]
    }));
  };

  const handleHeadcountUpdate = (index, field, value) => {
    const newRequirements = [...formData.headcountRequirements];
    newRequirements[index] = {
      ...newRequirements[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      headcountRequirements: newRequirements
    }));
  };

  const handleHeadcountRemove = (index) => {
    const newRequirements = formData.headcountRequirements.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      headcountRequirements: newRequirements
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.criticality.value) {
      alert('Criticality timeframe value is required');
      return;
    }

    onNext(formData);
  };

  const handleSkip = () => {
    setShowSkipConfirmation(true);
  };

  const confirmSkip = () => {
    onNext({ ...formData, skipped: true });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Step 2: Business Impact Analysis
        </h2>
        <p className="text-gray-600">
          Analyze the business impact and recovery requirements
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Criticality */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Criticality (MTD)</h3>
          
          <div>
            <label className="label-required">
              When does this process need to be restored if disrupted? <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-4 mt-2">
              <select
                value={formData.criticality.timeframe}
                onChange={(e) => handleCriticalityChange('timeframe', e.target.value)}
                className="input-field w-32"
              >
                <option value="Hours">Hours</option>
                <option value="Days">Days</option>
              </select>
              
              <input
                type="number"
                value={formData.criticality.value}
                onChange={(e) => handleCriticalityChange('value', e.target.value)}
                className="input-field w-32"
                placeholder="0"
                min="0"
                required
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Maximum Tolerable Downtime (MTD)
            </p>
          </div>
        </div>

        {/* Headcount Requirements */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Headcount Requirements</h3>
          
          <div>
            <label className="label-required">
              How many people are required at a minimum if the site is disrupted?
            </label>
            
            <div className="space-y-3 mt-2">
              {formData.headcountRequirements.map((requirement, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-white border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <select
                      value={requirement.siteId}
                      onChange={(e) => handleHeadcountUpdate(index, 'siteId', e.target.value)}
                      className="input-field"
                      required
                    >
                      <option value="">Select Site</option>
                      {data?.processes?.flatMap(p => p.sites || []).map(site => (
                        <option key={site._id} value={site._id}>{site.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex-1">
                    <select
                      value={requirement.processId}
                      onChange={(e) => handleHeadcountUpdate(index, 'processId', e.target.value)}
                      className="input-field"
                      required
                    >
                      <option value="">Select Process</option>
                      {data?.processes?.map(process => (
                        <option key={process.name} value={process.name}>{process.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="w-24">
                    <input
                      type="number"
                      value={requirement.headcount}
                      onChange={(e) => handleHeadcountUpdate(index, 'headcount', e.target.value)}
                      className="input-field"
                      placeholder="0"
                      min="0"
                      required
                    />
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => handleHeadcountRemove(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
              
              <button
                type="button"
                onClick={handleHeadcountAdd}
                className="btn-secondary"
              >
                + Add Headcount Requirement
              </button>
            </div>
          </div>
        </div>

        {/* Dependencies */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Dependencies</h3>
          
          <div>
            <label className="label-required">
              Are there any key systems, vendors, or other processes this depends on?
            </label>
            <DynamicInputList
              items={formData.dependencies}
              onChange={handleDependenciesChange}
              placeholder="Add dependency"
              addButtonText="+ Add Dependency"
              renderItem={(dependency, index) => (
                <DependencyItem
                  key={index}
                  dependency={dependency}
                  index={index}
                  onUpdate={(updatedDependency) => {
                    const newDependencies = [...formData.dependencies];
                    newDependencies[index] = updatedDependency;
                    handleDependenciesChange(newDependencies);
                  }}
                />
              )}
            />
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
            
            <button
              type="submit"
              className="btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Next'}
            </button>
          </div>
        </div>
      </form>

      {/* Skip Confirmation Modal */}
      {showSkipConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Skip Business Impact Analysis?
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

const DependencyItem = ({ dependency, index, onUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFieldChange = (field, value) => {
    onUpdate({
      ...dependency,
      [field]: value
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-3">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <span className="font-medium text-gray-900">{dependency.description || 'New Dependency'}</span>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-3 text-sm text-primary-600 hover:text-primary-700"
          >
            {isExpanded ? 'Collapse' : 'Configure'}
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="mt-4 space-y-4">
          <div>
            <label className="label-required">Type</label>
            <select
              value={dependency.type || ''}
              onChange={(e) => handleFieldChange('type', e.target.value)}
              className="input-field"
            >
              <option value="">Select type</option>
              <option value="Upstream">Upstream</option>
              <option value="IT">IT</option>
              <option value="Equipment">Equipment</option>
              <option value="External">External</option>
            </select>
          </div>
          
          <div>
            <label className="label-required">Description</label>
            <input
              type="text"
              value={dependency.description || ''}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              className="input-field"
              placeholder="Describe the dependency"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Step2BIA;