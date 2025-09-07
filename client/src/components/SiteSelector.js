import React, { useState } from 'react';

const SiteSelector = ({ selectedSites, onSitesChange, sites }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSites = sites.filter(site =>
    site.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSiteToggle = (site) => {
    const isSelected = selectedSites.some(selected => selected._id === site._id);
    
    if (isSelected) {
      onSitesChange(selectedSites.filter(selected => selected._id !== site._id));
    } else {
      onSitesChange([...selectedSites, site]);
    }
  };

  const handleRemoveSite = (siteId) => {
    onSitesChange(selectedSites.filter(site => site._id !== siteId));
  };

  return (
    <div className="relative">
      {/* Selected Sites Display */}
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedSites.map(site => (
          <span
            key={site._id}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
          >
            {site.name}
            <button
              type="button"
              onClick={() => handleRemoveSite(site._id)}
              className="ml-2 text-primary-600 hover:text-primary-800"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </span>
        ))}
      </div>

      {/* Dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 text-left border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          {selectedSites.length === 0 ? 'Select sites...' : `Selected ${selectedSites.length} site(s)`}
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
            <div className="p-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Search sites..."
              />
            </div>
            
            <div className="max-h-48 overflow-auto">
              {filteredSites.map(site => {
                const isSelected = selectedSites.some(selected => selected._id === site._id);
                return (
                  <button
                    key={site._id}
                    type="button"
                    onClick={() => handleSiteToggle(site)}
                    className={`w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center ${
                      isSelected ? 'bg-primary-50 text-primary-900' : 'text-gray-900'
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        className="mr-3 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <div>
                        <div className="font-medium">{site.name}</div>
                        {site.address && (
                          <div className="text-sm text-gray-500">{site.address}</div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
              
              {filteredSites.length === 0 && (
                <div className="px-3 py-2 text-gray-500 text-sm">
                  No sites found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SiteSelector;