import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-elevation-2 animate-pulse">
      {/* Thumbnail Skeleton */}
      <div className="aspect-video bg-surface-tertiary"></div>
      
      {/* Content Skeleton */}
      <div className="p-4">
        {/* Title Skeleton */}
        <div className="h-6 bg-surface-tertiary rounded mb-3"></div>
        <div className="h-4 bg-surface-tertiary rounded w-3/4 mb-3"></div>
        
        {/* Instructor Skeleton */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-6 h-6 bg-surface-tertiary rounded-full"></div>
          <div className="h-4 bg-surface-tertiary rounded w-24"></div>
        </div>
        
        {/* Rating Skeleton */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-3 h-3 bg-surface-tertiary rounded"></div>
            ))}
          </div>
          <div className="h-4 bg-surface-tertiary rounded w-16"></div>
        </div>
        
        {/* Stats Skeleton */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="h-4 bg-surface-tertiary rounded w-12"></div>
            <div className="h-4 bg-surface-tertiary rounded w-16"></div>
          </div>
        </div>
        
        {/* Price Skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-6 bg-surface-tertiary rounded w-20"></div>
          <div className="h-5 bg-surface-tertiary rounded w-16"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;