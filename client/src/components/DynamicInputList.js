import React, { useState } from 'react';

const DynamicInputList = ({ 
  items, 
  onChange, 
  placeholder = "Add item", 
  addButtonText = "+ Add",
  renderItem 
}) => {
  const [newItem, setNewItem] = useState('');

  const handleAddItem = () => {
    if (newItem.trim()) {
      const newItems = [...items, { name: newItem.trim() }];
      onChange(newItems);
      setNewItem('');
    }
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddItem();
    }
  };

  return (
    <div className="space-y-3">
      {/* Existing Items */}
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-3">
          <div className="flex-1">
            {renderItem ? renderItem(item, index) : (
              <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                <span className="text-gray-900">{item.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Add New Item */}
      <div className="flex space-x-3">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyPress={handleKeyPress}
          className="input-field flex-1"
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={handleAddItem}
          className="btn-primary whitespace-nowrap"
        >
          {addButtonText}
        </button>
      </div>
    </div>
  );
};

export default DynamicInputList;