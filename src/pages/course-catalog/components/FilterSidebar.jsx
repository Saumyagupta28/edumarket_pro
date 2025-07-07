import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterSidebar = ({ isOpen, onClose, filters, onFilterChange, isMobile = false }) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    level: true,
    rating: true,
    duration: false,
    features: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (filterType, value, checked) => {
    onFilterChange(filterType, value, checked);
  };

  const categories = [
    { id: 'web-development', label: 'Web Development', count: 245 },
    { id: 'data-science', label: 'Data Science', count: 189 },
    { id: 'design', label: 'Design', count: 156 },
    { id: 'business', label: 'Business', count: 134 },
    { id: 'marketing', label: 'Marketing', count: 98 },
    { id: 'photography', label: 'Photography', count: 76 },
    { id: 'music', label: 'Music', count: 54 },
    { id: 'language', label: 'Language', count: 43 }
  ];

  const levels = [
    { id: 'beginner', label: 'Beginner', count: 312 },
    { id: 'intermediate', label: 'Intermediate', count: 198 },
    { id: 'advanced', label: 'Advanced', count: 87 }
  ];

  const durations = [
    { id: '0-2', label: '0-2 hours', count: 89 },
    { id: '3-6', label: '3-6 hours', count: 156 },
    { id: '7-17', label: '7-17 hours', count: 234 },
    { id: '18+', label: '18+ hours', count: 118 }
  ];

  const features = [
    { id: 'subtitles', label: 'Subtitles', count: 445 },
    { id: 'quizzes', label: 'Quizzes', count: 298 },
    { id: 'assignments', label: 'Assignments', count: 234 },
    { id: 'certificate', label: 'Certificate', count: 567 },
    { id: 'lifetime-access', label: 'Lifetime Access', count: 389 }
  ];

  const FilterSection = ({ title, sectionKey, children }) => (
    <div className="border-b border-border pb-6 mb-6 last:border-b-0 last:pb-0 last:mb-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full text-left mb-4"
      >
        <h3 className="font-heading font-semibold text-text-primary">{title}</h3>
        <Icon 
          name={expandedSections[sectionKey] ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-text-secondary" 
        />
      </button>
      {expandedSections[sectionKey] && children}
    </div>
  );

  const CheckboxItem = ({ id, label, count, filterType }) => (
    <label className="flex items-center justify-between py-2 cursor-pointer hover:bg-surface-secondary rounded-lg px-2 -mx-2 transition-colors duration-150">
      <div className="flex items-center space-x-3">
        <Input
          type="checkbox"
          checked={filters[filterType]?.includes(id) || false}
          onChange={(e) => handleFilterChange(filterType, id, e.target.checked)}
          className="w-4 h-4"
        />
        <span className="text-text-primary text-sm">{label}</span>
      </div>
      <span className="text-text-tertiary text-xs">({count})</span>
    </label>
  );

  const sidebarContent = (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h2 className="font-heading font-semibold text-text-primary text-lg">Filters</h2>
        {isMobile && (
          <Button variant="ghost" onClick={onClose} className="p-2">
            <Icon name="X" size={20} />
          </Button>
        )}
      </div>

      {/* Filter Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Categories */}
        <FilterSection title="Categories" sectionKey="categories">
          <div className="space-y-1">
            {categories.map(category => (
              <CheckboxItem
                key={category.id}
                id={category.id}
                label={category.label}
                count={category.count}
                filterType="categories"
              />
            ))}
          </div>
        </FilterSection>

        {/* Price Range */}
        <FilterSection title="Price" sectionKey="price">
          <div className="space-y-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <Input
                type="checkbox"
                checked={filters.price?.includes('free') || false}
                onChange={(e) => handleFilterChange('price', 'free', e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-text-primary text-sm">Free</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <Input
                type="checkbox"
                checked={filters.price?.includes('paid') || false}
                onChange={(e) => handleFilterChange('price', 'paid', e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-text-primary text-sm">Paid</span>
            </label>
            <div className="pt-2">
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder="Min"
                  className="w-20 text-sm"
                  min="0"
                />
                <span className="text-text-secondary">-</span>
                <Input
                  type="number"
                  placeholder="Max"
                  className="w-20 text-sm"
                  min="0"
                />
              </div>
            </div>
          </div>
        </FilterSection>

        {/* Skill Level */}
        <FilterSection title="Skill Level" sectionKey="level">
          <div className="space-y-1">
            {levels.map(level => (
              <CheckboxItem
                key={level.id}
                id={level.id}
                label={level.label}
                count={level.count}
                filterType="level"
              />
            ))}
          </div>
        </FilterSection>

        {/* Rating */}
        <FilterSection title="Rating" sectionKey="rating">
          <div className="space-y-2">
            {[4.5, 4.0, 3.5, 3.0].map(rating => (
              <label key={rating} className="flex items-center space-x-3 cursor-pointer py-1">
                <Input
                  type="checkbox"
                  checked={filters.rating?.includes(rating.toString()) || false}
                  onChange={(e) => handleFilterChange('rating', rating.toString(), e.target.checked)}
                  className="w-4 h-4"
                />
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={14}
                        className={`${i < Math.floor(rating) ? 'text-accent fill-current' : 'text-text-tertiary'}`}
                      />
                    ))}
                  </div>
                  <span className="text-text-primary text-sm">{rating} & up</span>
                </div>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Duration */}
        <FilterSection title="Duration" sectionKey="duration">
          <div className="space-y-1">
            {durations.map(duration => (
              <CheckboxItem
                key={duration.id}
                id={duration.id}
                label={duration.label}
                count={duration.count}
                filterType="duration"
              />
            ))}
          </div>
        </FilterSection>

        {/* Features */}
        <FilterSection title="Features" sectionKey="features">
          <div className="space-y-1">
            {features.map(feature => (
              <CheckboxItem
                key={feature.id}
                id={feature.id}
                label={feature.label}
                count={feature.count}
                filterType="features"
              />
            ))}
          </div>
        </FilterSection>
      </div>

      {/* Footer Actions */}
      {isMobile && (
        <div className="p-6 border-t border-border">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => {
                // Clear all filters
                onFilterChange('clear-all');
              }}
              className="flex-1"
            >
              Clear All
            </Button>
            <Button
              variant="primary"
              onClick={onClose}
              className="flex-1"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={onClose}
          />
        )}
        
        {/* Mobile Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full w-full max-w-sm bg-surface transform transition-transform duration-300 ease-smooth z-50 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {sidebarContent}
        </div>
      </>
    );
  }

  // Desktop Sidebar
  return (
    <div className="w-80 bg-surface border-r border-border h-full">
      {sidebarContent}
    </div>
  );
};

export default FilterSidebar;