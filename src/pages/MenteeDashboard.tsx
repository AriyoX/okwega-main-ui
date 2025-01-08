import { BookOpen, Clock, Calendar, Star } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';

const learningPaths = [
  {
    id: '1',
    name: 'Frontend Development Path',
    progress: 70,
  },
  {
    id: '2',
    name: 'Frontend Development Path',
    progress: 70,
  },
  {
    id: '3',
    name: 'Frontend Development Path',
    progress: 70,
  },
];

const mentors = [
  {
    id: '1',
    name: 'Sarah Wilson',
    role: 'Senior Software Engineer at Google',
    nextSession: 'Friday, 3:00 PM',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    role: 'Senior Software Engineer at Google',
    nextSession: 'Friday, 3:00 PM',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

export function MenteeDashboard() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 pt-16">
      <Sidebar role="mentee" />

      <main className="flex-1 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-semibold">Overview</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg">
              <div className="flex items-center">
                <BookOpen className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Sessions Completed</p>
                  <p className="text-2xl font-semibold">8</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <div className="flex items-center">
                <Star className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Learning Paths</p>
                  <p className="text-2xl font-semibold">2</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Hours Learning</p>
                  <p className="text-2xl font-semibold">24</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Next Session</p>
                  <p className="text-2xl font-semibold">Tomorrow</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-medium mb-4">My Mentors</h2>
              <div className="space-y-4">
                {mentors.map((mentor) => (
                  <div key={mentor.id} className="flex items-center space-x-4">
                    <img
                      src={mentor.avatar}
                      alt={mentor.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-medium">{mentor.name}</h3>
                      <p className="text-sm text-gray-500">{mentor.role}</p>
                      <p className="text-sm text-green-600">Next Session: {mentor.nextSession}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-medium mb-4">Learning Progress</h2>
              <div className="space-y-6">
                {learningPaths.map((path) => (
                  <div key={path.id}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">{path.name}</span>
                      <span className="text-sm text-gray-500">{path.progress}% Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${path.progress}%` }}
                      />
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