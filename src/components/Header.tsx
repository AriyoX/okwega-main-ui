import { Bell, Search } from 'lucide-react';

interface HeaderProps {
  user: {
    name: string;
    avatar?: string;
  };
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 fixed top-0 right-0 left-0 z-20">
      <div className="h-full px-4 lg:px-6 flex items-center justify-between">
        <div className="flex-1 flex items-center">
          <div className="max-w-lg w-full lg:max-w-xs relative hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search..."
              type="search"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-500">
            <Bell className="h-5 w-5" />
          </button>
          
          <div className="flex items-center">
            {user.avatar ? (
              <img
                className="h-8 w-8 rounded-full"
                src={user.avatar}
                alt={user.name}
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                {user.name.charAt(0)}
              </div>
            )}
            <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">
              {user.name}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}