import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, change, changeType, icon, color = 'primary' }) => {
  const getColorClasses = () => {
    switch (color) {
      case 'success':
        return 'from-success-50 to-success-100 border-success-200';
      case 'warning':
        return 'from-warning-50 to-warning-100 border-warning-200';
      case 'secondary':
        return 'from-secondary-50 to-secondary-100 border-secondary-200';
      default:
        return 'from-primary-50 to-primary-100 border-primary-200';
    }
  };

  const getIconColor = () => {
    switch (color) {
      case 'success':
        return 'var(--color-success)';
      case 'warning':
        return 'var(--color-warning)';
      case 'secondary':
        return 'var(--color-secondary)';
      default:
        return 'var(--color-primary)';
    }
  };

  return (
    <div className={`bg-gradient-to-br ${getColorClasses()} border rounded-xl p-6 shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-200`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-text-secondary text-sm font-medium mb-1">{title}</p>
          <p className="text-2xl font-heading font-bold text-text-primary mb-2">{value}</p>
          {change && (
            <div className="flex items-center space-x-1">
              <Icon 
                name={changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
                color={changeType === 'increase' ? 'var(--color-success)' : 'var(--color-error)'} 
              />
              <span className={`text-sm font-medium ${
                changeType === 'increase' ? 'text-success' : 'text-error'
              }`}>
                {change}
              </span>
            </div>
          )}
        </div>
        <div className="ml-4">
          <div className="w-12 h-12 bg-white/50 rounded-lg flex items-center justify-center">
            <Icon name={icon} size={24} color={getIconColor()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsCard;