import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import RoleBasedNavigation from '../../components/ui/RoleBasedNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import CourseHero from './components/CourseHero';
import CourseTabNavigation from './components/CourseTabNavigation';
import CourseOverview from './components/CourseOverview';
import CourseCurriculum from './components/CourseCurriculum';
import InstructorProfile from './components/InstructorProfile';
import CourseReviews from './components/CourseReviews';
import EnrollmentSidebar from './components/EnrollmentSidebar';
import RelatedCourses from './components/RelatedCourses';
import VideoPreviewModal from './components/VideoPreviewModal';
import MobileEnrollmentBar from './components/MobileEnrollmentBar';

const CourseDetail = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedPreviewLesson, setSelectedPreviewLesson] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const navigate = useNavigate();

  // Mock course data
  const courseData = {
    id: 'react-advanced-patterns',
    title: 'Advanced React Patterns & Performance Optimization',
    shortDescription: 'Master advanced React concepts including custom hooks, context patterns, performance optimization, and modern state management techniques used in production applications.',
    fullDescription: `This comprehensive course takes you deep into advanced React development patterns and performance optimization techniques. You'll learn how to build scalable, maintainable React applications using industry best practices and cutting-edge patterns.Throughout this course, you'll explore advanced concepts like compound components, render props, higher-order components, and custom hooks. We'll dive deep into React's performance optimization features including React.memo, useMemo, useCallback, and code splitting techniques.

You'll also learn modern state management patterns, advanced TypeScript integration, testing strategies, and how to build reusable component libraries. By the end of this course, you'll have the skills to architect and build production-ready React applications that scale.`,
    category: 'Web Development',
    subcategory: 'React',
    level: 'Advanced',
    price: 89.99,
    originalPrice: 129.99,
    duration: '2h 30m',
    totalDuration: '12h 45m',
    lessonCount: 48,
    enrolledCount: '2,847',
    rating: 4.8,
    reviewCount: 1238,
    language: 'English',
    captions: true,
    hasCertificate: true,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop',
    instructor: {
      name: 'Sarah Chen',
      title: 'Senior React Developer at Meta',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      rating: 4.9,
      courseCount: 12,
      studentCount: '45,000+',
      reviewCount: 8945,
      bio: `Sarah is a Senior React Developer at Meta with over 8 years of experience building large-scale web applications. She has contributed to several open-source React projects and is passionate about teaching modern web development techniques.

She specializes in React performance optimization, state management, and component architecture. Sarah has helped numerous companies migrate their legacy applications to modern React patterns and has spoken at several international conferences about React best practices.`,
      experienceYears: 8,
      totalStudents: '45,000+',
      skills: ['React', 'TypeScript', 'Next.js', 'GraphQL', 'Node.js', 'AWS', 'Performance Optimization', 'Testing'],
      achievements: [
        {
          title: 'React Core Contributor',
          description: 'Contributed to React core library and documentation',
          year: '2022'
        },
        {
          title: 'Tech Conference Speaker',
          description: 'Keynote speaker at ReactConf 2023 and JSConf EU',
          year: '2023'
        },
        {
          title: 'Open Source Maintainer',
          description: 'Maintains popular React performance optimization library',
          year: '2021-Present'
        }
      ],
      otherCourses: [
        {
          id: 1,
          title: 'React Fundamentals for Beginners',
          thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
          rating: 4.7,
          reviewCount: 2456,
          studentCount: '12,000+',
          price: 49.99
        },
        {
          id: 2,
          title: 'TypeScript with React',
          thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
          rating: 4.8,
          reviewCount: 1876,
          studentCount: '8,500+',
          price: 69.99
        },
        {
          id: 3,
          title: 'Next.js Full Stack Development',
          thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
          rating: 4.9,
          reviewCount: 3421,
          studentCount: '15,000+',
          price: 99.99
        },
        {
          id: 4,
          title: 'React Testing Strategies',
          thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop',
          rating: 4.6,
          reviewCount: 987,
          studentCount: '5,200+',
          price: 59.99
        }
      ]
    },
    features: [
      '12+ hours of high-quality video content',
      'Downloadable resources and code examples',
      'Lifetime access to course materials',
      'Certificate of completion',
      '30-day money-back guarantee',
      'Direct instructor support'
    ],
    includes: [
      { icon: 'PlayCircle', text: '48 video lessons' },
      { icon: 'FileText', text: 'Downloadable resources' },
      { icon: 'Code', text: 'Source code included' },
      { icon: 'Award', text: 'Certificate of completion' },
      { icon: 'Infinity', text: 'Lifetime access' },
      { icon: 'MessageCircle', text: 'Instructor support' }
    ],
    learningOutcomes: [
      'Master advanced React patterns like compound components and render props',
      'Implement performance optimization techniques using React.memo and hooks',
      'Build custom hooks for complex state management scenarios',
      'Understand and apply advanced TypeScript patterns with React',
      'Create reusable component libraries with proper API design',
      'Implement code splitting and lazy loading for better performance',
      'Master advanced testing strategies for React applications',
      'Build scalable application architecture using modern patterns'
    ],
    requirements: [
      'Solid understanding of React fundamentals (components, props, state)',
      'Experience with JavaScript ES6+ features',
      'Basic knowledge of HTML, CSS, and modern web development',
      'Familiarity with npm/yarn package managers',
      'Code editor (VS Code recommended) and Node.js installed'
    ],
    targetAudience: [
      'React developers looking to advance their skills to senior level',
      'Frontend developers who want to master React performance optimization',
      'Developers building large-scale React applications',
      'Engineers preparing for senior React developer interviews',
      'Team leads who need to architect scalable React applications'
    ]
  };

  const curriculumData = [
    {
      title: 'Advanced Component Patterns',
      lessons: [
        {
          title: 'Introduction to Advanced Patterns',
          duration: 15,
          type: 'video',
          isPreviewable: true,
          isCompleted: false,
          isLocked: false
        },
        {
          title: 'Compound Components Pattern',
          duration: 22,
          type: 'video',
          isPreviewable: true,
          isCompleted: false,
          isLocked: false
        },
        {
          title: 'Render Props Pattern',
          duration: 18,
          type: 'video',
          isPreviewable: false,
          isCompleted: false,
          isLocked: true
        },
        {
          title: 'Higher-Order Components (HOCs)',
          duration: 25,
          type: 'video',
          isPreviewable: false,
          isCompleted: false,
          isLocked: true
        },
        {
          title: 'Pattern Comparison Quiz',
          duration: 10,
          type: 'quiz',
          isPreviewable: false,
          isCompleted: false,
          isLocked: true
        }
      ]
    },
    {
      title: 'Performance Optimization',
      lessons: [
        {
          title: 'React Performance Fundamentals',
          duration: 20,
          type: 'video',
          isPreviewable: false,
          isCompleted: false,
          isLocked: true
        },
        {
          title: 'React.memo and Memoization',
          duration: 28,
          type: 'video',
          isPreviewable: false,
          isCompleted: false,
          isLocked: true
        },
        {
          title: 'useMemo and useCallback Hooks',
          duration: 24,
          type: 'video',
          isPreviewable: false,
          isCompleted: false,
          isLocked: true
        },
        {
          title: 'Code Splitting and Lazy Loading',
          duration: 32,
          type: 'video',
          isPreviewable: false,
          isCompleted: false,
          isLocked: true
        },
        {
          title: 'Performance Profiling Tools',
          duration: 26,
          type: 'video',
          isPreviewable: false,
          isCompleted: false,
          isLocked: true
        }
      ]
    },
    {
      title: 'Custom Hooks Mastery',
      lessons: [
        {
          title: 'Custom Hooks Fundamentals',
          duration: 16,
          type: 'video',
          isPreviewable: false,
          isCompleted: false,
          isLocked: true
        },
        {
          title: 'Building Complex Custom Hooks',
          duration: 30,
          type: 'video',
          isPreviewable: false,
          isCompleted: false,
          isLocked: true
        },
        {
          title: 'Hook Composition Patterns',
          duration: 22,
          type: 'video',
          isPreviewable: false,
          isCompleted: false,
          isLocked: true
        },
        {
          title: 'Testing Custom Hooks',
          duration: 18,
          type: 'video',
          isPreviewable: false,
          isCompleted: false,
          isLocked: true
        }
      ]
    }
  ];

  const reviewsData = [
    {
      user: {
        name: 'Michael Rodriguez',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      rating: 5,
      date: '2024-01-15',
      comment: `This course completely transformed my understanding of React. Sarah's teaching style is exceptional - she breaks down complex concepts into digestible pieces and provides real-world examples that make everything click.

The performance optimization section alone was worth the entire course price. I was able to apply these techniques immediately to my current project and saw significant improvements in rendering performance.`,
      pros: [
        'Excellent real-world examples','Clear explanations of complex concepts','Practical performance optimization techniques','Great code organization patterns'
      ],
      cons: [
        'Could use more TypeScript examples','Some sections move quite fast'
      ],
      helpfulCount: 47,
      verified: true
    },
    {
      user: {
        name: 'Emily Chen',avatar: 'https://randomuser.me/api/portraits/women/45.jpg'
      },
      rating: 5,
      date: '2024-01-10',
      comment: `As a senior developer, I was skeptical about taking another React course, but this exceeded all my expectations. The advanced patterns section taught me techniques I wish I had known years ago.

The compound components pattern has become my go-to approach for building reusable UI components. Sarah's expertise really shines through in every lesson.`,
      pros: [
        'Advanced techniques not found elsewhere',
        'Production-ready patterns',
        'Excellent instructor expertise'
      ],
      cons: [],
      helpfulCount: 32,
      verified: true
    },
    {
      user: {
        name: 'David Kim',
        avatar: 'https://randomuser.me/api/portraits/men/28.jpg'
      },
      rating: 4,
      date: '2024-01-08',
      comment: `Great course overall! The content is definitely advanced and requires solid React fundamentals. I particularly enjoyed the custom hooks section and the performance optimization techniques.

The only minor issue is that some concepts could benefit from more step-by-step explanations, but the quality of content is top-notch.`,
      pros: [
        'Comprehensive coverage of advanced topics',
        'High-quality video production',
        'Practical exercises'
      ],
      cons: [
        'Fast-paced for some topics',
        'Assumes strong React background'
      ],
      helpfulCount: 28,
      verified: true
    },
    {
      user: {
        name: 'Lisa Thompson',
        avatar: 'https://randomuser.me/api/portraits/women/38.jpg'
      },
      rating: 5,
      date: '2024-01-05',
      comment: `This course is a masterclass in React development. I've been working with React for 3 years, but this course taught me so many new patterns and optimization techniques.

The instructor's experience at Meta really shows - these are the patterns used in real production applications at scale.`,
      pros: [
        'Industry-proven patterns',
        'Excellent real-world context',
        'Clear code examples'
      ],
      cons: [],
      helpfulCount: 41,
      verified: true
    },
    {
      user: {
        name: 'James Wilson',
        avatar: 'https://randomuser.me/api/portraits/men/42.jpg'
      },
      rating: 4,
      date: '2024-01-02',
      comment: `Solid advanced React course. The performance optimization section was particularly valuable for my current project. Sarah knows her stuff and explains concepts clearly.

Would recommend having a strong foundation in React before taking this course - it's definitely not for beginners.`,
      pros: [
        'Practical performance tips','Well-structured content','Expert instructor'
      ],
      cons: [
        'Not suitable for beginners','Could use more interactive exercises'
      ],
      helpfulCount: 19,
      verified: true
    }
  ];

  const relatedCoursesData = [
    {
      id: 'react-testing',
      title: 'Complete React Testing Guide',
      description: 'Master testing React applications with Jest, React Testing Library, and Cypress for end-to-end testing.',
      thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop',
      instructor: {
        name: 'Alex Johnson',
        avatar: 'https://randomuser.me/api/portraits/men/15.jpg'
      },
      category: 'Testing',
      level: 'Intermediate',
      duration: '8h 30m',
      totalDuration: '8h 30m',
      lessonCount: 32,
      rating: 4.7,
      reviewCount: 892,
      enrolledCount: '3,200+',
      price: 69.99,
      originalPrice: 99.99,
      hasCertificate: true,
      isPremium: false
    },
    {
      id: 'nextjs-fullstack',
      title: 'Next.js 14 Full Stack Development',
      description: 'Build modern full-stack applications with Next.js 14, including server components, API routes, and deployment.',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
      instructor: {
        name: 'Maria Garcia',
        avatar: 'https://randomuser.me/api/portraits/women/22.jpg'
      },
      category: 'Full Stack',
      level: 'Advanced',
      duration: '15h 20m',
      totalDuration: '15h 20m',
      lessonCount: 56,
      rating: 4.9,
      reviewCount: 1456,
      enrolledCount: '5,800+',
      price: 119.99,
      originalPrice: 159.99,
      hasCertificate: true,
      isPremium: true
    },
    {
      id: 'typescript-react',
      title: 'TypeScript with React - Complete Guide',
      description: 'Learn to build type-safe React applications with TypeScript, including advanced patterns and best practices.',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
      instructor: {
        name: 'Robert Chen',
        avatar: 'https://randomuser.me/api/portraits/men/35.jpg'
      },
      category: 'TypeScript',
      level: 'Intermediate',
      duration: '10h 45m',
      totalDuration: '10h 45m',
      lessonCount: 42,
      rating: 4.8,
      reviewCount: 1123,
      enrolledCount: '4,500+',
      price: 79.99,
      originalPrice: 109.99,
      hasCertificate: true,
      isPremium: false
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BookOpen' },
    { id: 'curriculum', label: 'Curriculum', icon: 'List', count: curriculumData.reduce((total, section) => total + section.lessons.length, 0) },
    { id: 'instructor', label: 'Instructor', icon: 'User' },
    { id: 'reviews', label: 'Reviews', icon: 'Star', count: reviewsData.length }
  ];

  const handleEnroll = () => {
    setIsEnrolled(true);
    // Handle enrollment logic
    console.log('Enrolling in course:', courseData.title);
  };

  const handlePreview = (lesson = null) => {
    setSelectedPreviewLesson(lesson);
    setIsPreviewModalOpen(true);
  };

  const handleLessonPreview = (lesson) => {
    handlePreview(lesson);
  };

  const customBreadcrumbs = [
    { label: 'Home', path: '/student-dashboard', icon: 'Home' },
    { label: 'Courses', path: '/course-catalog', icon: 'BookOpen' },
    { label: courseData.category, path: '/course-catalog', icon: 'Tag' },
    { label: courseData.title, path: '/course-detail', icon: 'Info' }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader userRole="student" userName="John Doe" />
      <RoleBasedNavigation userRole="student" />
      
      <main className="pt-4">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BreadcrumbTrail 
            customBreadcrumbs={customBreadcrumbs}
            courseTitle={courseData.title}
          />
        </div>

        {/* Course Hero */}
        <CourseHero 
          course={courseData}
          onEnroll={handleEnroll}
          onPreview={() => handlePreview()}
        />

        {/* Tab Navigation */}
        <CourseTabNavigation 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={tabs}
        />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Content Area */}
            <div className="lg:col-span-2 space-y-8">
              {activeTab === 'overview' && (
                <CourseOverview course={courseData} />
              )}
              
              {activeTab === 'curriculum' && (
                <CourseCurriculum 
                  curriculum={curriculumData}
                  onLessonPreview={handleLessonPreview}
                />
              )}
              
              {activeTab === 'instructor' && (
                <InstructorProfile instructor={courseData.instructor} />
              )}
              
              {activeTab === 'reviews' && (
                <CourseReviews 
                  reviews={reviewsData}
                  rating={courseData.rating}
                  reviewCount={courseData.reviewCount}
                />
              )}
            </div>

            {/* Sidebar - Desktop Only */}
            <div className="hidden lg:block">
              <EnrollmentSidebar 
                course={courseData}
                onEnroll={handleEnroll}
              />
            </div>
          </div>

          {/* Related Courses */}
          <div className="mt-16">
            <RelatedCourses 
              courses={relatedCoursesData}
              title="Students also bought"
            />
          </div>
        </div>

        {/* Mobile Enrollment Bar */}
        <MobileEnrollmentBar 
          course={courseData}
          onEnroll={handleEnroll}
          isVisible={!isEnrolled}
        />

        {/* Video Preview Modal */}
        <VideoPreviewModal 
          isOpen={isPreviewModalOpen}
          onClose={() => setIsPreviewModalOpen(false)}
          course={courseData}
          lesson={selectedPreviewLesson}
        />
      </main>
    </div>
  );
};

export default CourseDetail;