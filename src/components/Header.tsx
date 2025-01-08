import { Bell, Search, Menu, Compass } from 'lucide-react';
import { useState } from 'react';

interface User {
  name: string;
  avatar?: string;
}

interface HeaderProps {
  user: User;
  onMenuClick: () => void;
}

export function Header({ user, onMenuClick }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full" />
            </button>

            {/* User Profile */}
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
    </header>
  );
}