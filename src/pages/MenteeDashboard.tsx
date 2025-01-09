import { BookOpen, Clock, Calendar, Star } from 'lucide-react';

const learningPaths = [
  {
    id: '1',
    name: 'Frontend Development Path',
    progress: 70,
  },
  {
    id: '2',
    name: 'Backend Development Path',
    progress: 35,
  },
  {
    id: '3',
    name: 'Cloud Computing Fundamentals',
    progress: 15,
  },
];

const mentors = [
  {
    id: '1',
    name: 'Sarah Wilson',
    role: 'Senior Software Engineer at Google',
    nextSession: 'Friday, 3:00 PM',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  },
  {
    id: '2',
    name: 'John Doe',
    role: 'Lead Developer at Microsoft',
    nextSession: 'Monday, 10:00 AM',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  },
];

export function MenteeDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Dashboard Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
        <p className="text-gray-500">Here's a summary of your progress and upcoming sessions.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 text-blue-500 rounded-md">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">Sessions Completed</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">8</div>
                </dd>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4">
            <div className="flex items-center">
              <div className="p-3 bg-indigo-100 text-indigo-500 rounded-md">
                <Star className="w-5 h-5" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">Learning Paths</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">3</div>
                </dd>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 text-green-500 rounded-md">
                <Clock className="w-5 h-5" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">Hours Learned</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">24</div>
                </dd>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 text-yellow-500 rounded-md">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">Next Session</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">Tomorrow</div>
                </dd>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Mentors Section */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium leading-6 text-gray-900">My Mentors</h2>
          </div>
          <div className="px-6 py-4 divide-y divide-gray-200">
            {mentors.map((mentor) => (
              <div key={mentor.id} className="py-4 flex items-center space-x-3">
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900">{mentor.name}</h3>
                  <p className="text-gray-500 text-sm truncate">{mentor.role}</p>
                  <p className="text-green-600 text-sm">Next Session: {mentor.nextSession}</p>
                </div>
                <div>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Contact
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Progress Section */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium leading-6 text-gray-900">Learning Progress</h2>
          </div>
          <div className="px-6 py-4 space-y-6">
            {learningPaths.map((path) => (
              <div key={path.id}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-900">{path.name}</span>
                  <span className="text-sm text-gray-500">{path.progress}%</span>
                </div>
                <div className="bg-gray-100 rounded-full h-2 relative overflow-hidden">
                  <div
                    className="bg-blue-500 h-full rounded-full absolute left-0 top-0"
                    style={{ width: `${path.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}