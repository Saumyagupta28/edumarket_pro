import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EnrollmentSidebar = ({ course, onEnroll }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const navigate = useNavigate();

  const handleEnroll = () => {
    if (onEnroll) {
      onEnroll();
    }
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleShare = () => {
    setShowShareMenu(!showShareMenu);
  };

  const handlePreview = () => {
    navigate('/video-player');
  };

  const shareOptions = [
    { name: 'Facebook', icon: 'Facebook', color: 'text-blue-600' },
    { name: 'Twitter', icon: 'Twitter', color: 'text-blue-400' },
    { name: 'LinkedIn', icon: 'Linkedin', color: 'text-blue-700' },
    { name: 'Copy Link', icon: 'Link', color: 'text-text-secondary' }
  ];

  const calculateDiscount = () => {
    if (course.originalPrice && course.price < course.originalPrice) {
      return Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);
    }
    return 0;
  };

  const discount = calculateDiscount();

  return (
    <div className="sticky top-24 space-y-6">
      {/* Price Card */}
      <div className="bg-surface border border-border rounded-xl p-6 shadow-elevation-3">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <span className="text-3xl font-heading font-bold text-text-primary">
              ${course.price}
            </span>
            {course.originalPrice && course.originalPrice > course.price && (
              <span className="text-lg text-text-tertiary line-through">
                ${course.originalPrice}
              </span>
            )}
          </div>
          {discount > 0 && (
            <div className="inline-flex items-center bg-error text-white px-3 py-1 rounded-full text-sm font-medium">
              {discount}% OFF
            </div>
          )}
        </div>

        <div className="space-y-3 mb-6">
          <Button
            variant="primary"
            onClick={handleEnroll}
            className="w-full py-3 text-lg font-semibold"
          >
            Enroll Now
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

        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleWishlist}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-150 ${
              isWishlisted 
                ? 'bg-error-50 text-error hover:bg-error-100' :'bg-surface-secondary text-text-secondary hover:bg-surface-tertiary'
            }`}
          >
            <Icon name={isWishlisted ? "Heart" : "Heart"} size={18} className={isWishlisted ? "fill-current" : ""} />
            <span className="text-sm font-medium">
              {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
            </span>
          </button>
          
          <div className="relative">
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-surface-secondary text-text-secondary hover:bg-surface-tertiary transition-colors duration-150"
            >
              <Icon name="Share2" size={18} />
              <span className="text-sm font-medium">Share</span>
            </button>
            
            {showShareMenu && (
              <div className="absolute right-0 top-12 w-48 bg-surface border border-border rounded-lg shadow-elevation-4 py-2 z-50">
                {shareOptions.map((option, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-surface-secondary transition-colors duration-150"
                  >
                    <Icon name={option.icon} size={16} className={option.color} />
                    <span className="text-sm text-text-primary">{option.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="text-center text-sm text-text-secondary">
          30-day money-back guarantee
        </div>
      </div>

      {/* Course Includes */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <h3 className="font-heading font-semibold text-text-primary mb-4">
          This course includes:
        </h3>
        <div className="space-y-3">
          {course.includes.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Icon name={item.icon} size={18} className="text-primary flex-shrink-0" />
              <span className="text-sm text-text-secondary">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Course Stats */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <h3 className="font-heading font-semibold text-text-primary mb-4">
          Course Details
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Skill Level</span>
            <span className="text-sm font-medium text-text-primary">{course.level}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Students</span>
            <span className="text-sm font-medium text-text-primary">{course.enrolledCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Languages</span>
            <span className="text-sm font-medium text-text-primary">{course.language}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Captions</span>
            <span className="text-sm font-medium text-text-primary">
              {course.captions ? 'Yes' : 'No'}
            </span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-200 rounded-xl p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="TrendingUp" size={20} className="text-primary" />
          <h3 className="font-heading font-semibold text-text-primary">
            Popular Choice
          </h3>
        </div>
        <div className="space-y-2 text-sm">
          <p className="text-text-secondary">
            <span className="font-medium text-primary">127 students</span> enrolled in the last 7 days
          </p>
          <p className="text-text-secondary">
            <span className="font-medium text-primary">4.8/5</span> average rating from recent reviews
          </p>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="flex items-center justify-center space-x-4 py-4">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="text-xs text-text-secondary">Secure Payment</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Award" size={16} className="text-accent" />
          <span className="text-xs text-text-secondary">Certificate</span>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentSidebar;