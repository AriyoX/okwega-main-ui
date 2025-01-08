import { Bell, Search, Menu, User, Compass, Settings, LogOut, HelpCircle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface User {
  name: string;
  email?: string;
  avatar?: string;
  role?: string;
}

interface HeaderProps {
  user: User;
  onMenuClick: () => void;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'message' | 'reminder' | 'update';
}

export function Header({ user, onMenuClick }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Sample notifications - in a real app, these would come from a backend
  const notifications: Notification[] = [
    {
      id: '1',
      title: 'New Message',
      message: 'Sarah Wilson sent you a message about your next session',
      time: '5 minutes ago',
      read: false,
      type: 'message'
    },
    {
      id: '2',
      title: 'Session Reminder',
      message: 'Your mentoring session starts in 1 hour',
      time: '1 hour ago',
      read: false,
      type: 'reminder'
    },
    {
      id: '3',
      title: 'Learning Path Update',
      message: 'New content available in Frontend Development Path',
      time: '2 hours ago',
      read: true,
      type: 'update'
    }
  ];

  // Close notifications when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get unread notification count
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    // Implement your logout logic here
    console.log('Logging out...');
  };
  
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'message':
        return '💬';
      case 'reminder':
        return '🔔';
      case 'update':
        return '📚';
      default:
        return '📌';
    }
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="h-16 px-4 flex items-center justify-between max-w-8xl mx-auto">
        {/* Menu Button - Mobile Only */}
        <button
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5 text-gray-500" />
        </button>

        {/* Logo */}
        <div className="lg:w-64 flex items-center space-x-2 ml-2.5">
        <Compass className="h-8 w-8 text-blue-600" />
        <span className="text-2xl font-bold text-blue-900">Okwega</span>
        </div>

        {/* Search and Actions Container */}
        <div className="flex-1 flex items-center justify-end lg:justify-between">
          {/* Desktop Search */}
          <div className="hidden lg:flex items-center flex-1 max-w-2xl mx-8">
            <div className="w-full relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white 
                          placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          text-sm transition duration-150 ease-in-out"
                placeholder="Search anything..."
                type="search"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search Toggle */}
            <button 
              className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-md"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-md relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white">{unreadCount}</span>
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                      <button className="text-xs text-blue-600 hover:text-blue-800">
                        Mark all as read
                      </button>
                    </div>
                  </div>
                  
                  <div className="max-h-[400px] overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                            !notification.read ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="flex items-start">
                            <span className="text-xl mr-3">
                              {getNotificationIcon(notification.type)}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900">
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-500 line-clamp-2">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-6 text-center text-gray-500">
                        No notifications
                      </div>
                    )}
                  </div>

                  <div className="px-4 py-2 border-t border-gray-100">
                    <button className="text-sm text-center w-full text-blue-600 hover:text-blue-800">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                className="flex items-center space-x-3 p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                onClick={() => setShowProfile(!showProfile)}
              >
                {user.avatar ? (
                  <img
                    className="h-8 w-8 rounded-full object-cover border border-gray-200"
                    src={user.avatar}
                    alt={user.name}
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium text-gray-700">{user.name}</p>
                  {user.role && (
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                  )}
                </div>
              </button>

              {/* Profile Dropdown Menu */}
              {showProfile && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  {/* Profile Header */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    {user.email && (
                      <p className="text-sm text-gray-500 truncate">{user.email}</p>
                    )}
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowProfile(false)}
                    >
                      <User className="h-4 w-4 mr-3" />
                      View Profile
                    </Link>

                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowProfile(false)}
                    >
                      <Settings className="h-4 w-4 mr-3" />
                      Settings
                    </Link>

                    <Link
                      to="/help"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowProfile(false)}
                    >
                      <HelpCircle className="h-4 w-4 mr-3" />
                      Help & Support
                    </Link>
                  </div>

                  {/* Logout */}
                <div className="py-1 border-t border-gray-100">
                  <button
                    onClick={() => {
                      handleLogout();
                      setShowProfile(false);
                    }}
                    className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Log Out
                  </button>
                </div>
              </div>
            )}
            
            {/* User Profile
            <div className="flex items-center">
              {user.avatar ? (
                <img
                  className="h-8 w-8 rounded-full object-cover border border-gray-200"
                  src={user.avatar}
                  alt={user.name}
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {user.name.charAt(0)}
                  </span>
                </div>
              )}
              <span className="hidden lg:block ml-3 text-sm font-medium text-gray-700">
                {user.name}
              </span>
            </div>
             */}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="lg:hidden px-4 pb-4 border-t border-gray-100">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white 
                        placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 
                        focus:border-transparent text-sm transition duration-150 ease-in-out"
              placeholder="Search anything..."
              type="search"
              autoFocus
            />
          </div>
        </div>
      )}
      </div>
    </header>
  );
}