import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CourseCard = ({ course, onPreview, onWishlistToggle }) => {
  const [isWishlisted, setIsWishlisted] = useState(course.isWishlisted || false);
  const navigate = useNavigate();

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    if (onWishlistToggle) {
      onWishlistToggle(course.id, !isWishlisted);
    }
  };

  const handlePreviewClick = (e) => {
    e.stopPropagation();
    if (onPreview) {
      onPreview(course);
    }
  };

  const handleCardClick = () => {
    navigate('/course-detail', { state: { courseId: course.id } });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icon key={i} name="Star" size={14} className="text-accent fill-current" />);
    }

    if (hasHalfStar) {
      stars.push(<Icon key="half" name="Star" size={14} className="text-accent fill-current opacity-50" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Icon key={`empty-${i}`} name="Star" size={14} className="text-text-tertiary" />);
    }

    return stars;
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-surface border border-border rounded-xl overflow-hidden shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-300 cursor-pointer group"
    >
      {/* Course Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors duration-200"
        >
          <Icon 
            name="Heart" 
            size={16} 
            className={`${isWishlisted ? 'text-error fill-current' : 'text-white'}`} 
          />
        </button>

        {/* Course Level Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            course.level === 'Beginner' ? 'bg-success text-success-foreground' :
            course.level === 'Intermediate' ? 'bg-warning text-warning-foreground' :
            'bg-error text-error-foreground'
          }`}>
            {course.level}
          </span>
        </div>

        {/* Preview Button */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Button
            variant="primary"
            onClick={handlePreviewClick}
            className="transform scale-90 group-hover:scale-100 transition-transform duration-200"
            iconName="Play"
            iconPosition="left"
          >
            Preview
          </Button>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-4">
        {/* Course Title */}
        <h3 className="font-heading font-semibold text-text-primary text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {course.title}
        </h3>

        {/* Instructor Info */}
        <div className="flex items-center space-x-2 mb-3">
          <Image
            src={course.instructor.avatar}
            alt={course.instructor.name}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-text-secondary text-sm font-medium">{course.instructor.name}</span>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center space-x-1">
            {renderStars(course.rating)}
          </div>
          <span className="text-text-primary font-medium text-sm">{course.rating}</span>
          <span className="text-text-secondary text-sm">({course.reviewCount} reviews)</span>
        </div>

        {/* Course Stats */}
        <div className="flex items-center justify-between text-text-secondary text-sm mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={14} />
              <span>{course.enrollmentCount.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>{course.duration}</span>
            </div>
          </div>
        </div>

        {/* Price and Enrollment */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {course.originalPrice && course.originalPrice > course.price && (
              <span className="text-text-tertiary text-sm line-through">
                ${course.originalPrice}
              </span>
            )}
            <span className="text-primary font-bold text-xl">
              {course.price === 0 ? 'Free' : `$${course.price}`}
            </span>
          </div>
          
          {course.originalPrice && course.originalPrice > course.price && (
            <div className="bg-error text-error-foreground px-2 py-1 rounded-md text-xs font-medium">
              {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;