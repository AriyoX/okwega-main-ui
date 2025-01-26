import React from 'react';
import { Home, Calendar, List, Users, MessageSquare, Folder, Settings, BookOpen, BarChart2, X, CreditCard } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

interface User {
  id?: string;
  name: string;
  email?: string;
  avatar?: string;
}

interface SidebarProps {
  role: 'mentor' | 'mentee';
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ role, user, isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  
  const mentorNavItems: NavItem[] = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Mentees', path: '/mentees' },
    { icon: List, label: 'Sessions', path: '/sessions-mentor' },
    { icon: Calendar, label: 'Calendar', path: '/calendar' },
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
    { icon: Folder, label: 'Resources', path: '/resources-mentor' },
    { icon: BarChart2, label: 'Analytics', path: '/analytics' },
    { icon: CreditCard, label: 'Payments', path: '/payments-mentor' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const menteeNavItems: NavItem[] = [
    { icon: Home, label: 'Overview', path: '/' },
    { icon: Users, label: 'Find Mentors', path: '/mentors' },
    { icon: List, label: 'My Sessions', path: '/sessions' },
    { icon: Calendar, label: 'Calendar', path: '/calendar' },
    { icon: BookOpen, label: 'Learning Path', path: '/learning-path' },
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
    { icon: Folder, label: 'Resources', path: '/resources' },
    { icon: CreditCard, label: 'Payments', path: '/payments' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const navItems = role === 'mentor' ? mentorNavItems : menteeNavItems;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-50 transition-opacity lg:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50 h-screen w-64
          transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 transition-transform duration-200 ease-in-out
          bg-white border-r border-gray-200 pt-16 lg:pt-0
        `}
      >
        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 p-2 text-gray-500 hover:bg-gray-100 rounded-md"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col h-full">
          {/* Header Section */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              {user?.avatar ? (
                <img
                  className="h-10 w-10 rounded-full object-cover border border-gray-200"
                  src={user.avatar}
                  alt={user.name}
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-lg font-medium text-white">
                    {user?.name.charAt(0)}
                  </span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 capitalize">{role}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center px-4 py-2.5 text-sm font-medium rounded-lg
                    transition duration-150 ease-in-out
                    ${isActive 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}