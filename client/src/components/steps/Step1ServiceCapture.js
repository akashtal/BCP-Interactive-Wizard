import React, { useState, useEffect } from 'react';
import DynamicInputList from '../DynamicInputList';
import SiteSelector from '../SiteSelector';
import OwnerSelector from '../OwnerSelector';
import { getSites, getOwners } from '../../services/api';

const Step1ServiceCapture = ({ data, onNext, onBack, isLoading }) => {
  const [formData, setFormData] = useState({
    bcpName: data?.bcpName || '',
    businessUnit: data?.businessUnit || '',
    subBusinessUnit: data?.subBusinessUnit || '',
    service: {
      name: data?.service?.name || '',
      description: data?.service?.description || ''
    },
    processes: data?.processes || []
  });

  const [sites, setSites] = useState([]);
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sitesData, ownersData] = await Promise.all([
          getSites(),
          getOwners()
        ]);
        setSites(sitesData);
        setOwners(ownersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleServiceChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      service: {
        ...prev.service,
        [field]: value
      }
    }));
  };

  const handleProcessesChange = (processes) => {
    setFormData(prev => ({
      ...prev,
      processes
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.bcpName.trim()) {
      alert('BCP Name is required');
      return;
    }
    if (!formData.service.name.trim()) {
      alert('Service Name is required');
      return;
    }
    if (formData.processes.length === 0) {
      alert('At least one process is required');
      return;
    }

    onNext(formData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Step 1: Service & Process Capture
        </h2>
        <p className="text-gray-600">
          Define your BCP details and the service you want to protect
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* BCP Details */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">BCP Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label-required">
                Name of BCP <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.bcpName}
                onChange={(e) => handleInputChange('bcpName', e.target.value)}
                className="input-field"
                placeholder="Enter BCP name"
                required
              />
            </div>
            
            <div>
              <label className="label-optional">
                Business Unit
              </label>
              <input
                type="text"
                value={formData.businessUnit}
                onChange={(e) => handleInputChange('businessUnit', e.target.value)}
                className="input-field"
                placeholder="Enter business unit"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="label-optional">
                Sub-Business Unit
              </label>
              <input
                type="text"
                value={formData.subBusinessUnit}
                onChange={(e) => handleInputChange('subBusinessUnit', e.target.value)}
                className="input-field"
                placeholder="Enter sub-business unit"
              />
            </div>
          </div>
        </div>

        {/* Service */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Service</h3>
          
          <div className="space-y-4">
            <div>
              <label className="label-required">
                What's the name of the service you want to protect? <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.service.name}
                onChange={(e) => handleServiceChange('name', e.target.value)}
                className="input-field"
                placeholder="Enter service name"
                required
              />
            </div>
            
            <div>
              <label className="label-optional">
                Description
              </label>
              <textarea
                value={formData.service.description}
                onChange={(e) => handleServiceChange('description', e.target.value)}
                className="input-field"
                rows={3}
                placeholder="Enter service description"
              />
            </div>
          </div>
        </div>

        {/* Processes */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Processes</h3>
          
          <div className="mb-4">
            <label className="label-required">
              What are the main processes this service depends on? <span className="text-red-500">*</span>
            </label>
            <DynamicInputList
              items={formData.processes}
              onChange={handleProcessesChange}
              placeholder="Add process"
              addButtonText="+ Add Process"
              renderItem={(process, index) => (
                <ProcessItem
                  key={index}
                  process={process}
                  index={index}
                  sites={sites}
                  owners={owners}
                  onUpdate={(updatedProcess) => {
                    const newProcesses = [...formData.processes];
                    newProcesses[index] = updatedProcess;
                    handleProcessesChange(newProcesses);
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
          
          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  );
};

const ProcessItem = ({ process, index, sites, owners, onUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFieldChange = (field, value) => {
    onUpdate({
      ...process,
      [field]: value
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-3">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <span className="font-medium text-gray-900">{process.name}</span>
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
            <label className="label-required">Sites</label>
            <SiteSelector
              selectedSites={process.sites || []}
              onSitesChange={(sites) => handleFieldChange('sites', sites)}
              sites={sites}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label-required">Primary Owner</label>
              <OwnerSelector
                selectedOwner={process.primaryOwner}
                onOwnerChange={(owner) => handleFieldChange('primaryOwner', owner)}
                owners={owners}
              />
            </div>
            
            <div>
              <label className="label-required">Backup Owner</label>
              <OwnerSelector
                selectedOwner={process.backupOwner}
                onOwnerChange={(owner) => handleFieldChange('backupOwner', owner)}
                owners={owners}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step1ServiceCapture;