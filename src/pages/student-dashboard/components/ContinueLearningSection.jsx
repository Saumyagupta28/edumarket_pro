import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ContinueLearningSection = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const enrolledCourses = [
    {
      id: 1,
      title: "Advanced React Patterns",
      instructor: "Sarah Johnson",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop",
      progress: 65,
      totalLessons: 24,
      completedLessons: 16,
      lastWatched: "2 hours ago",
      duration: "8h 30m",
      category: "Web Development"
    },
    {
      id: 2,
      title: "UI/UX Design Fundamentals",
      instructor: "Michael Chen",
      thumbnail: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?w=400&h=225&fit=crop",
      progress: 40,
      totalLessons: 18,
      completedLessons: 7,
      lastWatched: "1 day ago",
      duration: "6h 45m",
      category: "Design"
    },
    {
      id: 3,
      title: "Python for Data Science",
      instructor: "Dr. Emily Rodriguez",
      thumbnail: "https://images.pixabay.com/photo/2018/05/08/08/44/artificial-intelligence-3382507_1280.jpg?w=400&h=225&fit=crop",
      progress: 85,
      totalLessons: 32,
      completedLessons: 27,
      lastWatched: "3 hours ago",
      duration: "12h 15m",
      category: "Data Science"
    },
    {
      id: 4,
      title: "Digital Marketing Mastery",
      instructor: "Alex Thompson",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop",
      progress: 25,
      totalLessons: 20,
      completedLessons: 5,
      lastWatched: "5 days ago",
      duration: "9h 20m",
      category: "Marketing"
    }
  ];

  const handleContinueCourse = (courseId) => {
    navigate('/video-player');
  };

  const handleViewCourse = (courseId) => {
    navigate('/course-detail');
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="mb-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl lg:text-2xl font-heading font-bold text-text-primary">
            Continue Learning
          </h2>
          <p className="text-text-secondary mt-1">
            Pick up where you left off
          </p>
        </div>
        <div className="hidden lg:flex items-center space-x-2">
          <Button
            variant="ghost"
            onClick={() => scroll('left')}
            className="p-2"
          >
            <Icon name="ChevronLeft" size={20} />
          </Button>
          <Button
            variant="ghost"
            onClick={() => scroll('right')}
            className="p-2"
          >
            <Icon name="ChevronRight" size={20} />
          </Button>
        </div>
      </div>

      {/* Courses Grid/Scroll */}
      <div className="relative">
        <div 
          ref={scrollRef}
          className="flex lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide"
        >
          {enrolledCourses.map((course) => (
            <div
              key={course.id}
              className="flex-shrink-0 w-80 lg:w-auto bg-surface rounded-xl border border-border shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-200 group"
            >
              {/* Course Thumbnail */}
              <div className="relative overflow-hidden rounded-t-xl">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center justify-between text-white text-sm">
                    <span className="bg-black/50 px-2 py-1 rounded-md">
                      {course.completedLessons}/{course.totalLessons} lessons
                    </span>
                    <span className="bg-black/50 px-2 py-1 rounded-md">
                      {course.duration}
                    </span>
                  </div>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-5">
                <div className="mb-3">
                  <span className="inline-block bg-primary-100 text-primary text-xs font-medium px-2 py-1 rounded-md mb-2">
                    {course.category}
                  </span>
                  <h3 className="font-heading font-semibold text-text-primary text-lg mb-1 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-text-secondary text-sm">
                    by {course.instructor}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-text-secondary">Progress</span>
                    <span className="font-medium text-text-primary">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-surface-secondary rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                {/* Last Watched */}
                <div className="flex items-center text-text-tertiary text-sm mb-4">
                  <Icon name="Clock" size={14} className="mr-1" />
                  <span>Last watched {course.lastWatched}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button
                    variant="primary"
                    onClick={() => handleContinueCourse(course.id)}
                    className="flex-1"
                    iconName="Play"
                    iconPosition="left"
                  >
                    Continue
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleViewCourse(course.id)}
                    className="px-3"
                  >
                    <Icon name="Eye" size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContinueLearningSection;