import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LessonPlaylist = ({ 
  lessons = [],
  currentLessonId = 1,
  onLessonSelect,
  isCollapsed = false,
  onToggleCollapse
}) => {
  const [expandedSections, setExpandedSections] = useState(new Set([1]));

  const mockLessons = [
    {
      id: 1,
      title: "Introduction to React Hooks",
      duration: "12:45",
      completed: true,
      section: "Getting Started",
      sectionId: 1,
      description: "Learn the basics of React Hooks and why they were introduced"
    },
    {
      id: 2,
      title: "useState Hook Deep Dive",
      duration: "18:30",
      completed: true,
      section: "Getting Started",
      sectionId: 1,
      description: "Master the useState hook with practical examples"
    },
    {
      id: 3,
      title: "useEffect Hook Fundamentals",
      duration: "22:15",
      completed: false,
      section: "Getting Started",
      sectionId: 1,
      description: "Understanding side effects and lifecycle with useEffect"
    },
    {
      id: 4,
      title: "Custom Hooks Creation",
      duration: "16:20",
      completed: false,
      section: "Advanced Concepts",
      sectionId: 2,
      description: "Build your own custom hooks for reusable logic"
    },
    {
      id: 5,
      title: "useContext for State Management",
      duration: "19:45",
      completed: false,
      section: "Advanced Concepts",
      sectionId: 2,
      description: "Manage global state with React Context API"
    },
    {
      id: 6,
      title: "useReducer for Complex State",
      duration: "24:10",
      completed: false,
      section: "Advanced Concepts",
      sectionId: 2,
      description: "Handle complex state logic with useReducer"
    },
    {
      id: 7,
      title: "Performance Optimization",
      duration: "20:35",
      completed: false,
      section: "Optimization",
      sectionId: 3,
      description: "Optimize your React apps with useMemo and useCallback"
    },
    {
      id: 8,
      title: "Testing React Hooks",
      duration: "17:25",
      completed: false,
      section: "Optimization",
      sectionId: 3,
      description: "Best practices for testing components with hooks"
    }
  ];

  const lessonData = lessons.length > 0 ? lessons : mockLessons;

  // Group lessons by section
  const groupedLessons = lessonData.reduce((acc, lesson) => {
    const sectionId = lesson.sectionId;
    if (!acc[sectionId]) {
      acc[sectionId] = {
        id: sectionId,
        title: lesson.section,
        lessons: []
      };
    }
    acc[sectionId].lessons.push(lesson);
    return acc;
  }, {});

  const sections = Object.values(groupedLessons);

  const toggleSection = (sectionId) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const handleLessonClick = (lesson) => {
    if (onLessonSelect) {
      onLessonSelect(lesson);
    }
  };

  const getTotalDuration = () => {
    return lessonData.reduce((total, lesson) => {
      const [minutes, seconds] = lesson.duration.split(':').map(Number);
      return total + minutes * 60 + seconds;
    }, 0);
  };

  const getCompletedCount = () => {
    return lessonData.filter(lesson => lesson.completed).length;
  };

  const formatTotalDuration = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  if (isCollapsed) {
    return (
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40">
        <Button
          variant="primary"
          onClick={onToggleCollapse}
          className="p-3 shadow-elevation-4"
        >
          <Icon name="List" size={20} />
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-80 bg-surface border-l border-border flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-heading font-semibold text-text-primary">Course Content</h3>
          <Button
            variant="ghost"
            onClick={onToggleCollapse}
            className="p-2 lg:hidden"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>
        <div className="flex items-center justify-between text-sm text-text-secondary">
          <span>{getCompletedCount()} of {lessonData.length} completed</span>
          <span>{formatTotalDuration(getTotalDuration())}</span>
        </div>
        <div className="w-full bg-border rounded-full h-2 mt-2">
          <div 
            className="bg-success h-2 rounded-full transition-all duration-300"
            style={{ width: `${(getCompletedCount() / lessonData.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Lessons List */}
      <div className="flex-1 overflow-y-auto">
        {sections.map((section) => (
          <div key={section.id} className="border-b border-border-light">
            {/* Section Header */}
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-surface-secondary transition-colors duration-150"
            >
              <div className="flex items-center space-x-3">
                <Icon 
                  name={expandedSections.has(section.id) ? "ChevronDown" : "ChevronRight"} 
                  size={16} 
                  className="text-text-secondary"
                />
                <span className="font-medium text-text-primary">{section.title}</span>
              </div>
              <span className="text-xs text-text-secondary">
                {section.lessons.length} lessons
              </span>
            </button>

            {/* Section Lessons */}
            {expandedSections.has(section.id) && (
              <div className="bg-surface-secondary">
                {section.lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => handleLessonClick(lesson)}
                    className={`w-full flex items-start space-x-3 p-4 hover:bg-surface-tertiary transition-colors duration-150 ${
                      currentLessonId === lesson.id ? 'bg-primary-50 border-r-2 border-primary' : ''
                    }`}
                  >
                    {/* Lesson Status Icon */}
                    <div className="flex-shrink-0 mt-1">
                      {lesson.completed ? (
                        <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center">
                          <Icon name="Check" size={12} color="white" />
                        </div>
                      ) : currentLessonId === lesson.id ? (
                        <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                          <Icon name="Play" size={12} color="white" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 border-2 border-border rounded-full flex items-center justify-center">
                          <Icon name="Play" size={10} className="text-text-tertiary" />
                        </div>
                      )}
                    </div>

                    {/* Lesson Content */}
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`font-medium text-sm ${
                          currentLessonId === lesson.id ? 'text-primary' : 'text-text-primary'
                        }`}>
                          {lesson.title}
                        </h4>
                        <span className="text-xs text-text-secondary font-mono">
                          {lesson.duration}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary line-clamp-2">
                        {lesson.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-border bg-surface-secondary">
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full"
            iconName="Download"
            iconPosition="left"
          >
            Download Resources
          </Button>
          <Button
            variant="text"
            className="w-full text-primary"
            iconName="MessageSquare"
            iconPosition="left"
          >
            Ask a Question
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LessonPlaylist;