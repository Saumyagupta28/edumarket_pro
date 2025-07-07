import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const RoleBasedNavigation = ({ userRole = 'student' }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const studentNavItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/student-dashboard', icon: 'Home' },
    { id: 'catalog', label: 'Browse Courses', path: '/course-catalog', icon: 'BookOpen' },
    { id: 'learning', label: 'My Learning', path: '/student-dashboard', icon: 'Play' },
    { id: 'progress', label: 'Progress', path: '/student-dashboard', icon: 'TrendingUp' },
  ];

  const instructorNavItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/instructor-dashboard', icon: 'LayoutDashboard' },
    { id: 'courses', label: 'My Courses', path: '/instructor-dashboard', icon: 'BookOpen' },
    { id: 'analytics', label: 'Analytics', path: '/instructor-dashboard', icon: 'BarChart3' },
    { id: 'students', label: 'Students', path: '/instructor-dashboard', icon: 'Users' },
    { id: 'earnings', label: 'Earnings', path: '/instructor-dashboard', icon: 'DollarSign' },
    { id: 'resources', label: 'Resources', path: '/instructor-dashboard', icon: 'FileText' },
  ];

  const navItems = userRole === 'instructor' ? instructorNavItems : studentNavItems;

  useEffect(() => {
    const currentPath = location.pathname;
    const activeItem = navItems.find(item => item.path === currentPath);
    if (activeItem) {
      setActiveTab(activeItem.id);
    }
  }, [location.pathname, navItems]);

  const handleNavigation = (item) => {
    navigate(item.path);
    setActiveTab(item.id);
    setIsMobileSidebarOpen(false);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  if (userRole === 'student') {
    return (
      <>
        {/* Desktop Navigation - Horizontal */}
        <nav className="hidden md:block bg-surface border-b border-border sticky top-16 z-40">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item)}
                  className={`flex items-center space-x-2 px-3 py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === item.id
                      ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border-dark'
                  }`}
                >
                  <Icon name={item.icon} size={18} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Mobile Navigation - Bottom Tabs */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-50">
          <div className="flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`flex-1 flex flex-col items-center justify-center py-2 px-1 transition-colors duration-200 ${
                  activeTab === item.id
                    ? 'text-primary' :'text-text-secondary'
                }`}
              >
                <Icon name={item.icon} size={20} />
                <span className="text-xs mt-1 font-medium">{item.label}</span>
                {activeTab === item.id && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary"></div>
                )}
              </button>
            ))}
          </div>
        </nav>
      </>
    );
  }

  // Instructor Navigation - Sidebar
  return (
    <>
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-20 left-4 z-50">
        <Button
          variant="primary"
          onClick={toggleMobileSidebar}
          className="p-2 shadow-elevation-3"
        >
          <Icon name="Menu" size={20} />
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 h-full w-64 bg-surface border-r border-border transform transition-transform duration-300 ease-smooth z-50 ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Navigation Header */}
          <div className="p-6 border-b border-border">
            <h2 className="font-heading font-semibold text-text-primary">Instructor Portal</h2>
            <p className="text-text-secondary text-sm mt-1">Manage your courses and students</p>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-primary text-primary-foreground shadow-elevation-2'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
                }`}
              >
                <Icon name={item.icon} size={20} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border">
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={20} color="white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-text-primary text-sm">Upgrade to Pro</p>
                  <p className="text-text-secondary text-xs">Get advanced analytics</p>
                </div>
              </div>
              <Button variant="primary" className="w-full mt-3 text-sm">
                Upgrade Now
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Offset for Desktop */}
      <div className="hidden lg:block w-64 flex-shrink-0"></div>
    </>
  );
};

export default RoleBasedNavigation;