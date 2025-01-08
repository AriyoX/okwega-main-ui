import React from 'react';
import { Home, Calendar, Users, MessageSquare, Bell, Settings, BookOpen } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

interface SidebarProps {
  role: 'mentor' | 'mentee';
}

export function Sidebar({ role }: SidebarProps) {
  const location = useLocation();
  
  const mentorNavItems: NavItem[] = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Mentees', path: '/mentees' },
    { icon: Calendar, label: 'Sessions', path: '/sessions' },
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
    { icon: BookOpen, label: 'Resources', path: '/resources' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const menteeNavItems: NavItem[] = [
    { icon: Home, label: 'Overview', path: '/dashboard' },
    { icon: BookOpen, label: 'Learning Path', path: '/learning-path' },
    { icon: Calendar, label: 'My Sessions', path: '/sessions' },
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const navItems = role === 'mentor' ? mentorNavItems : menteeNavItems;

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-100">
      <div className="flex flex-col h-full">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Okwega</h1>
        </div>
        
        <div className="px-4 py-2">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">Menu</p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}