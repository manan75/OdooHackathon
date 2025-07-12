import React, { useState } from 'react';
import { Bell, Check, X, Mail, MailOpen, Trash2, Settings, Filter } from 'lucide-react';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New message from John Doe",
      message: "Hey, I wanted to discuss the project proposal with you. Are you available for a quick call?",
      time: "2 minutes ago",
      isRead: false,
      type: "message",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: 2,
      title: "Project deadline reminder",
      message: "The React dashboard project is due tomorrow. Make sure to submit all deliverables.",
      time: "1 hour ago",
      isRead: false,
      type: "reminder",
      avatar: null
    },
    {
      id: 3,
      title: "Team meeting scheduled",
      message: "Weekly team standup has been scheduled for tomorrow at 10 AM in the conference room.",
      time: "3 hours ago",
      isRead: true,
      type: "meeting",
      avatar: null
    },
    {
      id: 4,
      title: "Sarah Wilson commented",
      message: "Great work on the new feature! The user interface looks amazing and very intuitive.",
      time: "5 hours ago",
      isRead: true,
      type: "comment",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: 5,
      title: "System maintenance alert",
      message: "Scheduled maintenance will occur tonight from 2 AM to 4 AM. Some services may be unavailable.",
      time: "1 day ago",
      isRead: false,
      type: "alert",
      avatar: null
    },
    {
      id: 6,
      title: "New follower",
      message: "Alex Johnson started following your profile. Check out their latest projects!",
      time: "2 days ago",
      isRead: true,
      type: "social",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
    }
  ]);

  const [filter, setFilter] = useState('all');

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const toggleRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id 
        ? { ...notification, isRead: !notification.isRead }
        : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => 
      ({ ...notification, isRead: true })
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'message': return <Mail className="w-4 h-4 text-blue-500" />;
      case 'reminder': return <Bell className="w-4 h-4 text-orange-500" />;
      case 'meeting': return <Bell className="w-4 h-4 text-green-500" />;
      case 'comment': return <Bell className="w-4 h-4 text-purple-500" />;
      case 'alert': return <Bell className="w-4 h-4 text-red-500" />;
      case 'social': return <Bell className="w-4 h-4 text-pink-500" />;
      default: return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'message': return 'bg-blue-100 text-blue-800';
      case 'reminder': return 'bg-orange-100 text-orange-800';
      case 'meeting': return 'bg-green-100 text-green-800';
      case 'comment': return 'bg-purple-100 text-purple-800';
      case 'alert': return 'bg-red-100 text-red-800';
      case 'social': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.isRead;
    if (filter === 'read') return notification.isRead;
    return notification.type === filter;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative mr-4">
                <Bell className="w-8 h-8 text-blue-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                <p className="text-sm text-gray-600">
                  {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={markAllAsRead}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Check className="w-4 h-4 mr-2" />
                Mark All Read
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-500 rounded-md">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter by:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'All' },
              { key: 'unread', label: 'Unread' },
              { key: 'read', label: 'Read' },
              { key: 'message', label: 'Messages' },
              { key: 'reminder', label: 'Reminders' },
              { key: 'meeting', label: 'Meetings' },
              { key: 'comment', label: 'Comments' },
              { key: 'alert', label: 'Alerts' },
              { key: 'social', label: 'Social' }
            ].map(filterOption => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filter === filterOption.key
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-500">You're all caught up! Check back later for new updates.</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow ${
                  !notification.isRead ? 'border-l-4 border-l-blue-500' : ''
                }`}
              >
                <div className="flex items-start space-x-4">
                  {/* Avatar or Icon */}
                  <div className="flex-shrink-0">
                    {notification.avatar ? (
                      <img
                        src={notification.avatar}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        {getTypeIcon(notification.type)}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <h3 className={`text-sm font-medium ${
                          notification.isRead ? 'text-gray-700' : 'text-gray-900'
                        }`}>
                          {notification.title}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(notification.type)}`}>
                          {notification.type}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                    <p className={`text-sm ${
                      notification.isRead ? 'text-gray-600' : 'text-gray-800'
                    }`}>
                      {notification.message}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex-shrink-0 flex items-center space-x-2">
                    <button
                      onClick={() => toggleRead(notification.id)}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      title={notification.isRead ? 'Mark as unread' : 'Mark as read'}
                    >
                      {notification.isRead ? <Mail className="w-4 h-4" /> : <MailOpen className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete notification"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Showing {filteredNotifications.length} of {notifications.length} notifications
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;