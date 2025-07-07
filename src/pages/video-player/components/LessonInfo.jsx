import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const LessonInfo = ({ 
  lesson = {},
  instructor = {},
  onMarkComplete,
  onToggleBookmark,
  isCompleted = false,
  isBookmarked = false
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const defaultLesson = {
    title: "Introduction to React Hooks",
    description: `In this comprehensive lesson, we'll explore the fundamentals of React Hooks, a powerful feature introduced in React 16.8 that allows you to use state and other React features without writing a class component.We'll cover the motivation behind hooks, their benefits over class components, and dive deep into the most commonly used hooks like useState and useEffect. You'll learn how hooks can make your code more readable, reusable, and easier to test.By the end of this lesson, you'll have a solid understanding of how to implement hooks in your React applications and be ready to explore more advanced hook patterns.`,
    duration: "12:45",
    difficulty: "Beginner",
    tags: ["React", "Hooks", "JavaScript", "Frontend"],
    objectives: [
      "Understand what React Hooks are and why they were introduced",
      "Learn the rules of hooks and best practices",
      "Implement useState for managing component state",
      "Use useEffect for handling side effects",
      "Create your first custom hook"
    ],
    resources: [
      {
        id: 1,
        title: "React Hooks Documentation",
        type: "link",
        url: "https://reactjs.org/docs/hooks-intro.html"
      },
      {
        id: 2,
        title: "Lesson Code Examples",
        type: "file",
        size: "2.4 MB"
      },
      {
        id: 3,
        title: "Practice Exercises",
        type: "file",
        size: "1.8 MB"
      }
    ]
  };

  const defaultInstructor = {
    name: "Sarah Johnson",
    title: "Senior React Developer",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    bio: "Sarah is a senior frontend developer with 8+ years of experience building scalable React applications. She's passionate about teaching and has helped thousands of developers master modern React patterns.",
    rating: 4.9,
    students: 12500,
    courses: 15
  };

  const lessonData = { ...defaultLesson, ...lesson };
  const instructorData = { ...defaultInstructor, ...instructor };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'resources', label: 'Resources', icon: 'Download' },
    { id: 'instructor', label: 'Instructor', icon: 'User' }
  ];

  const handleMarkComplete = () => {
    if (onMarkComplete) {
      onMarkComplete(!isCompleted);
    }
  };

  const handleToggleBookmark = () => {
    if (onToggleBookmark) {
      onToggleBookmark(!isBookmarked);
    }
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case 'link':
        return 'ExternalLink';
      case 'file':
        return 'FileText';
      case 'video':
        return 'Play';
      default:
        return 'File';
    }
  };

  return (
    <div className="bg-surface">
      {/* Lesson Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="flex-1">
            <h1 className="font-heading font-bold text-2xl text-text-primary mb-2">
              {lessonData.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={16} />
                <span>{lessonData.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="BarChart" size={16} />
                <span>{lessonData.difficulty}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Users" size={16} />
                <span>1,234 students</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={isBookmarked ? "primary" : "outline"}
              onClick={handleToggleBookmark}
              iconName={isBookmarked ? "BookmarkCheck" : "Bookmark"}
              iconPosition="left"
            >
              {isBookmarked ? "Bookmarked" : "Bookmark"}
            </Button>
            <Button
              variant={isCompleted ? "success" : "primary"}
              onClick={handleMarkComplete}
              iconName={isCompleted ? "CheckCircle" : "Circle"}
              iconPosition="left"
            >
              {isCompleted ? "Completed" : "Mark Complete"}
            </Button>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {lessonData.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary-50 text-primary text-sm rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Description */}
            <div>
              <h3 className="font-heading font-semibold text-text-primary mb-3">
                About This Lesson
              </h3>
              <div className="prose prose-sm max-w-none">
                <p className="text-text-secondary leading-relaxed">
                  {showFullDescription 
                    ? lessonData.description
                    : `${lessonData.description.substring(0, 200)}...`
                  }
                </p>
                <Button
                  variant="text"
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="mt-2 p-0 text-primary"
                >
                  {showFullDescription ? 'Show Less' : 'Show More'}
                </Button>
              </div>
            </div>

            {/* Learning Objectives */}
            <div>
              <h3 className="font-heading font-semibold text-text-primary mb-3">
                What You'll Learn
              </h3>
              <ul className="space-y-2">
                {lessonData.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                    <span className="text-text-secondary">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-text-primary mb-4">
              Lesson Resources
            </h3>
            {lessonData.resources.length === 0 ? (
              <div className="text-center py-8">
                <Icon name="FileX" size={48} className="text-text-tertiary mx-auto mb-4" />
                <p className="text-text-secondary">No resources available for this lesson</p>
              </div>
            ) : (
              <div className="space-y-3">
                {lessonData.resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg hover:bg-surface-tertiary transition-colors duration-150"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name={getResourceIcon(resource.type)} size={20} className="text-primary" />
                      <div>
                        <h4 className="font-medium text-text-primary">{resource.title}</h4>
                        {resource.size && (
                          <p className="text-sm text-text-secondary">{resource.size}</p>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      iconName={resource.type === 'link' ? 'ExternalLink' : 'Download'}
                      iconPosition="right"
                    >
                      {resource.type === 'link' ? 'Open' : 'Download'}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'instructor' && (
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <Image
                src={instructorData.avatar}
                alt={instructorData.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-heading font-semibold text-text-primary">
                  {instructorData.name}
                </h3>
                <p className="text-text-secondary mb-2">{instructorData.title}</p>
                <div className="flex items-center space-x-4 text-sm text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={16} className="text-warning fill-current" />
                    <span>{instructorData.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={16} />
                    <span>{instructorData.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="BookOpen" size={16} />
                    <span>{instructorData.courses} courses</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-text-primary mb-2">About the Instructor</h4>
              <p className="text-text-secondary leading-relaxed">{instructorData.bio}</p>
            </div>

            <div className="flex space-x-3">
              <Button variant="outline" iconName="MessageSquare" iconPosition="left">
                Message Instructor
              </Button>
              <Button variant="text" iconName="User" iconPosition="left">
                View Profile
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonInfo;