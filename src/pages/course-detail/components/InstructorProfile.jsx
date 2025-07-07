import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const InstructorProfile = ({ instructor }) => {
  const handleViewProfile = () => {
    // Navigate to instructor's full profile
  };

  const handleViewCourses = () => {
    // Navigate to instructor's other courses
  };

  return (
    <div className="space-y-8">
      {/* Instructor Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <Image
          src={instructor.avatar}
          alt={instructor.name}
          className="w-24 h-24 rounded-full object-cover shadow-elevation-3"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
            {instructor.name}
          </h2>
          <p className="text-lg text-text-secondary mb-3">{instructor.title}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={16} className="text-accent fill-current" />
              <span className="font-medium">{instructor.rating}</span>
              <span>({instructor.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={16} />
              <span>{instructor.studentCount} students</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="BookOpen" size={16} />
              <span>{instructor.courseCount} courses</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleViewProfile}>
            View Profile
          </Button>
          <Button variant="primary" onClick={handleViewCourses}>
            View Courses
          </Button>
        </div>
      </div>

      {/* Bio */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          About the Instructor
        </h3>
        <div className="prose prose-gray max-w-none">
          <p className="text-text-secondary leading-relaxed mb-4">
            {instructor.bio}
          </p>
          <p className="text-text-secondary leading-relaxed">
            With over {instructor.experienceYears} years of experience in the industry, 
            {instructor.name} has helped thousands of students master complex concepts 
            through clear, practical instruction and real-world examples.
          </p>
        </div>
      </div>

      {/* Expertise & Skills */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Expertise & Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {instructor.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-primary-100 text-primary px-3 py-1 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Achievements & Credentials
        </h3>
        <div className="space-y-3">
          {instructor.achievements.map((achievement, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Icon name="Award" size={20} className="text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-text-primary">{achievement.title}</h4>
                <p className="text-sm text-text-secondary">{achievement.description}</p>
                {achievement.year && (
                  <span className="text-xs text-text-tertiary">{achievement.year}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center p-4 bg-surface-secondary rounded-lg">
          <div className="text-2xl font-heading font-bold text-primary mb-1">
            {instructor.totalStudents}
          </div>
          <div className="text-sm text-text-secondary">Total Students</div>
        </div>
        <div className="text-center p-4 bg-surface-secondary rounded-lg">
          <div className="text-2xl font-heading font-bold text-primary mb-1">
            {instructor.courseCount}
          </div>
          <div className="text-sm text-text-secondary">Courses</div>
        </div>
        <div className="text-center p-4 bg-surface-secondary rounded-lg">
          <div className="text-2xl font-heading font-bold text-primary mb-1">
            {instructor.rating}
          </div>
          <div className="text-sm text-text-secondary">Average Rating</div>
        </div>
        <div className="text-center p-4 bg-surface-secondary rounded-lg">
          <div className="text-2xl font-heading font-bold text-primary mb-1">
            {instructor.experienceYears}+
          </div>
          <div className="text-sm text-text-secondary">Years Experience</div>
        </div>
      </div>

      {/* Other Courses */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Other Courses by {instructor.name}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {instructor.otherCourses.slice(0, 4).map((course, index) => (
            <div key={index} className="bg-surface border border-border rounded-lg p-4 hover:shadow-elevation-3 transition-shadow duration-200">
              <div className="flex items-start space-x-4">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-text-primary mb-1 truncate">
                    {course.title}
                  </h4>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={12}
                          className={i < Math.floor(course.rating) ? 'text-accent fill-current' : 'text-text-tertiary'}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-text-secondary">
                      {course.rating} ({course.reviewCount})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">
                      {course.studentCount} students
                    </span>
                    <span className="font-semibold text-primary">
                      ${course.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {instructor.otherCourses.length > 4 && (
          <div className="text-center mt-6">
            <Button variant="outline" onClick={handleViewCourses}>
              View All Courses ({instructor.otherCourses.length})
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorProfile;