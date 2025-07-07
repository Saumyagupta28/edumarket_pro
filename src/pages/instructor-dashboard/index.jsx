import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import RoleBasedNavigation from '../../components/ui/RoleBasedNavigation';
import MetricsCard from './components/MetricsCard';
import CourseCard from './components/CourseCard';
import StudentTable from './components/StudentTable';
import RevenueChart from './components/RevenueChart';
import PaymentHistory from './components/PaymentHistory';
import QuickActions from './components/QuickActions';
import NotificationPanel from './components/NotificationPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const InstructorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  // Mock data
  const metricsData = [
    {
      title: "Total Students",
      value: "2,847",
      change: "+12.5%",
      changeType: "increase",
      icon: "Users",
      color: "primary"
    },
    {
      title: "Revenue This Month",
      value: "$18,420",
      change: "+8.2%",
      changeType: "increase",
      icon: "DollarSign",
      color: "success"
    },
    {
      title: "Course Rating",
      value: "4.8",
      change: "+0.3",
      changeType: "increase",
      icon: "Star",
      color: "warning"
    },
    {
      title: "Active Enrollments",
      value: "1,234",
      change: "+15.7%",
      changeType: "increase",
      icon: "BookOpen",
      color: "secondary"
    }
  ];

  const coursesData = [
    {
      id: 1,
      title: "Advanced React Patterns",
      description: "Master advanced React concepts including hooks, context, and performance optimization techniques for building scalable applications.",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
      status: "published",
      enrollments: 1247,
      rating: 4.9,
      reviews: 234,
      revenue: "12,450",
      duration: "8.5 hours"
    },
    {
      id: 2,
      title: "JavaScript Fundamentals",
      description: "Complete guide to JavaScript from basics to advanced concepts including ES6+, async programming, and modern development practices.",
      thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop",
      status: "published",
      enrollments: 892,
      rating: 4.7,
      reviews: 156,
      revenue: "8,920",
      duration: "12 hours"
    },
    {
      id: 3,
      title: "Node.js Backend Development",
      description: "Build robust backend applications with Node.js, Express, and MongoDB. Learn API development, authentication, and deployment.",
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
      status: "draft",
      enrollments: 0,
      rating: 0,
      reviews: 0,
      revenue: "0",
      duration: "10 hours"
    }
  ];

  const studentsData = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      course: "Advanced React Patterns",
      progress: 85,
      enrolledDate: "2024-01-15"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@email.com",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      course: "JavaScript Fundamentals",
      progress: 62,
      enrolledDate: "2024-01-20"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.rodriguez@email.com",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      course: "Advanced React Patterns",
      progress: 94,
      enrolledDate: "2024-01-12"
    },
    {
      id: 4,
      name: "David Kim",
      email: "david.kim@email.com",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      course: "JavaScript Fundamentals",
      progress: 38,
      enrolledDate: "2024-01-25"
    }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 12500 },
    { month: 'Feb', revenue: 15200 },
    { month: 'Mar', revenue: 18400 },
    { month: 'Apr', revenue: 16800 },
    { month: 'May', revenue: 21300 },
    { month: 'Jun', revenue: 18420 }
  ];

  const paymentsData = [
    {
      id: 1,
      description: "Course Sales - Advanced React Patterns",
      amount: 2450,
      date: "Jan 28, 2024",
      status: "completed",
      course: "Advanced React Patterns"
    },
    {
      id: 2,
      description: "Course Sales - JavaScript Fundamentals",
      amount: 1890,
      date: "Jan 25, 2024",
      status: "completed",
      course: "JavaScript Fundamentals"
    },
    {
      id: 3,
      description: "Monthly Payout",
      amount: 15420,
      date: "Jan 31, 2024",
      status: "pending"
    },
    {
      id: 4,
      description: "Course Sales - Advanced React Patterns",
      amount: 980,
      date: "Jan 22, 2024",
      status: "failed",
      course: "Advanced React Patterns"
    }
  ];

  const notificationsData = [
    {
      id: 1,
      type: "enrollment",
      title: "New Student Enrollment",
      message: "Sarah Johnson enrolled in Advanced React Patterns",
      timestamp: "2 minutes ago",
      read: false
    },
    {
      id: 2,
      type: "review",
      title: "New Course Review",
      message: "Michael Chen left a 5-star review for JavaScript Fundamentals",
      timestamp: "1 hour ago",
      read: false
    },
    {
      id: 3,
      type: "payment",
      title: "Payment Received",
      message: "You received $245 from course sales",
      timestamp: "3 hours ago",
      read: true
    },
    {
      id: 4,
      type: "message",
      title: "Student Message",
      message: "Emily Rodriguez sent you a message about lesson 5",
      timestamp: "5 hours ago",
      read: false
    }
  ];

  const handleEditCourse = (courseId) => {
    console.log('Edit course:', courseId);
  };

  const handleCourseAnalytics = (courseId) => {
    console.log('View analytics for course:', courseId);
  };

  const handleManageCourse = (courseId) => {
    console.log('Manage course:', courseId);
  };

  const handleMessageStudent = (studentId) => {
    console.log('Message student:', studentId);
  };

  const handleViewProgress = (studentId) => {
    console.log('View progress for student:', studentId);
  };

  const handleCreateCourse = () => {
    console.log('Create new course');
  };

  const handleViewMessages = () => {
    console.log('View messages');
  };

  const handleViewAnalytics = () => {
    console.log('View analytics');
  };

  const handleSettings = () => {
    console.log('Open settings');
  };

  const handleMarkAsRead = (notificationId) => {
    console.log('Mark notification as read:', notificationId);
  };

  const handleMarkAllAsRead = () => {
    console.log('Mark all notifications as read');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'courses', label: 'My Courses', icon: 'BookOpen' },
    { id: 'students', label: 'Students', icon: 'Users' },
    { id: 'revenue', label: 'Revenue', icon: 'DollarSign' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader userRole="instructor" userName="Dr. Alex Thompson" />
      <RoleBasedNavigation userRole="instructor" />

      <main className="lg:ml-64 pt-16">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold text-text-primary">Instructor Dashboard</h1>
              <p className="text-text-secondary mt-2">Manage your courses and track your teaching success</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <Button
                variant="ghost"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2"
              >
                <Icon name="Bell" size={20} />
                <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  3
                </span>
              </Button>
              <Button variant="primary" iconName="Plus" onClick={handleCreateCourse}>
                Create Course
              </Button>
            </div>
          </div>

          {/* Notifications Panel */}
          {showNotifications && (
            <div className="mb-8">
              <NotificationPanel
                notifications={notificationsData}
                onMarkAsRead={handleMarkAsRead}
                onMarkAllAsRead={handleMarkAllAsRead}
              />
            </div>
          )}

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metricsData.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric.title}
                value={metric.value}
                change={metric.change}
                changeType={metric.changeType}
                icon={metric.icon}
                color={metric.color}
              />
            ))}
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-border mb-8">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3 py-4 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border-dark'
                  }`}
                >
                  <Icon name={tab.icon} size={18} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <RevenueChart data={revenueData} type="bar" />
                </div>
                <div>
                  <div className="bg-surface border border-border rounded-xl p-6 shadow-elevation-2">
                    <h3 className="font-heading font-semibold text-text-primary text-lg mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      {notificationsData.slice(0, 4).map((notification) => (
                        <div key={notification.id} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-text-primary text-sm font-medium">{notification.title}</p>
                            <p className="text-text-secondary text-xs mt-1">{notification.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'courses' && (
              <div className="space-y-6">
                {coursesData.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onEdit={handleEditCourse}
                    onAnalytics={handleCourseAnalytics}
                    onManage={handleManageCourse}
                  />
                ))}
              </div>
            )}

            {activeTab === 'students' && (
              <StudentTable
                students={studentsData}
                onMessage={handleMessageStudent}
                onViewProgress={handleViewProgress}
              />
            )}

            {activeTab === 'revenue' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <RevenueChart data={revenueData} type="line" />
                <PaymentHistory payments={paymentsData} />
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <RevenueChart data={revenueData} type="bar" />
                <div className="bg-surface border border-border rounded-xl p-6 shadow-elevation-2">
                  <h3 className="font-heading font-semibold text-text-primary text-lg mb-4">Performance Metrics</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Course Completion Rate</span>
                      <span className="font-semibold text-text-primary">78%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Average Rating</span>
                      <span className="font-semibold text-text-primary">4.8/5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Student Retention</span>
                      <span className="font-semibold text-text-primary">85%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Monthly Growth</span>
                      <span className="font-semibold text-success">+12.5%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Quick Actions */}
      <QuickActions
        onCreateCourse={handleCreateCourse}
        onViewMessages={handleViewMessages}
        onAnalytics={handleViewAnalytics}
        onSettings={handleSettings}
      />
    </div>
  );
};

export default InstructorDashboard;