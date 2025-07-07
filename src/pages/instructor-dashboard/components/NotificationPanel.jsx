import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationPanel = ({ notifications, onMarkAsRead, onMarkAllAsRead }) => {
  const [filter, setFilter] = useState('all');

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'enrollment':
        return 'UserPlus';
      case 'review':
        return 'Star';
      case 'message':
        return 'MessageCircle';
      case 'payment':
        return 'DollarSign';
      case 'system':
        return 'Bell';
      default:
        return 'Info';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'enrollment':
        return 'text-success';
      case 'review':
        return 'text-warning';
      case 'message':
        return 'text-primary';
      case 'payment':
        return 'text-success';
      case 'system':
        return 'text-secondary';
      default:
        return 'text-text-tertiary';
    }
  };

  const filteredNotifications = notifications.filter(notification => 
    filter === 'all' || 
    (filter === 'unread' && !notification.read) ||
    notification.type === filter
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="bg-surface border border-border rounded-xl shadow-elevation-2">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <h3 className="font-heading font-semibold text-text-primary text-lg">Notifications</h3>
            {unreadCount > 0 && (
              <span className="bg-error text-white text-xs rounded-full px-2 py-1 font-medium">
                {unreadCount}
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <Button
              variant="text"
              onClick={onMarkAllAsRead}
              className="text-primary hover:text-primary-700"
            >
              Mark all as read
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {['all', 'unread', 'enrollment', 'review', 'message', 'payment'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-150 ${
                filter === filterType
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-surface-secondary text-text-secondary hover:text-text-primary'
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 border-b border-border-light hover:bg-surface-secondary transition-colors duration-150 ${
              !notification.read ? 'bg-primary-50' : ''
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full bg-surface-tertiary flex items-center justify-center flex-shrink-0 ${
                !notification.read ? 'bg-primary-100' : ''
              }`}>
                <Icon 
                  name={getNotificationIcon(notification.type)} 
                  size={16} 
                  className={getNotificationColor(notification.type)}
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className={`font-medium text-sm ${
                      !notification.read ? 'text-text-primary' : 'text-text-secondary'
                    }`}>
                      {notification.title}
                    </p>
                    <p className="text-text-secondary text-sm mt-1 line-clamp-2">
                      {notification.message}
                    </p>
                    <p className="text-text-tertiary text-xs mt-2">
                      {notification.timestamp}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    {!notification.read && (
                      <button
                        onClick={() => onMarkAsRead(notification.id)}
                        className="text-primary hover:text-primary-700 text-xs font-medium"
                      >
                        Mark as read
                      </button>
                    )}
                    <Button variant="ghost" className="p-1">
                      <Icon name="MoreVertical" size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredNotifications.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="Bell" size={48} className="mx-auto text-text-tertiary mb-4" />
          <p className="text-text-secondary">No notifications found.</p>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;