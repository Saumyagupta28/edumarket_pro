import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecommendedCoursesSection = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [visibleCourses, setVisibleCourses] = useState(8);

  const recommendedCourses = [
    {
      id: 1,
      title: "Machine Learning Fundamentals",
      instructor: "Dr. James Wilson",
      thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=225&fit=crop",
      rating: 4.8,
      students: 12500,
      price: 89.99,
      originalPrice: 129.99,
      duration: "15h 30m",
      level: "Beginner",
      category: "Data Science",
      isNew: true,
      isBestseller: false
    },
    {
      id: 2,
      title: "Advanced JavaScript ES6+",
      instructor: "Lisa Anderson",
      thumbnail: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?w=400&h=225&fit=crop",
      rating: 4.9,
      students: 8900,
      price: 79.99,
      originalPrice: 119.99,
      duration: "12h 45m",
      level: "Intermediate",
      category: "Web Development",
      isNew: false,
      isBestseller: true
    },
    {
      id: 3,
      title: "Figma to Code Workflow",
      instructor: "David Kim",
      thumbnail: "https://images.pixabay.com/photo/2016/11/30/20/58/programming-1873854_1280.png?w=400&h=225&fit=crop",
      rating: 4.7,
      students: 6200,
      price: 69.99,
      originalPrice: 99.99,
      duration: "8h 20m",
      level: "Intermediate",
      category: "Design",
      isNew: true,
      isBestseller: false
    },
    {
      id: 4,
      title: "AWS Cloud Practitioner",
      instructor: "Maria Garcia",
      thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=225&fit=crop",
      rating: 4.6,
      students: 15600,
      price: 99.99,
      originalPrice: 149.99,
      duration: "18h 15m",
      level: "Beginner",
      category: "Cloud Computing",
      isNew: false,
      isBestseller: true
    },
    {
      id: 5,
      title: "Mobile App Development with React Native",
      instructor: "Robert Taylor",
      thumbnail: "https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?w=400&h=225&fit=crop",
      rating: 4.8,
      students: 9800,
      price: 94.99,
      originalPrice: 134.99,
      duration: "20h 10m",
      level: "Advanced",
      category: "Mobile Development",
      isNew: false,
      isBestseller: false
    },
    {
      id: 6,
      title: "Blockchain Development Basics",
      instructor: "Jennifer Lee",
      thumbnail: "https://images.pixabay.com/photo/2018/01/18/07/31/bitcoin-3089728_1280.jpg?w=400&h=225&fit=crop",
      rating: 4.5,
      students: 4300,
      price: 109.99,
      originalPrice: 159.99,
      duration: "14h 50m",
      level: "Intermediate",
      category: "Blockchain",
      isNew: true,
      isBestseller: false
    },
    {
      id: 7,
      title: "Digital Photography Masterclass",
      instructor: "Thomas Brown",
      thumbnail: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=225&fit=crop",
      rating: 4.9,
      students: 11200,
      price: 59.99,
      originalPrice: 89.99,
      duration: "10h 30m",
      level: "Beginner",
      category: "Photography",
      isNew: false,
      isBestseller: true
    },
    {
      id: 8,
      title: "Cybersecurity Fundamentals",
      instructor: "Amanda White",
      thumbnail: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?w=400&h=225&fit=crop",
      rating: 4.7,
      students: 7800,
      price: 84.99,
      originalPrice: 124.99,
      duration: "16h 40m",
      level: "Beginner",
      category: "Security",
      isNew: false,
      isBestseller: false
    }
  ];

  const handleEnrollCourse = (courseId) => {
    navigate('/course-detail');
  };

  const handleViewAllCourses = () => {
    navigate('/course-catalog');
  };

  const loadMoreCourses = () => {
    setVisibleCourses(prev => Math.min(prev + 4, recommendedCourses.length));
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

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner':
        return 'bg-success-100 text-success-700';
      case 'Intermediate':
        return 'bg-warning-100 text-warning-700';
      case 'Advanced':
        return 'bg-error-100 text-error-700';
      default:
        return 'bg-surface-secondary text-text-secondary';
    }
  };

  return (
    <div className="mb-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl lg:text-2xl font-heading font-bold text-text-primary">
            Recommended for You
          </h2>
          <p className="text-text-secondary mt-1">
            Based on your learning preferences
          </p>
        </div>
        <div className="flex items-center space-x-2">
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
          <Button
            variant="outline"
            onClick={handleViewAllCourses}
            iconName="ArrowRight"
            iconPosition="right"
          >
            View All
          </Button>
        </div>
      </div>

      {/* Desktop Grid View */}
      <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
        {recommendedCourses.slice(0, visibleCourses).map((course) => (
          <div
            key={course.id}
            className="bg-surface rounded-xl border border-border shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-200 group cursor-pointer"
            onClick={() => handleEnrollCourse(course.id)}
          >
            {/* Course Thumbnail */}
            <div className="relative overflow-hidden rounded-t-xl">
              <Image
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                {course.isNew && (
                  <span className="bg-accent text-white text-xs font-medium px-2 py-1 rounded-md">
                    New
                  </span>
                )}
                {course.isBestseller && (
                  <span className="bg-secondary text-white text-xs font-medium px-2 py-1 rounded-md">
                    Bestseller
                  </span>
                )}
              </div>
              <div className="absolute bottom-3 right-3">
                <span className="bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                  {course.duration}
                </span>
              </div>
            </div>

            {/* Course Content */}
            <div className="p-5">
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-block bg-primary-100 text-primary text-xs font-medium px-2 py-1 rounded-md">
                    {course.category}
                  </span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-md ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-text-primary text-lg mb-1 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-text-secondary text-sm">
                  by {course.instructor}
                </p>
              </div>

              {/* Rating and Students */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} className="text-accent fill-current" />
                  <span className="text-text-primary font-medium text-sm">{course.rating}</span>
                </div>
                <div className="flex items-center space-x-1 text-text-secondary text-sm">
                  <Icon name="Users" size={14} />
                  <span>{course.students.toLocaleString()}</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-heading font-bold text-text-primary">
                    ${course.price}
                  </span>
                  <span className="text-text-tertiary line-through text-sm">
                    ${course.originalPrice}
                  </span>
                </div>
                <Button
                  variant="primary"
                  className="px-4 py-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEnrollCourse(course.id);
                  }}
                >
                  Enroll
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Horizontal Scroll */}
      <div className="lg:hidden">
        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
        >
          {recommendedCourses.map((course) => (
            <div
              key={course.id}
              className="flex-shrink-0 w-72 bg-surface rounded-xl border border-border shadow-elevation-2 cursor-pointer"
              onClick={() => handleEnrollCourse(course.id)}
            >
              {/* Course Thumbnail */}
              <div className="relative overflow-hidden rounded-t-xl">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                  {course.isNew && (
                    <span className="bg-accent text-white text-xs font-medium px-2 py-1 rounded-md">
                      New
                    </span>
                  )}
                  {course.isBestseller && (
                    <span className="bg-secondary text-white text-xs font-medium px-2 py-1 rounded-md">
                      Bestseller
                    </span>
                  )}
                </div>
              </div>

              {/* Course Content */}
              <div className="p-4">
                <div className="mb-3">
                  <span className="inline-block bg-primary-100 text-primary text-xs font-medium px-2 py-1 rounded-md mb-2">
                    {course.category}
                  </span>
                  <h3 className="font-heading font-semibold text-text-primary mb-1 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-text-secondary text-sm">
                    by {course.instructor}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} className="text-accent fill-current" />
                    <span className="text-text-primary font-medium text-sm">{course.rating}</span>
                  </div>
                  <span className="text-lg font-heading font-bold text-text-primary">
                    ${course.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Load More Button - Desktop Only */}
      {visibleCourses < recommendedCourses.length && (
        <div className="hidden lg:flex justify-center mt-6">
          <Button
            variant="outline"
            onClick={loadMoreCourses}
            iconName="Plus"
            iconPosition="left"
          >
            Load More Courses
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecommendedCoursesSection;