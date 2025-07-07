import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onCreateCourse, onViewMessages, onAnalytics, onSettings }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const actions = [
    {
      id: 'create-course',
      label: 'Create Course',
      icon: 'Plus',
      color: 'primary',
      onClick: onCreateCourse
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: 'MessageCircle',
      color: 'secondary',
      onClick: onViewMessages
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: 'BarChart3',
      color: 'success',
      onClick: onAnalytics
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'Settings',
      color: 'warning',
      onClick: onSettings
    }
  ];

  const getButtonColor = (color) => {
    switch (color) {
      case 'secondary':
        return 'bg-secondary hover:bg-secondary-700';
      case 'success':
        return 'bg-success hover:bg-success-600';
      case 'warning':
        return 'bg-warning hover:bg-warning-600';
      default:
        return 'bg-primary hover:bg-primary-700';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Actions */}
      {isExpanded && (
        <div className="mb-4 space-y-3">
          {actions.slice(1).map((action) => (
            <div
              key={action.id}
              className="flex items-center space-x-3 animate-slide-up"
            >
              <span className="bg-surface border border-border rounded-lg px-3 py-2 text-text-primary text-sm font-medium shadow-elevation-2">
                {action.label}
              </span>
              <button
                onClick={() => {
                  action.onClick();
                  setIsExpanded(false);
                }}
                className={`w-12 h-12 ${getButtonColor(action.color)} text-white rounded-full shadow-elevation-3 hover:shadow-elevation-4 transition-all duration-200 flex items-center justify-center`}
              >
                <Icon name={action.icon} size={20} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Main Action Button */}
      <div className="flex items-center space-x-3">
        {isExpanded && (
          <span className="bg-surface border border-border rounded-lg px-3 py-2 text-text-primary text-sm font-medium shadow-elevation-2 animate-slide-right">
            Create Course
          </span>
        )}
        <button
          onClick={() => {
            if (isExpanded) {
              onCreateCourse();
              setIsExpanded(false);
            } else {
              setIsExpanded(true);
            }
          }}
          className={`w-14 h-14 ${getButtonColor('primary')} text-white rounded-full shadow-elevation-4 hover:shadow-elevation-5 transition-all duration-200 flex items-center justify-center group`}
        >
          <Icon 
            name={isExpanded ? "Plus" : "Plus"} 
            size={24} 
            className={`transition-transform duration-200 ${isExpanded ? 'rotate-45' : 'group-hover:scale-110'}`}
          />
        </button>
      </div>

      {/* Secondary Toggle for Menu */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="absolute -top-2 -left-2 w-6 h-6 bg-secondary text-white rounded-full shadow-elevation-2 flex items-center justify-center hover:bg-secondary-700 transition-colors duration-200"
        >
          <Icon name="MoreHorizontal" size={12} />
        </button>
      )}

      {/* Backdrop */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/20 -z-10"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default QuickActions;