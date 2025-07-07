import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CourseReviews = ({ reviews, rating, reviewCount }) => {
  const [sortBy, setSortBy] = useState('newest');
  const [filterRating, setFilterRating] = useState('all');
  const [showAllReviews, setShowAllReviews] = useState(false);

  const ratingDistribution = [
    { stars: 5, count: 847, percentage: 68 },
    { stars: 4, count: 234, percentage: 19 },
    { stars: 3, count: 89, percentage: 7 },
    { stars: 2, count: 45, percentage: 4 },
    { stars: 1, count: 23, percentage: 2 }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'highest', label: 'Highest Rating' },
    { value: 'lowest', label: 'Lowest Rating' },
    { value: 'helpful', label: 'Most Helpful' }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Ratings' },
    { value: '5', label: '5 Stars' },
    { value: '4', label: '4 Stars' },
    { value: '3', label: '3 Stars' },
    { value: '2', label: '2 Stars' },
    { value: '1', label: '1 Star' }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Rating Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Overall Rating */}
        <div className="text-center lg:text-left">
          <div className="text-4xl font-heading font-bold text-text-primary mb-2">
            {rating}
          </div>
          <div className="flex items-center justify-center lg:justify-start mb-2">
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={20}
                className={i < Math.floor(rating) ? 'text-accent fill-current' : 'text-text-tertiary'}
              />
            ))}
          </div>
          <p className="text-text-secondary">
            Based on {reviewCount} reviews
          </p>
        </div>

        {/* Rating Distribution */}
        <div className="lg:col-span-2">
          <div className="space-y-3">
            {ratingDistribution.map((item) => (
              <div key={item.stars} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 w-16">
                  <span className="text-sm text-text-secondary">{item.stars}</span>
                  <Icon name="Star" size={14} className="text-accent fill-current" />
                </div>
                <div className="flex-1 h-2 bg-surface-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-accent rounded-full transition-all duration-300"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-text-secondary w-12 text-right">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 pb-6 border-b border-border">
        <div className="flex items-center space-x-4">
          <div>
            <label className="text-sm font-medium text-text-secondary mb-1 block">
              Sort by
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-text-secondary mb-1 block">
              Filter by
            </label>
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Button variant="primary">
          Write a Review
        </Button>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {displayedReviews.map((review, index) => (
          <div key={index} className="bg-surface border border-border rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <Image
                src={review.user.avatar}
                alt={review.user.name}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-text-primary">
                      {review.user.name}
                    </h4>
                    <p className="text-sm text-text-secondary">
                      {formatDate(review.date)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={16}
                        className={i < review.rating ? 'text-accent fill-current' : 'text-text-tertiary'}
                      />
                    ))}
                  </div>
                </div>
                
                <p className="text-text-secondary leading-relaxed mb-4">
                  {review.comment}
                </p>
                
                {review.pros && review.pros.length > 0 && (
                  <div className="mb-3">
                    <h5 className="text-sm font-medium text-success mb-2">
                      What they liked:
                    </h5>
                    <ul className="space-y-1">
                      {review.pros.map((pro, proIndex) => (
                        <li key={proIndex} className="flex items-start space-x-2">
                          <Icon name="Plus" size={14} className="text-success flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-text-secondary">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {review.cons && review.cons.length > 0 && (
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-error mb-2">
                      Areas for improvement:
                    </h5>
                    <ul className="space-y-1">
                      {review.cons.map((con, conIndex) => (
                        <li key={conIndex} className="flex items-start space-x-2">
                          <Icon name="Minus" size={14} className="text-error flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-text-secondary">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-sm text-text-secondary hover:text-primary transition-colors duration-150">
                      <Icon name="ThumbsUp" size={16} />
                      <span>Helpful ({review.helpfulCount})</span>
                    </button>
                    <button className="flex items-center space-x-1 text-sm text-text-secondary hover:text-primary transition-colors duration-150">
                      <Icon name="MessageCircle" size={16} />
                      <span>Reply</span>
                    </button>
                  </div>
                  {review.verified && (
                    <div className="flex items-center space-x-1 text-sm text-success">
                      <Icon name="CheckCircle" size={16} />
                      <span>Verified Purchase</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Reviews */}
      {!showAllReviews && reviews.length > 5 && (
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => setShowAllReviews(true)}
            className="px-8"
          >
            Show All Reviews ({reviews.length})
          </Button>
        </div>
      )}

      {/* Review Summary */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-6">
        <h3 className="font-heading font-semibold text-text-primary mb-4">
          Review Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-primary mb-1">
              {Math.round((reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length) * 10) / 10}
            </div>
            <div className="text-sm text-text-secondary">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-primary mb-1">
              {Math.round((reviews.filter(review => review.rating >= 4).length / reviews.length) * 100)}%
            </div>
            <div className="text-sm text-text-secondary">Positive Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-primary mb-1">
              {reviews.filter(review => review.verified).length}
            </div>
            <div className="text-sm text-text-secondary">Verified Purchases</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseReviews;