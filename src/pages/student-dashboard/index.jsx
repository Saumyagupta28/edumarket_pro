import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import GlobalHeader from '../../components/ui/GlobalHeader';
import RoleBasedNavigation from '../../components/ui/RoleBasedNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import WelcomeHero from './components/WelcomeHero';
import ContinueLearningSection from './components/ContinueLearningSection';
import RecommendedCoursesSection from './components/RecommendedCoursesSection';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const StudentDashboard = () => {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const studentData = {
    name: "John Doe",
    coursesCompleted: 12,
    hoursLearned: 48,
    certificatesEarned: 8,
    currentStreak: 7
  };

  useEffect(() => {
    // Simulate data loading
    const loadDashboardData = () => {
      // This would typically fetch user data and course progress
      console.log('Loading dashboard data...');
    };

    loadDashboardData();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const toggleLeftSidebar = () => {
    setIsLeftSidebarOpen(!isLeftSidebarOpen);
  };

  return (
    <>
      <Helmet>
        <title>Student Dashboard - EduMarket Pro</title>
        <meta name="description" content="Access your enrolled courses, track learning progress, and discover new educational opportunities on EduMarket Pro." />
        <meta name="keywords" content="student dashboard, online learning, course progress, education platform" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Global Header */}
        <GlobalHeader 
          userRole="student" 
          userName={studentData.name}
          notificationCount={3}
        />

        {/* Role-based Navigation */}
        <RoleBasedNavigation userRole="student" />

        {/* Main Layout */}
        <div className="flex">
          {/* Left Sidebar */}
          <LeftSidebar 
            isOpen={isLeftSidebarOpen}
            onClose={() => setIsLeftSidebarOpen(false)}
          />

          {/* Main Content */}
          <main className="flex-1 lg:px-8 px-4 py-6 pb-20 md:pb-6">
            {/* Mobile Sidebar Toggle */}
            <div className="lg:hidden mb-4">
              <Button
                variant="outline"
                onClick={toggleLeftSidebar}
                iconName="Filter"
                iconPosition="left"
                className="mb-4"
              >
                Filters
              </Button>
            </div>

            {/* Breadcrumb */}
            <BreadcrumbTrail showHome={false} />

            {/* Pull to Refresh Indicator */}
            {refreshing && (
              <div className="flex items-center justify-center py-4 mb-4">
                <div className="flex items-center space-x-2 text-primary">
                  <div className="animate-spin">
                    <Icon name="RefreshCw" size={20} />
                  </div>
                  <span className="text-sm font-medium">Refreshing...</span>
                </div>
              </div>
            )}

            {/* Welcome Hero Section */}
            <WelcomeHero
              userName={studentData.name}
              coursesCompleted={studentData.coursesCompleted}
              hoursLearned={studentData.hoursLearned}
              certificatesEarned={studentData.certificatesEarned}
              currentStreak={studentData.currentStreak}
            />

            {/* Continue Learning Section */}
            <ContinueLearningSection />

            {/* Recommended Courses Section */}
            <RecommendedCoursesSection />

            {/* Mobile Pull to Refresh */}
            <div className="md:hidden flex justify-center mt-8">
              <Button
                variant="outline"
                onClick={handleRefresh}
                disabled={refreshing}
                iconName="RefreshCw"
                iconPosition="left"
                className={refreshing ? 'animate-pulse' : ''}
              >
                {refreshing ? 'Refreshing...' : 'Refresh Content'}
              </Button>
            </div>
          </main>

          {/* Right Sidebar */}
          <RightSidebar />
        </div>

        {/* Floating Action Button - Mobile */}
        <div className="md:hidden fixed bottom-20 right-4 z-40">
          <Button
            variant="primary"
            onClick={handleRefresh}
            className="w-14 h-14 rounded-full shadow-elevation-4"
          >
            <Icon name="RefreshCw" size={24} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;