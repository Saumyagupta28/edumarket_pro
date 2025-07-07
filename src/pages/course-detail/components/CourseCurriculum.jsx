import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CourseCurriculum = ({ curriculum, onLessonPreview }) => {
  const [expandedSections, setExpandedSections] = useState(new Set([0]));

  const toggleSection = (sectionIndex) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionIndex)) {
      newExpanded.delete(sectionIndex);
    } else {
      newExpanded.add(sectionIndex);
    }
    setExpandedSections(newExpanded);
  };

  const handleLessonPreview = (lesson) => {
    if (lesson.isPreviewable && onLessonPreview) {
      onLessonPreview(lesson);
    }
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getTotalSectionDuration = (section) => {
    return section.lessons.reduce((total, lesson) => total + lesson.duration, 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-semibold text-text-primary">
          Course Curriculum
        </h2>
        <div className="flex items-center space-x-4 text-sm text-text-secondary">
          <span>{curriculum.length} sections</span>
          <span>
            {curriculum.reduce((total, section) => total + section.lessons.length, 0)} lessons
          </span>
          <span>
            {formatDuration(
              curriculum.reduce((total, section) => 
                total + getTotalSectionDuration(section), 0
              )
            )}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {curriculum.map((section, sectionIndex) => (
          <div key={sectionIndex} className="border border-border rounded-lg overflow-hidden">
            {/* Section Header */}
            <button
              onClick={() => toggleSection(sectionIndex)}
              className="w-full flex items-center justify-between p-4 bg-surface-secondary hover:bg-surface-tertiary transition-colors duration-150"
            >
              <div className="flex items-center space-x-3">
                <Icon 
                  name={expandedSections.has(sectionIndex) ? "ChevronDown" : "ChevronRight"} 
                  size={20} 
                  className="text-text-secondary"
                />
                <div className="text-left">
                  <h3 className="font-heading font-medium text-text-primary">
                    Section {sectionIndex + 1}: {section.title}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {section.lessons.length} lessons • {formatDuration(getTotalSectionDuration(section))}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {section.isCompleted && (
                  <Icon name="CheckCircle" size={20} className="text-success" />
                )}
              </div>
            </button>

            {/* Section Content */}
            {expandedSections.has(sectionIndex) && (
              <div className="border-t border-border">
                {section.lessons.map((lesson, lessonIndex) => (
                  <div
                    key={lessonIndex}
                    className="flex items-center justify-between p-4 hover:bg-surface-secondary/50 transition-colors duration-150 border-b border-border-light last:border-b-0"
                  >
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="flex-shrink-0">
                        {lesson.type === 'video' ? (
                          <Icon name="Play" size={16} className="text-primary" />
                        ) : lesson.type === 'quiz' ? (
                          <Icon name="HelpCircle" size={16} className="text-secondary" />
                        ) : (
                          <Icon name="FileText" size={16} className="text-text-secondary" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-text-primary truncate">
                          {lesson.title}
                        </h4>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="text-sm text-text-secondary">
                            {formatDuration(lesson.duration)}
                          </span>
                          {lesson.isCompleted && (
                            <div className="flex items-center space-x-1">
                              <Icon name="CheckCircle" size={14} className="text-success" />
                              <span className="text-xs text-success">Completed</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {lesson.isPreviewable && (
                        <Button
                          variant="ghost"
                          onClick={() => handleLessonPreview(lesson)}
                          className="text-primary hover:text-primary-700 text-sm px-3 py-1"
                        >
                          Preview
                        </Button>
                      )}
                      {lesson.isLocked ? (
                        <Icon name="Lock" size={16} className="text-text-tertiary" />
                      ) : (
                        <Icon name="Unlock" size={16} className="text-success" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Curriculum Summary */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl font-heading font-bold text-primary mb-1">
              {curriculum.length}
            </div>
            <div className="text-sm text-text-secondary">Sections</div>
          </div>
          <div>
            <div className="text-2xl font-heading font-bold text-primary mb-1">
              {curriculum.reduce((total, section) => total + section.lessons.length, 0)}
            </div>
            <div className="text-sm text-text-secondary">Lessons</div>
          </div>
          <div>
            <div className="text-2xl font-heading font-bold text-primary mb-1">
              {formatDuration(
                curriculum.reduce((total, section) => 
                  total + getTotalSectionDuration(section), 0
                )
              )}
            </div>
            <div className="text-sm text-text-secondary">Total Duration</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCurriculum;