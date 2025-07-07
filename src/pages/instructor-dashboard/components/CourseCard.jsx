import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CourseCard = ({ course, onEdit, onAnalytics, onManage }) => {
  const [showActions, setShowActions] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'bg-success-100 text-success-700';
      case 'draft':
        return 'bg-warning-100 text-warning-700';
      case 'pending':
        return 'bg-secondary-100 text-secondary-700';
      default:
        return 'bg-text-tertiary text-text-primary';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-200">
      <div className="flex items-start space-x-4">
        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
          <Image 
            src={course.thumbnail} 
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-heading font-semibold text-text-primary text-lg truncate pr-4">
              {course.title}
            </h3>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
              </span>
              <div className="relative">
                <Button
                  variant="ghost"
                  onClick={() => setShowActions(!showActions)}
                  className="p-1"
                >
                  <Icon name="MoreVertical" size={16} />
                </Button>
                
                {showActions && (
                  <div className="absolute right-0 top-8 w-48 bg-surface border border-border rounded-lg shadow-elevation-4 py-2 z-10">
                    <button
                      onClick={() => {
                        onEdit(course.id);
                        setShowActions(false);
                      }}
                      className="w-full px-4 py-2 text-left text-text-primary hover:bg-surface-secondary transition-colors duration-150 flex items-center space-x-2"
                    >
                      <Icon name="Edit" size={16} />
                      <span>Edit Course</span>
                    </button>
                    <button
                      onClick={() => {
                        onAnalytics(course.id);
                        setShowActions(false);
                      }}
                      className="w-full px-4 py-2 text-left text-text-primary hover:bg-surface-secondary transition-colors duration-150 flex items-center space-x-2"
                    >
                      <Icon name="BarChart3" size={16} />
                      <span>View Analytics</span>
                    </button>
                    <button
                      onClick={() => {
                        onManage(course.id);
                        setShowActions(false);
                      }}
                      className="w-full px-4 py-2 text-left text-text-primary hover:bg-surface-secondary transition-colors duration-150 flex items-center space-x-2"
                    >
                      <Icon name="Settings" size={16} />
                      <span>Manage Content</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <p className="text-text-secondary text-sm mb-3 line-clamp-2">{course.description}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} className="text-text-tertiary" />
              <span className="text-text-secondary">{course.enrollments} students</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={16} className="text-warning" />
              <span className="text-text-secondary">{course.rating} ({course.reviews})</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="DollarSign" size={16} className="text-success" />
              <span className="text-text-secondary">${course.revenue}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-text-tertiary" />
              <span className="text-text-secondary">{course.duration}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;