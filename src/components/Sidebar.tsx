import React from 'react';
import { Home, Calendar, List, Users, MessageSquare, Folder, Settings, BookOpen, BarChart2, Menu, X } from 'lucide-react';
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
  const [isOpen, setIsOpen] = React.useState(false);
  
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
    <>
      <button
        className="lg:hidden fixed top-4 right-4 z-30 p-2 rounded-md bg-white shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      <div className={`
        fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static w-64 transition duration-200 ease-in-out z-40
        bg-white border-r border-gray-100
      `}>
        <div className="flex flex-col h-full pt-16 lg:pt-0">
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
    </>
  );
}