import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LeftSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPath, setSelectedPath] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories', count: 150, icon: 'Grid3X3' },
    { id: 'web-dev', name: 'Web Development', count: 45, icon: 'Code' },
    { id: 'data-science', name: 'Data Science', count: 32, icon: 'BarChart3' },
    { id: 'design', name: 'Design', count: 28, icon: 'Palette' },
    { id: 'mobile', name: 'Mobile Development', count: 22, icon: 'Smartphone' },
    { id: 'marketing', name: 'Digital Marketing', count: 18, icon: 'TrendingUp' },
    { id: 'business', name: 'Business', count: 15, icon: 'Briefcase' }
  ];

  const learningPaths = [
    { id: 'all', name: 'All Paths', icon: 'Map' },
    { id: 'frontend', name: 'Frontend Developer', icon: 'Monitor' },
    { id: 'fullstack', name: 'Full Stack Developer', icon: 'Layers' },
    { id: 'data-analyst', name: 'Data Analyst', icon: 'PieChart' },
    { id: 'ui-designer', name: 'UI/UX Designer', icon: 'Figma' },
    { id: 'product-manager', name: 'Product Manager', icon: 'Target' }
  ];

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId !== 'all') {
      navigate(`/course-catalog?category=${categoryId}`);
    }
  };

  const handlePathSelect = (pathId) => {
    setSelectedPath(pathId);
    if (pathId !== 'all') {
      navigate(`/course-catalog?path=${pathId}`);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-20 left-0 h-screen lg:h-auto w-80 bg-surface border-r border-border transform transition-transform duration-300 ease-smooth z-50 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="p-6">
          {/* Mobile Close Button */}
          <div className="lg:hidden flex justify-between items-center mb-6">
            <h2 className="font-heading font-semibold text-text-primary">Filters</h2>
            <Button
              variant="ghost"
              onClick={onClose}
              className="p-2"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h3 className="font-heading font-medium text-text-primary mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                onClick={() => navigate('/course-catalog')}
                className="w-full justify-start"
                iconName="Search"
                iconPosition="left"
              >
                Browse All Courses
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/student-dashboard')}
                className="w-full justify-start"
                iconName="BookOpen"
                iconPosition="left"
              >
                My Learning
              </Button>
            </div>
          </div>

          {/* Categories Filter */}
          <div className="mb-8">
            <h3 className="font-heading font-medium text-text-primary mb-4">Categories</h3>
            <div className="space-y-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors duration-150 ${
                    selectedCategory === category.id
                      ? 'bg-primary-100 text-primary border border-primary-200' :'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon name={category.icon} size={18} />
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <span className="text-xs bg-surface-tertiary px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Learning Paths */}
          <div className="mb-8">
            <h3 className="font-heading font-medium text-text-primary mb-4">Learning Paths</h3>
            <div className="space-y-1">
              {learningPaths.map((path) => (
                <button
                  key={path.id}
                  onClick={() => handlePathSelect(path.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors duration-150 ${
                    selectedPath === path.id
                      ? 'bg-secondary-100 text-secondary border border-secondary-200' :'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
                  }`}
                >
                  <Icon name={path.icon} size={18} />
                  <span className="font-medium">{path.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Study Goals */}
          <div className="bg-gradient-to-br from-accent-50 to-primary-50 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
                <Icon name="Target" size={20} color="white" />
              </div>
              <div>
                <h4 className="font-heading font-medium text-text-primary">Weekly Goal</h4>
                <p className="text-text-secondary text-sm">5 hours of learning</p>
              </div>
            </div>
            <div className="w-full bg-surface-secondary rounded-full h-2 mb-2">
              <div className="bg-gradient-to-r from-accent to-primary h-2 rounded-full" style={{ width: '70%' }} />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">3.5h completed</span>
              <span className="text-text-primary font-medium">70%</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default LeftSidebar;