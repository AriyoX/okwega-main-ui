import { Users, BookOpen, Clock, Calendar } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';

const upcomingSessions = [
  {
    id: '1',
    mentee: 'John Doe',
    topic: 'Career Development Session',
    time: 'Today, 2:00 PM',
  },
  {
    id: '2',
    mentee: 'John Doe',
    topic: 'Career Development Session',
    time: 'Today, 2:00 PM',
  },
  {
    id: '3',
    mentee: 'John Doe',
    topic: 'Career Development Session',
    time: 'Today, 2:00 PM',
  },
];

const recentMessages = [
  {
    id: '1',
    user: {
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    message: 'Question about next session...',
  },
  {
    id: '2',
    user: {
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    message: 'Question about next session...',
  },
  {
    id: '3',
    user: {
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    message: 'Question about next session...',
  },
];

interface MentorDashboardProps {
  sidebarOpen: boolean;
  onSidebarClose: () => void;
}

export function MentorDashboard({ sidebarOpen, onSidebarClose }: MentorDashboardProps) {
  const currentUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: undefined};

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 pt-16">
      <Sidebar role="mentor" 
        user={currentUser} 
        isOpen={sidebarOpen} 
        onClose={onSidebarClose} />
      
      <main className="flex-1 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Active Mentees</p>
                  <p className="text-2xl font-semibold">12</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <div className="flex items-center">
                <BookOpen className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Completed Sessions</p>
                  <p className="text-2xl font-semibold">48</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Hours Mentored</p>
                  <p className="text-2xl font-semibold">96</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Earnings</p>
                  <p className="text-2xl font-semibold">$2,400</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-medium mb-4">Upcoming Sessions</h2>
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium">{session.topic}</h3>
                      <p className="text-sm text-gray-500">with {session.mentee}</p>
                    </div>
                    <div className="text-sm text-gray-500">{session.time}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-medium mb-4">Recent Messages</h2>
              <div className="space-y-4">
                {recentMessages.map((message) => (
                  <div key={message.id} className="flex items-center space-x-4">
                    <img
                      src={message.user.avatar}
                      alt={message.user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="font-medium">{message.user.name}</h3>
                      <p className="text-sm text-gray-500">{message.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}