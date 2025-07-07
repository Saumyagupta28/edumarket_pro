import React from 'react';
import Icon from '../../../components/AppIcon';

const CourseOverview = ({ course }) => {
  return (
    <div className="space-y-8">
      {/* Course Description */}
      <div>
        <h2 className="text-xl font-heading font-semibold text-text-primary mb-4">
          Course Description
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-text-secondary leading-relaxed mb-4">
            {course.fullDescription}
          </p>
          <p className="text-text-secondary leading-relaxed">
            This comprehensive course is designed to take you from beginner to advanced level, 
            providing hands-on experience with real-world projects and industry best practices. 
            You'll learn through a combination of video lectures, practical exercises, and 
            interactive assignments that reinforce your understanding.
          </p>
        </div>
      </div>

      {/* Learning Outcomes */}
      <div>
        <h2 className="text-xl font-heading font-semibold text-text-primary mb-4">
          What You'll Learn
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {course.learningOutcomes.map((outcome, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Icon name="CheckCircle" size={20} className="text-success flex-shrink-0 mt-0.5" />
              <span className="text-text-secondary">{outcome}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Requirements */}
      <div>
        <h2 className="text-xl font-heading font-semibold text-text-primary mb-4">
          Requirements
        </h2>
        <div className="space-y-3">
          {course.requirements.map((requirement, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Icon name="Dot" size={16} className="text-text-tertiary flex-shrink-0 mt-2" />
              <span className="text-text-secondary">{requirement}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Target Audience */}
      <div>
        <h2 className="text-xl font-heading font-semibold text-text-primary mb-4">
          Who This Course Is For
        </h2>
        <div className="space-y-3">
          {course.targetAudience.map((audience, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Icon name="Users" size={16} className="text-primary flex-shrink-0 mt-1" />
              <span className="text-text-secondary">{audience}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Course Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-surface-secondary rounded-lg p-6 text-center">
          <Icon name="Clock" size={32} className="text-primary mx-auto mb-3" />
          <h3 className="font-heading font-semibold text-text-primary mb-2">
            {course.totalDuration}
          </h3>
          <p className="text-text-secondary text-sm">Total Duration</p>
        </div>
        <div className="bg-surface-secondary rounded-lg p-6 text-center">
          <Icon name="PlayCircle" size={32} className="text-primary mx-auto mb-3" />
          <h3 className="font-heading font-semibold text-text-primary mb-2">
            {course.lessonCount} Lessons
          </h3>
          <p className="text-text-secondary text-sm">Video Content</p>
        </div>
        <div className="bg-surface-secondary rounded-lg p-6 text-center">
          <Icon name="Award" size={32} className="text-primary mx-auto mb-3" />
          <h3 className="font-heading font-semibold text-text-primary mb-2">
            Certificate
          </h3>
          <p className="text-text-secondary text-sm">Upon Completion</p>
        </div>
      </div>
    </div>
  );
};

export default CourseOverview;