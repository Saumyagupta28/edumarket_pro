import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RightSidebar = () => {
  const navigate = useNavigate();

  const upcomingLiveSessions = [
    {
      id: 1,
      title: "React Hooks Deep Dive",
      instructor: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      date: "Today",
      time: "3:00 PM",
      duration: "1h 30m",
      attendees: 45,
      isLive: false
    },
    {
      id: 2,
      title: "JavaScript Performance Tips",
      instructor: "Michael Chen",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      date: "Tomorrow",
      time: "2:00 PM",
      duration: "45m",
      attendees: 32,
      isLive: false
    },
    {
      id: 3,
      title: "UI Design Principles",
      instructor: "Emily Rodriguez",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      date: "Dec 28",
      time: "4:00 PM",
      duration: "2h",
      attendees: 67,
      isLive: true
    }
  ];

  const recentAchievements = [
    {
      id: 1,
      title: "Course Completion",
      description: "Completed \'Advanced React Patterns'",
      icon: "Award",
      color: "text-accent",
      bgColor: "bg-accent-100",
      time: "2 hours ago"
    },
    {
      id: 2,
      title: "Learning Streak",
      description: "7 days learning streak!",
      icon: "Zap",
      color: "text-secondary",
      bgColor: "bg-secondary-100",
      time: "1 day ago"
    },
    {
      id: 3,
      title: "Quiz Master",
      description: "Scored 95% in JavaScript Quiz",
      icon: "Trophy",
      color: "text-success",
      bgColor: "bg-success-100",
      time: "3 days ago"
    }
  ];

  const learningStreak = {
    currentStreak: 7,
    longestStreak: 15,
    weeklyGoal: 5,
    completedThisWeek: 3
  };

  const handleJoinSession = (sessionId) => {
    navigate('/video-player');
  };

  const handleViewAllSessions = () => {
    navigate('/course-catalog?filter=live');
  };

  return (
    <aside className="hidden xl:block w-80 space-y-6">
      {/* Upcoming Live Sessions */}
      <div className="bg-surface rounded-xl border border-border shadow-elevation-2 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-text-primary">
            Live Sessions
          </h3>
          <Button
            variant="text"
            onClick={handleViewAllSessions}
            className="text-primary text-sm"
          >
            View All
          </Button>
        </div>

        <div className="space-y-4">
          {upcomingLiveSessions.map((session) => (
            <div
              key={session.id}
              className="border border-border rounded-lg p-4 hover:bg-surface-secondary transition-colors duration-150"
            >
              <div className="flex items-start space-x-3">
                <Image
                  src={session.avatar}
                  alt={session.instructor}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-text-primary text-sm line-clamp-1">
                      {session.title}
                    </h4>
                    {session.isLive && (
                      <span className="bg-error text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
                        LIVE
                      </span>
                    )}
                  </div>
                  <p className="text-text-secondary text-xs mb-2">
                    by {session.instructor}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-text-tertiary mb-3">
                    <div className="flex items-center space-x-1">
                      <Icon name="Calendar" size={12} />
                      <span>{session.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>{session.time}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Users" size={12} />
                      <span>{session.attendees}</span>
                    </div>
                  </div>
                  <Button
                    variant={session.isLive ? "primary" : "outline"}
                    onClick={() => handleJoinSession(session.id)}
                    className="w-full text-xs py-2"
                    iconName={session.isLive ? "Video" : "Calendar"}
                    iconPosition="left"
                  >
                    {session.isLive ? "Join Now" : "Set Reminder"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Streak */}
      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl border border-border shadow-elevation-2 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <Icon name="Zap" size={24} color="white" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-text-primary">
              Learning Streak
            </h3>
            <p className="text-text-secondary text-sm">
              Keep up the great work!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <p className="text-2xl font-heading font-bold text-primary">
              {learningStreak.currentStreak}
            </p>
            <p className="text-text-secondary text-xs">Current Streak</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-heading font-bold text-secondary">
              {learningStreak.longestStreak}
            </p>
            <p className="text-text-secondary text-xs">Longest Streak</p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-text-secondary">Weekly Goal</span>
            <span className="text-text-primary font-medium">
              {learningStreak.completedThisWeek}/{learningStreak.weeklyGoal} days
            </span>
          </div>
          <div className="w-full bg-surface-secondary rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(learningStreak.completedThisWeek / learningStreak.weeklyGoal) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex justify-center space-x-1">
          {[...Array(7)].map((_, index) => (
            <div
              key={index}
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                index < learningStreak.currentStreak
                  ? 'bg-gradient-to-br from-primary to-secondary text-white' :'bg-surface-secondary text-text-tertiary'
              }`}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-surface rounded-xl border border-border shadow-elevation-2 p-6">
        <h3 className="font-heading font-semibold text-text-primary mb-4">
          Recent Achievements
        </h3>

        <div className="space-y-4">
          {recentAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-surface-secondary transition-colors duration-150"
            >
              <div className={`w-10 h-10 rounded-lg ${achievement.bgColor} flex items-center justify-center`}>
                <Icon name={achievement.icon} size={18} className={achievement.color} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-text-primary text-sm">
                  {achievement.title}
                </h4>
                <p className="text-text-secondary text-xs mb-1">
                  {achievement.description}
                </p>
                <p className="text-text-tertiary text-xs">
                  {achievement.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          className="w-full mt-4"
          iconName="Trophy"
          iconPosition="left"
        >
          View All Achievements
        </Button>
      </div>

      {/* Study Reminder */}
      <div className="bg-gradient-to-br from-accent-50 to-warning-50 rounded-xl border border-border shadow-elevation-2 p-6">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-accent to-warning rounded-lg flex items-center justify-center">
            <Icon name="Bell" size={20} color="white" />
          </div>
          <div>
            <h4 className="font-heading font-medium text-text-primary">
              Study Reminder
            </h4>
            <p className="text-text-secondary text-sm">
              Don't forget your daily learning!
            </p>
          </div>
        </div>
        <Button
          variant="primary"
          className="w-full"
          iconName="Clock"
          iconPosition="left"
        >
          Set Study Time
        </Button>
      </div>
    </aside>
  );
};

export default RightSidebar;