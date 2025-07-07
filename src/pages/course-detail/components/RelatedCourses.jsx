import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RelatedCourses = ({ courses, title = "Related Courses" }) => {
  const navigate = useNavigate();

  const handleCourseClick = (courseId) => {
    // Navigate to course detail page
    navigate('/course-detail');
  };

  const handleViewAll = () => {
    navigate('/course-catalog');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-semibold text-text-primary">
          {title}
        </h2>
        <Button variant="outline" onClick={handleViewAll}>
          View All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-surface border border-border rounded-xl overflow-hidden hover:shadow-elevation-4 transition-all duration-300 cursor-pointer group"
            onClick={() => handleCourseClick(course.id)}
          >
            {/* Course Thumbnail */}
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-medium">
                {course.duration}
              </div>
              <div className="absolute top-3 right-3">
                {course.isPremium && (
                  <div className="bg-accent text-white px-2 py-1 rounded text-xs font-medium">
                    Premium
                  </div>
                )}
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <Icon name="Play" size={24} color="white" />
                </div>
              </div>
            </div>

            {/* Course Content */}
            <div className="p-5">
              <div className="flex items-center space-x-2 text-xs text-text-secondary mb-2">
                <span>{course.category}</span>
                <Icon name="Dot" size={12} />
                <span>{course.level}</span>
              </div>

              <h3 className="font-heading font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
                {course.title}
              </h3>

              <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                {course.description}
              </p>

              {/* Instructor */}
              <div className="flex items-center space-x-2 mb-4">
                <Image
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-sm text-text-secondary">
                  {course.instructor.name}
                </span>
              </div>

              {/* Rating & Stats */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={14}
                        className={i < Math.floor(course.rating) ? 'text-accent fill-current' : 'text-text-tertiary'}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-text-primary">
                    {course.rating}
                  </span>
                  <span className="text-sm text-text-secondary">
                    ({course.reviewCount})
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-text-secondary">
                  <Icon name="Users" size={14} />
                  <span className="text-xs">{course.enrolledCount}</span>
                </div>
              </div>

              {/* Price & Enrollment */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-heading font-bold text-text-primary">
                    ${course.price}
                  </span>
                  {course.originalPrice && course.originalPrice > course.price && (
                    <span className="text-sm text-text-tertiary line-through">
                      ${course.originalPrice}
                    </span>
                  )}
                </div>
                <Button
                  variant="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCourseClick(course.id);
                  }}
                  className="px-4 py-2 text-sm"
                >
                  View Course
                </Button>
              </div>

              {/* Course Features */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border-light">
                <div className="flex items-center space-x-4 text-xs text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>{course.totalDuration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="PlayCircle" size={12} />
                    <span>{course.lessonCount} lessons</span>
                  </div>
                  {course.hasCertificate && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Award" size={12} />
                      <span>Certificate</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className="text-center">
        <Button variant="outline" onClick={handleViewAll} className="px-8">
          Explore More Courses
        </Button>
      </div>
    </div>
  );
};

export default RelatedCourses;