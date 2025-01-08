import React from 'react';
import { Home, Calendar, List, Users, MessageSquare, Folder, Settings, BookOpen, BarChart2 } from 'lucide-react';
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
    { icon: List, label: 'Sessions', path: '/sessions' },
    { icon: Calendar, label: 'Calendar', path: '/calendar' },
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
    { icon: Folder, label: 'Resources', path: '/resources' },
    { icon: BarChart2, label: 'Analytics', path: '/analytics' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const menteeNavItems: NavItem[] = [
    { icon: Home, label: 'Overview', path: '/dashboard' },
    { icon: Users, label: 'Find Mentors', path: '/mentors' },
    { icon: Calendar, label: 'My Sessions', path: '/sessions' },
    { icon: BookOpen, label: 'Learning Path', path: '/learning-path' },
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
    { icon: Folder, label: 'Resources', path: '/resources' },
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