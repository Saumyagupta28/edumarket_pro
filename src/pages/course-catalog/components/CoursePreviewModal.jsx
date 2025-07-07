import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CoursePreviewModal = ({ course, isOpen, onClose, onEnroll }) => {
  if (!isOpen || !course) return null;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icon key={i} name="Star" size={16} className="text-accent fill-current" />);
    }

    if (hasHalfStar) {
      stars.push(<Icon key="half" name="Star" size={16} className="text-accent fill-current opacity-50" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Icon key={`empty-${i}`} name="Star" size={16} className="text-text-tertiary" />);
    }

    return stars;
  };

  const curriculum = [
    { id: 1, title: "Introduction to the Course", duration: "5:30", isPreview: true },
    { id: 2, title: "Setting Up Your Environment", duration: "12:45", isPreview: false },
    { id: 3, title: "Basic Concepts Overview", duration: "18:20", isPreview: true },
    { id: 4, title: "Hands-on Practice Session", duration: "25:15", isPreview: false },
    { id: 5, title: "Advanced Techniques", duration: "22:30", isPreview: false }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-elevation-6">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-heading font-semibold text-text-primary text-xl">Course Preview</h2>
          <Button variant="ghost" onClick={onClose} className="p-2">
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row max-h-[calc(90vh-80px)]">
          {/* Video Preview */}
          <div className="lg:w-2/3 bg-black relative">
            <div className="aspect-video flex items-center justify-center">
              <div className="text-center text-white">
                <Icon name="Play" size={64} className="mx-auto mb-4 opacity-80" />
                <p className="text-lg font-medium mb-2">Course Trailer</p>
                <p className="text-white/80">Click to play preview</p>
              </div>
            </div>
            
            {/* Video Controls Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <Button variant="primary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                <Icon name="Play" size={16} className="mr-2" />
                Play Preview
              </Button>
              <div className="text-white text-sm">3:45</div>
            </div>
          </div>

          {/* Course Info */}
          <div className="lg:w-1/3 p-6 overflow-y-auto">
            {/* Course Title */}
            <h3 className="font-heading font-bold text-text-primary text-xl mb-2">{course.title}</h3>
            
            {/* Instructor */}
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-text-primary">{course.instructor.name}</p>
                <p className="text-text-secondary text-sm">{course.instructor.title}</p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center space-x-1">
                {renderStars(course.rating)}
              </div>
              <span className="text-text-primary font-medium">{course.rating}</span>
              <span className="text-text-secondary text-sm">({course.reviewCount} reviews)</span>
            </div>

            {/* Course Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-3 bg-surface-secondary rounded-lg">
                <Icon name="Users" size={20} className="mx-auto mb-1 text-primary" />
                <p className="text-text-primary font-medium text-sm">{course.enrollmentCount.toLocaleString()}</p>
                <p className="text-text-secondary text-xs">Students</p>
              </div>
              <div className="text-center p-3 bg-surface-secondary rounded-lg">
                <Icon name="Clock" size={20} className="mx-auto mb-1 text-primary" />
                <p className="text-text-primary font-medium text-sm">{course.duration}</p>
                <p className="text-text-secondary text-xs">Duration</p>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-2">
                {course.originalPrice && course.originalPrice > course.price && (
                  <span className="text-text-tertiary text-lg line-through">
                    ${course.originalPrice}
                  </span>
                )}
                <span className="text-primary font-bold text-2xl">
                  {course.price === 0 ? 'Free' : `$${course.price}`}
                </span>
              </div>
              {course.originalPrice && course.originalPrice > course.price && (
                <div className="inline-block bg-error text-error-foreground px-2 py-1 rounded-md text-xs font-medium">
                  {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                </div>
              )}
            </div>

            {/* Curriculum Preview */}
            <div className="mb-6">
              <h4 className="font-heading font-semibold text-text-primary mb-3">Course Content</h4>
              <div className="space-y-2">
                {curriculum.slice(0, 3).map((lesson) => (
                  <div key={lesson.id} className="flex items-center justify-between py-2 px-3 bg-surface-secondary rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon name="Play" size={14} className="text-text-secondary" />
                      <span className="text-text-primary text-sm">{lesson.title}</span>
                      {lesson.isPreview && (
                        <span className="text-primary text-xs bg-primary-50 px-2 py-0.5 rounded-full">Preview</span>
                      )}
                    </div>
                    <span className="text-text-secondary text-xs">{lesson.duration}</span>
                  </div>
                ))}
                <div className="text-center py-2">
                  <span className="text-text-secondary text-sm">+ {curriculum.length - 3} more lessons</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                variant="primary"
                onClick={() => onEnroll(course)}
                className="w-full"
              >
                {course.price === 0 ? 'Enroll for Free' : 'Enroll Now'}
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                className="w-full"
              >
                View Full Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePreviewModal;