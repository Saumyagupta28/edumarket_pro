import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const GlobalHeader = ({ userRole = 'student', userName = 'John Doe', notificationCount = 3 }) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const userMenuRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchExpanded(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogoClick = () => {
    if (userRole === 'instructor') {
      navigate('/instructor-dashboard');
    } else {
      navigate('/student-dashboard');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/course-catalog?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchExpanded(false);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    navigate('/login-register');
    setIsUserMenuOpen(false);
  };

  const notifications = [
    { id: 1, title: 'New course available', message: 'Advanced React Patterns is now live', time: '2 min ago', unread: true },
    { id: 2, title: 'Assignment due soon', message: 'JavaScript Fundamentals assignment due tomorrow', time: '1 hour ago', unread: true },
    { id: 3, title: 'Course completed', message: 'Congratulations on completing CSS Grid Mastery', time: '2 hours ago', unread: false },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border shadow-elevation-2">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={handleLogoClick}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="GraduationCap" size={20} color="white" />
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-heading font-semibold text-primary">EduMarket</span>
                <span className="text-xl font-heading font-medium text-text-primary ml-1">Pro</span>
              </div>
            </button>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Icon 
                  name="Search" 
                  size={20} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
                />
                <Input
                  type="search"
                  placeholder="Search courses, instructors, topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full bg-surface-secondary border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-lg"
                />
              </div>
            </form>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Mobile Search Toggle */}
            <div className="md:hidden" ref={searchRef}>
              <Button
                variant="ghost"
                onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                className="p-2"
              >
                <Icon name="Search" size={20} />
              </Button>
              
              {isSearchExpanded && (
                <div className="absolute top-16 left-4 right-4 bg-surface border border-border rounded-lg shadow-elevation-4 p-4 animate-slide-down">
                  <form onSubmit={handleSearch}>
                    <div className="relative">
                      <Icon 
                        name="Search" 
                        size={20} 
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
                      />
                      <Input
                        type="search"
                        placeholder="Search courses..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full"
                        autoFocus
                      />
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <Button
                variant="ghost"
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="p-2 relative"
              >
                <Icon name="Bell" size={20} />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </span>
                )}
              </Button>

              {isNotificationOpen && (
                <div className="absolute right-0 top-12 w-80 bg-surface border border-border rounded-lg shadow-elevation-4 animate-slide-down z-60">
                  <div className="p-4 border-b border-border">
                    <h3 className="font-heading font-medium text-text-primary">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-border-light hover:bg-surface-secondary transition-colors duration-150 ${
                          notification.unread ? 'bg-primary-50' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? 'bg-primary' : 'bg-text-tertiary'}`} />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-text-primary text-sm">{notification.title}</p>
                            <p className="text-text-secondary text-sm mt-1">{notification.message}</p>
                            <p className="text-text-tertiary text-xs mt-2">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-border">
                    <Button variant="text" className="w-full text-primary hover:text-primary-700">
                      View all notifications
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <Button
                variant="ghost"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {userName.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </span>
                </div>
                <Icon name="ChevronDown" size={16} className="hidden sm:block" />
              </Button>

              {isUserMenuOpen && (
                <div className="absolute right-0 top-12 w-56 bg-surface border border-border rounded-lg shadow-elevation-4 animate-slide-down z-60">
                  <div className="p-4 border-b border-border">
                    <p className="font-medium text-text-primary">{userName}</p>
                    <p className="text-text-secondary text-sm capitalize">{userRole}</p>
                  </div>
                  <div className="py-2">
                    <button
                      onClick={() => {
                        navigate('/student-dashboard');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-text-primary hover:bg-surface-secondary transition-colors duration-150 flex items-center space-x-3"
                    >
                      <Icon name="User" size={16} />
                      <span>Profile</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-text-primary hover:bg-surface-secondary transition-colors duration-150 flex items-center space-x-3"
                    >
                      <Icon name="Settings" size={16} />
                      <span>Settings</span>
                    </button>
                    {userRole === 'instructor' && (
                      <button
                        onClick={() => {
                          navigate('/instructor-dashboard');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-text-primary hover:bg-surface-secondary transition-colors duration-150 flex items-center space-x-3"
                      >
                        <Icon name="BarChart3" size={16} />
                        <span>Analytics</span>
                      </button>
                    )}
                    <div className="border-t border-border my-2"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-error hover:bg-error-50 transition-colors duration-150 flex items-center space-x-3"
                    >
                      <Icon name="LogOut" size={16} />
                      <span>Sign out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default GlobalHeader;