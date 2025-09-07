import React, { useState } from 'react';

const OwnerSelector = ({ selectedOwner, onOwnerChange, owners }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOwners = owners.filter(owner =>
    owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    owner.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOwnerSelect = (owner) => {
    onOwnerChange(owner);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClear = () => {
    onOwnerChange(null);
  };

  return (
    <div className="relative">
      {/* Selected Owner Display */}
      {selectedOwner ? (
        <div className="flex items-center justify-between p-3 bg-primary-50 border border-primary-200 rounded-lg">
          <div>
            <div className="font-medium text-primary-900">{selectedOwner.name}</div>
            <div className="text-sm text-primary-700">{selectedOwner.email}</div>
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="text-primary-600 hover:text-primary-800"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 text-left border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          Select owner...
        </button>
      )}

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          <div className="p-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Search owners..."
              autoFocus
            />
          </div>
          
          <div className="max-h-48 overflow-auto">
            {filteredOwners.map(owner => (
              <button
                key={owner._id}
                type="button"
                onClick={() => handleOwnerSelect(owner)}
                className="w-full px-3 py-2 text-left hover:bg-gray-100 text-gray-900"
              >
                <div className="font-medium">{owner.name}</div>
                <div className="text-sm text-gray-500">{owner.email}</div>
                {owner.department && (
                  <div className="text-xs text-gray-400">{owner.department}</div>
                )}
              </button>
            ))}
            
            {filteredOwners.length === 0 && (
              <div className="px-3 py-2 text-gray-500 text-sm">
                No owners found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerSelector;