import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CourseHero = ({ course, onEnroll, onPreview }) => {
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const navigate = useNavigate();

  const handlePreview = () => {
    setIsVideoLoading(true);
    setTimeout(() => {
      setIsVideoLoading(false);
      if (onPreview) {
        onPreview();
      }
    }, 1000);
  };

  const handleInstructorClick = () => {
    // Navigate to instructor profile or show instructor details
  };

  return (
    <div className="bg-gradient-to-br from-primary-50 to-secondary-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Video Preview */}
          <div className="lg:col-span-2">
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-elevation-4">
              <Image
                src={course.thumbnail}
                alt={`${course.title} preview`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Button
                  variant="primary"
                  onClick={handlePreview}
                  disabled={isVideoLoading}
                  className="bg-white/20 backdrop-blur-sm border-2 border-white/30 hover:bg-white/30 text-white px-8 py-4 text-lg"
                >
                  {isVideoLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Loading...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <Icon name="Play" size={24} />
                      <span>Preview Course</span>
                    </div>
                  )}
                </Button>
              </div>
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                {course.duration}
              </div>
              <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                {course.level}
              </div>
            </div>
          </div>

          {/* Course Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 text-sm text-text-secondary mb-2">
                <span>{course.category}</span>
                <Icon name="ChevronRight" size={14} />
                <span>{course.subcategory}</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary mb-4">
                {course.title}
              </h1>
              <p className="text-text-secondary leading-relaxed">
                {course.shortDescription}
              </p>
            </div>

            {/* Rating & Stats */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center space-x-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={16}
                      className={i < Math.floor(course.rating) ? 'text-accent fill-current' : 'text-text-tertiary'}
                    />
                  ))}
                </div>
                <span className="font-medium text-text-primary">{course.rating}</span>
                <span className="text-text-secondary">({course.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center space-x-1 text-text-secondary">
                <Icon name="Users" size={16} />
                <span>{course.enrolledCount} students</span>
              </div>
              <div className="flex items-center space-x-1 text-text-secondary">
                <Icon name="Clock" size={16} />
                <span>{course.totalDuration}</span>
              </div>
            </div>

            {/* Instructor */}
            <div className="flex items-center space-x-4 p-4 bg-surface rounded-lg border border-border">
              <Image
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <button
                  onClick={handleInstructorClick}
                  className="font-medium text-text-primary hover:text-primary transition-colors duration-150"
                >
                  {course.instructor.name}
                </button>
                <p className="text-sm text-text-secondary">{course.instructor.title}</p>
                <div className="flex items-center space-x-4 mt-1 text-xs text-text-tertiary">
                  <span>{course.instructor.courseCount} courses</span>
                  <span>{course.instructor.studentCount} students</span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={14} className="text-accent fill-current" />
                <span className="text-sm font-medium">{course.instructor.rating}</span>
              </div>
            </div>

            {/* Key Features */}
            <div className="space-y-3">
              <h3 className="font-heading font-semibold text-text-primary">What you'll get:</h3>
              <div className="space-y-2">
                {course.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Icon name="Check" size={16} className="text-success flex-shrink-0" />
                    <span className="text-sm text-text-secondary">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Enrollment Button */}
            <div className="lg:hidden">
              <Button
                variant="primary"
                onClick={onEnroll}
                className="w-full py-4 text-lg font-semibold"
              >
                Enroll Now - ${course.price}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHero;