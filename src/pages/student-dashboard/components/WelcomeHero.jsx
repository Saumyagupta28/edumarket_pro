import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHero = ({ 
  userName = "John Doe",
  coursesCompleted = 12,
  hoursLearned = 48,
  certificatesEarned = 8,
  currentStreak = 7
}) => {
  const stats = [
    {
      label: "Courses Completed",
      value: coursesCompleted,
      icon: "BookOpen",
      color: "text-success"
    },
    {
      label: "Hours Learned",
      value: hoursLearned,
      icon: "Clock",
      color: "text-primary"
    },
    {
      label: "Certificates Earned",
      value: certificatesEarned,
      icon: "Award",
      color: "text-accent"
    },
    {
      label: "Day Streak",
      value: currentStreak,
      icon: "Zap",
      color: "text-secondary"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-primary-50 via-surface to-secondary-50 rounded-xl p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        {/* Welcome Message */}
        <div className="mb-6 lg:mb-0">
          <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary mb-2">
            Welcome back, {userName}! 👋
          </h1>
          <p className="text-text-secondary text-lg">
            Ready to continue your learning journey?
          </p>
        </div>

        {/* Quick Action */}
        <div className="lg:ml-8">
          <div className="bg-surface rounded-lg p-4 border border-border shadow-elevation-2">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Target" size={24} color="white" />
              </div>
              <div>
                <p className="font-medium text-text-primary">Today's Goal</p>
                <p className="text-text-secondary text-sm">Complete 2 lessons</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-surface rounded-lg p-4 border border-border shadow-elevation-1">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg bg-surface-secondary flex items-center justify-center ${stat.color}`}>
                <Icon name={stat.icon} size={20} />
              </div>
              <div>
                <p className="text-2xl font-heading font-bold text-text-primary">{stat.value}</p>
                <p className="text-text-secondary text-sm">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WelcomeHero;