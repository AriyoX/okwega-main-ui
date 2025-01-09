import { Users, BookOpen, Clock, Calendar, MessageSquare } from 'lucide-react';

const upcomingSessions = [
  {
    id: '1',
    mentee: 'John Doe',
    topic: 'Career Development Session',
    time: 'Today, 2:00 PM',
  },
  {
    id: '2',
    mentee: 'Alice Smith',
    topic: 'Frontend Mentoring',
    time: 'Tomorrow, 10:00 AM',
  },
  {
    id: '3',
    mentee: 'Bob Johnson',
    topic: 'Code Review',
    time: 'Friday, 3:00 PM',
  },
];

const recentMessages = [
  {
    id: '1',
    user: {
      name: 'John Doe',
      avatar: 'https://api.dicebear.com/7.x/ лица/svg?seed=JohnDoe',
    },
    message: 'Question about next session...',
  },
  {
    id: '2',
    user: {
      name: 'Alice Smith',
      avatar: 'https://api.dicebear.com/7.x/ лица/svg?seed=AliceSmith',
    },
    message: 'Thank you for the last session!',
  },
  {
    id: '3',
    user: {
      name: 'Bob Johnson',
      avatar: 'https://api.dicebear.com/7.x/ лица/svg?seed=BobJohnson',
    },
    message: 'Need help with a coding problem.',
  },
];

export function MentorDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Dashboard Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900">Mentor Dashboard</h1>
        <p className="text-gray-500">Here's an overview of your mentoring activities.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4">
            <div className="flex items-center">
              <div className="p-3 bg-indigo-100 text-indigo-500 rounded-md">
                <Users className="w-6 h-6" />
              </div>
              <div className="ml-5">
                <dt className="text-sm font-medium text-gray-500 truncate">Active Mentees</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">12</dd>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 text-green-500 rounded-md">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="ml-5">
                <dt className="text-sm font-medium text-gray-500 truncate">Completed Sessions</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">48</dd>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 text-blue-500 rounded-md">
                <Clock className="w-6 h-6" />
              </div>
              <div className="ml-5">
                <dt className="text-sm font-medium text-gray-500 truncate">Hours Mentored</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">96</dd>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 text-yellow-500 rounded-md">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="ml-5">
                <dt className="text-sm font-medium text-gray-500 truncate">Total Earnings</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">$2,400</dd>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Sessions */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Sessions</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-base font-medium text-gray-900">{session.topic}</h3>
                    <p className="text-sm text-gray-500">With {session.mentee}</p>
                  </div>
                  <div className="text-sm text-gray-700">{session.time}</div>
                </div>
              </div>
            ))}
            {upcomingSessions.length === 0 && (
              <div className="px-6 py-4 text-center text-gray-500">
                No upcoming sessions.
              </div>
            )}
          </div>
          {upcomingSessions.length > 0 && (
            <div className="px-6 py-3 bg-gray-50 text-center">
              <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                View all sessions
              </a>
            </div>
          )}
        </div>

        {/* Recent Messages */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Messages</h2>
              <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                View all
              </a>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {recentMessages.map((message) => (
              <div key={message.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={message.user.avatar}
                      alt={message.user.name}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">{message.user.name}</p>
                    <p className="text-sm text-gray-500 truncate">{message.message}</p>
                  </div>
                  <div className="ml-2 text-gray-400">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
            {recentMessages.length === 0 && (
              <div className="px-6 py-4 text-center text-gray-500">
                No recent messages.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}