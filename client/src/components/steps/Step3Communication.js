import React, { useState } from 'react';

const Step3Communication = ({ data, onNext, onBack, isLoading }) => {
  const [formData, setFormData] = useState({
    notifications: data?.notifications || []
  });

  const handleNotificationsChange = (notifications) => {
    setFormData(prev => ({
      ...prev,
      notifications
    }));
  };

  const handleAddNotification = () => {
    const newNotification = {
      name: '',
      email: '',
      type: 'individual'
    };
    setFormData(prev => ({
      ...prev,
      notifications: [...prev.notifications, newNotification]
    }));
  };

  const handleNotificationUpdate = (index, field, value) => {
    const newNotifications = [...formData.notifications];
    newNotifications[index] = {
      ...newNotifications[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      notifications: newNotifications
    }));
  };

  const handleNotificationRemove = (index) => {
    const newNotifications = formData.notifications.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      notifications: newNotifications
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const invalidNotifications = formData.notifications.filter(
      notification => !notification.name.trim() || !notification.email.trim()
    );
    
    if (invalidNotifications.length > 0) {
      alert('Please fill in all notification fields or remove empty ones');
      return;
    }

    onNext(formData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Step 3: Communication
        </h2>
        <p className="text-gray-600">
          Define who should be notified in case of service disruption
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Disruption Notifications */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Disruption Notifications</h3>
          
          <div>
            <label className="label-required">
              Who should be notified if this service is disrupted?
            </label>
            
            <div className="space-y-4 mt-4">
              {formData.notifications.map((notification, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-white border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={notification.name}
                      onChange={(e) => handleNotificationUpdate(index, 'name', e.target.value)}
                      className="input-field"
                      placeholder="Name"
                      required
                    />
                  </div>
                  
                  <div className="flex-1">
                    <input
                      type="email"
                      value={notification.email}
                      onChange={(e) => handleNotificationUpdate(index, 'email', e.target.value)}
                      className="input-field"
                      placeholder="Email"
                      required
                    />
                  </div>
                  
                  <div className="w-40">
                    <select
                      value={notification.type}
                      onChange={(e) => handleNotificationUpdate(index, 'type', e.target.value)}
                      className="input-field"
                    >
                      <option value="individual">Individual</option>
                      <option value="group">Group</option>
                      <option value="distribution">Distribution List</option>
                    </select>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => handleNotificationRemove(index)}
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
                onClick={handleAddNotification}
                className="btn-secondary"
              >
                + Add Notification Contact
              </button>
            </div>
            
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    Notification Types
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <ul className="list-disc list-inside space-y-1">
                      <li><strong>Individual:</strong> Single person contact</li>
                      <li><strong>Group:</strong> Team or department contact</li>
                      <li><strong>Distribution List:</strong> Email distribution list</li>
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

export default Step3Communication;