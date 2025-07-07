import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MobileEnrollmentBar = ({ course, onEnroll, isVisible = true }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleEnroll = () => {
    if (onEnroll) {
      onEnroll();
    }
  };

  const handlePreview = () => {
    navigate('/video-player');
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const calculateDiscount = () => {
    if (course.originalPrice && course.price < course.originalPrice) {
      return Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);
    }
    return 0;
  };

  const discount = calculateDiscount();

  if (!isVisible) return null;

  return (
    <>
      {/* Expanded Panel */}
      {isExpanded && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsExpanded(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-surface rounded-t-2xl p-6 shadow-elevation-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-semibold text-text-primary">
                Course Details
              </h3>
              <Button
                variant="ghost"
                onClick={() => setIsExpanded(false)}
                className="p-2"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Duration</span>
                <span className="font-medium text-text-primary">{course.totalDuration}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Lessons</span>
                <span className="font-medium text-text-primary">{course.lessonCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Level</span>
                <span className="font-medium text-text-primary">{course.level}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Certificate</span>
                <span className="font-medium text-text-primary">
                  {course.hasCertificate ? 'Included' : 'Not included'}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                variant="primary"
                onClick={handleEnroll}
                className="w-full py-3 text-lg font-semibold"
              >
                Enroll Now - ${course.price}
              </Button>
              <Button
                variant="outline"
                onClick={handlePreview}
                className="w-full py-3"
              >
                <Icon name="Play" size={20} className="mr-2" />
                Preview Course
              </Button>
            </div>

            <div className="text-center text-sm text-text-secondary mt-4">
              30-day money-back guarantee
            </div>
          </div>
        </div>
      )}

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border shadow-elevation-4 z-50 lg:hidden">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleExpanded}
              className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-colors duration-150"
            >
              <Icon name="Info" size={20} />
              <span className="text-sm font-medium">Details</span>
            </button>
            
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-heading font-bold text-text-primary">
                  ${course.price}
                </span>
                {course.originalPrice && course.originalPrice > course.price && (
                  <span className="text-sm text-text-tertiary line-through">
                    ${course.originalPrice}
                  </span>
                )}
              </div>
              {discount > 0 && (
                <span className="text-xs text-error font-medium">
                  {discount}% OFF
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={handlePreview}
              className="px-4 py-2"
            >
              <Icon name="Play" size={16} />
            </Button>
            <Button
              variant="primary"
              onClick={handleEnroll}
              className="px-6 py-2 font-semibold"
            >
              Enroll Now
            </Button>
          </div>
        </div>
      </div>

      {/* Spacer for content */}
      <div className="h-20 lg:hidden" />
    </>
  );
};

export default MobileEnrollmentBar;