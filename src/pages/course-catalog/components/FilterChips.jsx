import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterChips = ({ activeFilters, onRemoveFilter, onClearAll }) => {
  if (!activeFilters || activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 py-4">
      <span className="text-text-secondary text-sm font-medium">Active filters:</span>
      
      {activeFilters.map((filter, index) => (
        <div
          key={index}
          className="flex items-center space-x-2 bg-primary-50 text-primary px-3 py-1.5 rounded-full text-sm font-medium"
        >
          <span>{filter.label}: {filter.value}</span>
          <button
            onClick={() => onRemoveFilter(filter)}
            className="hover:bg-primary-100 rounded-full p-0.5 transition-colors duration-150"
          >
            <Icon name="X" size={14} />
          </button>
        </div>
      ))}

      {activeFilters.length > 1 && (
        <Button
          variant="text"
          onClick={onClearAll}
          className="text-text-secondary hover:text-text-primary text-sm ml-2"
        >
          Clear all
        </Button>
      )}
    </div>
  );
};

export default FilterChips;