import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbTrail = ({ 
  customBreadcrumbs = null,
  courseTitle = null,
  lessonTitle = null,
  showHome = true 
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const path = location.pathname;
    const breadcrumbs = [];

    if (showHome) {
      breadcrumbs.push({
        label: 'Home',
        path: '/student-dashboard',
        icon: 'Home'
      });
    }

    switch (path) {
      case '/course-catalog':
        breadcrumbs.push({
          label: 'Course Catalog',
          path: '/course-catalog',
          icon: 'BookOpen'
        });
        break;

      case '/course-detail':
        breadcrumbs.push(
          {
            label: 'Course Catalog',
            path: '/course-catalog',
            icon: 'BookOpen'
          },
          {
            label: courseTitle || 'Course Details',
            path: '/course-detail',
            icon: 'Info'
          }
        );
        break;

      case '/video-player':
        breadcrumbs.push(
          {
            label: 'Course Catalog',
            path: '/course-catalog',
            icon: 'BookOpen'
          },
          {
            label: courseTitle || 'Course',
            path: '/course-detail',
            icon: 'Info'
          },
          {
            label: lessonTitle || 'Video Lesson',
            path: '/video-player',
            icon: 'Play'
          }
        );
        break;

      case '/student-dashboard':
        breadcrumbs.push({
          label: 'Dashboard',
          path: '/student-dashboard',
          icon: 'LayoutDashboard'
        });
        break;

      case '/instructor-dashboard':
        breadcrumbs.push({
          label: 'Instructor Dashboard',
          path: '/instructor-dashboard',
          icon: 'BarChart3'
        });
        break;

      default:
        if (path.includes('instructor')) {
          breadcrumbs.push({
            label: 'Instructor Dashboard',
            path: '/instructor-dashboard',
            icon: 'BarChart3'
          });
        } else {
          breadcrumbs.push({
            label: 'Dashboard',
            path: '/student-dashboard',
            icon: 'LayoutDashboard'
          });
        }
        break;
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  const handleNavigation = (path, index) => {
    if (index < breadcrumbs.length - 1) {
      navigate(path);
    }
  };

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm py-4" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const isClickable = !isLast && crumb.path;

          return (
            <li key={index} className="flex items-center space-x-2">
              {index > 0 && (
                <Icon 
                  name="ChevronRight" 
                  size={14} 
                  className="text-text-tertiary flex-shrink-0" 
                />
              )}
              
              <div className="flex items-center space-x-1.5">
                {crumb.icon && (
                  <Icon 
                    name={crumb.icon} 
                    size={14} 
                    className={isLast ? 'text-text-secondary' : 'text-text-tertiary'} 
                  />
                )}
                
                {isClickable ? (
                  <button
                    onClick={() => handleNavigation(crumb.path, index)}
                    className="text-text-secondary hover:text-primary transition-colors duration-150 font-medium truncate max-w-32 sm:max-w-48"
                    title={crumb.label}
                  >
                    {crumb.label}
                  </button>
                ) : (
                  <span 
                    className={`font-medium truncate max-w-32 sm:max-w-48 ${
                      isLast ? 'text-text-primary' : 'text-text-secondary'
                    }`}
                    title={crumb.label}
                  >
                    {crumb.label}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      {/* Mobile Compact View */}
      <div className="sm:hidden ml-auto">
        {breadcrumbs.length > 2 && (
          <button
            onClick={() => navigate(breadcrumbs[breadcrumbs.length - 2].path)}
            className="flex items-center space-x-1 text-text-secondary hover:text-primary transition-colors duration-150 bg-surface-secondary px-2 py-1 rounded-md"
          >
            <Icon name="ArrowLeft" size={14} />
            <span className="text-xs font-medium">Back</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default BreadcrumbTrail;