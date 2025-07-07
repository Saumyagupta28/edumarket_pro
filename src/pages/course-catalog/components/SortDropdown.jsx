import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortDropdown = ({ currentSort, onSortChange, resultsCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'popularity', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortSelect = (sortValue) => {
    onSortChange(sortValue);
    setIsOpen(false);
  };

  const getCurrentSortLabel = () => {
    const option = sortOptions.find(opt => opt.value === currentSort);
    return option ? option.label : 'Most Relevant';
  };

  return (
    <div className="flex items-center justify-between mb-6">
      {/* Results Count */}
      <div className="text-text-secondary text-sm">
        <span className="font-medium text-text-primary">{resultsCount.toLocaleString()}</span> courses found
      </div>

      {/* Sort Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 min-w-48"
        >
          <span className="text-sm">Sort by: {getCurrentSortLabel()}</span>
          <Icon 
            name={isOpen ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            className="text-text-secondary" 
          />
        </Button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-56 bg-surface border border-border rounded-lg shadow-elevation-4 z-50 py-2">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortSelect(option.value)}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-surface-secondary transition-colors duration-150 ${
                  currentSort === option.value 
                    ? 'text-primary bg-primary-50 font-medium' :'text-text-primary'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option.label}</span>
                  {currentSort === option.value && (
                    <Icon name="Check" size={16} className="text-primary" />
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SortDropdown;