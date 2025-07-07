import React from 'react';
import Icon from '../../../components/AppIcon';

const CourseTabNavigation = ({ activeTab, onTabChange, tabs }) => {
  return (
    <div className="border-b border-border bg-surface sticky top-16 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Tabs */}
        <div className="hidden md:flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center space-x-2 px-4 py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border-dark'
              }`}
            >
              <Icon name={tab.icon} size={18} />
              <span>{tab.label}</span>
              {tab.count && (
                <span className="bg-surface-secondary text-text-secondary px-2 py-0.5 rounded-full text-xs">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Mobile Tabs - Scrollable */}
        <div className="md:hidden overflow-x-auto">
          <div className="flex space-x-6 min-w-max px-2 py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
                {tab.count && (
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    activeTab === tab.id
                      ? 'bg-primary-foreground/20 text-primary-foreground'
                      : 'bg-surface-secondary text-text-secondary'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseTabNavigation;