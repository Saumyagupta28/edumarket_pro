import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VideoHeader = ({ 
  courseTitle = "Advanced React Patterns",
  lessonTitle = "Introduction to Hooks",
  currentLesson = 1,
  totalLessons = 12,
  progress = 45,
  onExitCourse,
  showControls = true
}) => {
  const navigate = useNavigate();

  const handleExitCourse = () => {
    if (onExitCourse) {
      onExitCourse();
    } else {
      navigate('/course-detail');
    }
  };

  return (
    <div className={`absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-300 ${
      showControls ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="flex items-center justify-between p-4">
        {/* Left Side - Back Button and Course Info */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={handleExitCourse}
            className="text-white hover:bg-white/20 p-2"
          >
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <div className="text-white">
            <h1 className="font-heading font-medium text-lg leading-tight">
              {courseTitle}
            </h1>
            <p className="text-white/80 text-sm">
              {lessonTitle}
            </p>
          </div>
        </div>

        {/* Right Side - Progress Info */}
        <div className="flex items-center space-x-4 text-white">
          {/* Lesson Counter */}
          <div className="hidden sm:flex items-center space-x-2 text-white/80 text-sm">
            <Icon name="PlayCircle" size={16} />
            <span>{currentLesson} of {totalLessons}</span>
          </div>

          {/* Progress Bar */}
          <div className="hidden md:flex items-center space-x-3">
            <span className="text-white/80 text-sm font-medium">
              {progress}%
            </span>
            <div className="w-24 h-1 bg-white/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Mobile Progress Indicator */}
          <div className="md:hidden">
            <div className="w-8 h-8 relative">
              <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="2"
                  fill="none"
                />
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  stroke="rgb(245, 158, 11)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 14}`}
                  strokeDashoffset={`${2 * Math.PI * 14 * (1 - progress / 100)}`}
                  className="transition-all duration-300"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-xs font-medium">
                  {currentLesson}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Course Info Bar */}
      <div className="sm:hidden px-4 pb-2">
        <div className="flex items-center justify-between text-white/80 text-xs">
          <span>Lesson {currentLesson} of {totalLessons}</span>
          <span>{progress}% Complete</span>
        </div>
        <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden mt-1">
          <div 
            className="h-full bg-accent transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoHeader;