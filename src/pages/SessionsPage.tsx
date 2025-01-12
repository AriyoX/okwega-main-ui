import { useState } from 'react';
import { Calendar, Clock, Search, Star, MessageSquare, Video } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Button from '@/components/ui/button';
import Card from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { VideoPreviewModal } from '@/components/VideoPreviewModal';
import { QuizModal } from '@/components/QuizModal';

interface Session {
  id: string;
  mentorId: number;
  mentorName: string;
  mentorRole: string;
  mentorCompany: string;
  type: 'video' | 'quiz';
  status: 'scheduled' | 'completed' | 'cancelled';
  dateTime: string;
  duration: number;
  topics: string[];
  notes?: string;
  rating?: number;
  feedback?: string;
  quizDetails?: {
    quizId: string;
    title: string;
    score?: number;
    totalQuestions: number;
    duration?: number; // Add duration here
  };
}

const mockSessions: Session[] = [
  {
    id: '1', mentorId: 1, mentorName: 'Sarah Wilson', mentorRole: 'Senior Software Engineer', mentorCompany: 'Google', type: 'video', status: 'scheduled', dateTime: '2025-01-15T10:00:00', duration: 60, topics: ['React', 'Frontend Architecture'] },
  { id: '2', mentorId: 2, mentorName: 'David Kumar', mentorRole: 'Principal Engineer', mentorCompany: 'Amazon', type: 'video', status: 'completed', dateTime: '2025-01-10T15:00:00', duration: 30, topics: ['System Design', 'AWS'], rating: 5, feedback: 'Excellent session! David helped me understand microservices architecture.' },
  { id: '3', mentorId: 3, mentorName: 'Emily Chen', mentorRole: 'Data Scientist', mentorCompany: 'Netflix', type: 'quiz', status: 'scheduled', dateTime: '2025-01-18T14:00:00', duration: 45, topics: ['Machine Learning', 'Python'], quizDetails: { quizId: 'quiz-101', title: 'Introduction to Machine Learning', totalQuestions: 20, duration: 45 } },
  { id: '4', mentorId: 1, mentorName: 'Sarah Wilson', mentorRole: 'Senior Software Engineer', mentorCompany: 'Google', type: 'quiz', status: 'completed', dateTime: '2025-01-05T11:30:00', duration: 60, topics: ['JavaScript', 'ES6 Features'], quizDetails: { quizId: 'quiz-102', title: 'Advanced JavaScript Concepts', score: 18, totalQuestions: 20, duration: 60 }, rating: 4, feedback: 'The quiz was challenging and helped me identify areas for improvement.' },
  { id: '5', mentorId: 4, mentorName: 'John Doe', mentorRole: 'Product Manager', mentorCompany: 'Microsoft', type: 'video', status: 'scheduled', dateTime: '2025-01-22T09:00:00', duration: 45, topics: ['Product Strategy', 'Market Analysis'] },
  { id: '6', mentorId: 2, mentorName: 'David Kumar', mentorRole: 'Principal Engineer', mentorCompany: 'Amazon', type: 'quiz', status: 'scheduled', dateTime: '2025-01-25T16:00:00', duration: 30, topics: ['Cloud Computing', 'Serverless'], quizDetails: { quizId: 'quiz-103', title: 'Serverless Architecture Fundamentals', totalQuestions: 15, duration: 30 } },
  { id: '7', mentorId: 5, mentorName: 'Alice Brown', mentorRole: 'UX Designer', mentorCompany: 'Airbnb', type: 'video', status: 'completed', dateTime: '2024-12-20T13:00:00', duration: 50, topics: ['User Research', 'Interaction Design'], rating: 5, feedback: 'Alice provided great insights into user-centered design processes.' },
  { id: '8', mentorId: 3, mentorName: 'Emily Chen', mentorRole: 'Data Scientist', mentorCompany: 'Netflix', type: 'quiz', status: 'completed', dateTime: '2024-12-15T17:00:00', duration: 55, topics: ['Data Analysis', 'SQL'], quizDetails: { quizId: 'quiz-104', title: 'Data Analysis with SQL', score: 16, totalQuestions: 20, duration: 55 }, rating: 4, feedback: 'Good quiz to test my SQL knowledge.' },
  { id: '9', mentorId: 4, mentorName: 'John Doe', mentorRole: 'Product Manager', mentorCompany: 'Microsoft', type: 'video', status: 'cancelled', dateTime: '2025-01-10T14:30:00', duration: 30, topics: ['Agile Methodology', 'Sprint Planning'] },
  { id: '10', mentorId: 5, mentorName: 'Alice Brown', mentorRole: 'UX Designer', mentorCompany: 'Airbnb', type: 'quiz', status: 'scheduled', dateTime: '2025-01-28T10:30:00', duration: 40, topics: ['Prototyping', 'Figma'], quizDetails: { quizId: 'quiz-105', title: 'Interactive Prototyping in Figma', totalQuestions: 18, duration: 40 } },
  { id: '11', mentorId: 1, mentorName: 'Sarah Wilson', mentorRole: 'Senior Software Engineer', mentorCompany: 'Google', type: 'video', status: 'scheduled', dateTime: '2025-02-01T11:00:00', duration: 75, topics: ['TypeScript', 'Node.js'] },
  { id: '12', mentorId: 2, mentorName: 'David Kumar', mentorRole: 'Principal Engineer', mentorCompany: 'Amazon', type: 'quiz', status: 'completed', dateTime: '2025-01-12T14:00:00', duration: 40, topics: ['Databases', 'NoSQL'], quizDetails: { quizId: 'quiz-106', title: 'Introduction to NoSQL Databases', score: 15, totalQuestions: 18, duration: 40 }, rating: 5, feedback: 'Very helpful quiz on NoSQL concepts.' },
  { id: '13', mentorId: 3, mentorName: 'Emily Chen', mentorRole: 'Data Scientist', mentorCompany: 'Netflix', type: 'video', status: 'completed', dateTime: '2025-01-08T10:00:00', duration: 60, topics: ['Statistical Analysis', 'R Programming'], rating: 4, feedback: 'Good session covering the basics of statistical analysis.' },
  { id: '14', mentorId: 4, mentorName: 'John Doe', mentorRole: 'Product Manager', mentorCompany: 'Microsoft', type: 'quiz', status: 'scheduled', dateTime: '2025-02-05T16:30:00', duration: 35, topics: ['User Stories', 'Product Backlog'], quizDetails: { quizId: 'quiz-107', title: 'Writing Effective User Stories', totalQuestions: 16, duration: 35 } },
  { id: '15', mentorId: 5, mentorName: 'Alice Brown', mentorRole: 'UX Designer', mentorCompany: 'Airbnb', type: 'video', status: 'scheduled', dateTime: '2025-02-10T09:30:00', duration: 50, topics: ['Usability Testing', 'A/B Testing'] },
];

export function SessionsPage() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'video' | 'quiz'>('all');
  const [sortBy, setSortBy] = useState('date');
  const [currentPage, setCurrentPage] = useState(1);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const itemsPerPage = 5; // You can adjust this value

  const filterSessions = (sessions: Session[]) => {
    return sessions.filter(session => {
      const matchesSearch =
        session.mentorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesType = filterType === 'all' || session.type === filterType;

      const matchesTab =
        (activeTab === 'upcoming' && session.status === 'scheduled') ||
        (activeTab === 'past' && session.status === 'completed');

      return matchesSearch && matchesType && matchesTab;
    });
  };

  const sortSessions = (sessions: Session[]) => {
    return [...sessions].sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime();
        case 'duration':
          return b.duration - a.duration;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });
  };

  const filteredAndSortedSessions = sortSessions(filterSessions(mockSessions));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSessions = filteredAndSortedSessions.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredAndSortedSessions.length / itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Sessions</h1>
        <p className="mt-2 text-gray-600">
          Track your mentoring sessions, review past meetings, and prepare for upcoming ones.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search sessions by mentor or topic..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={filterType} onValueChange={(value) => setFilterType(value as 'all' | 'video' | 'quiz')}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="video">Video Sessions</SelectItem>
              <SelectItem value="quiz">Quizzes</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Sort by Date</SelectItem>
              <SelectItem value="duration">Sort by Duration</SelectItem>
              <SelectItem value="rating">Sort by Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabs and Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="upcoming" className="flex gap-2">
            <Calendar className="h-4 w-4" />
            Upcoming Sessions
          </TabsTrigger>
          <TabsTrigger value="past" className="flex gap-2">
            <Clock className="h-4 w-4" />
            Past Sessions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4 mt-4">
          {currentSessions.length === 0 && filteredAndSortedSessions.length > 0 ? (
            <div className="text-center py-8 text-gray-500">
              Loading sessions...
            </div>
          ) : currentSessions.length === 0 && filteredAndSortedSessions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No upcoming sessions found.
            </div>
          ) : (
            currentSessions.map(session => (
              <Card key={session.id} className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{session.mentorName}</h3>
                    <p className="text-gray-600">{session.mentorRole} at {session.mentorCompany}</p>
                    <div className="flex items-center gap-2 text-sm">
                      {session.type === 'video' ? (
                        <Video className="h-4 w-4 text-blue-500" />
                      ) : (
                        <MessageSquare className="h-4 w-4 text-green-500" />
                      )}
                      <span>{new Date(session.dateTime).toLocaleString()}</span>
                      <span>·</span>
                      <span>{session.duration} mins</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {session.topics.map((topic, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {topic}
                        </span>
                      ))}
                    </div>
                    {session.type === 'quiz' && session.quizDetails && (
                      <div className="mt-2 text-sm text-gray-700">
                        Quiz: {session.quizDetails.title} ({session.quizDetails.totalQuestions} questions)
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    {session.status === 'scheduled' && (
                      <>

                        {session.type === 'video' && (
                          <Button className="flex items-center gap-2"
                            onClick={() => {
                              setSelectedSession(session);
                              setVideoModalOpen(true);
                            }}>
                            <Video className="h-4 w-4" />
                            Join Session
                          </Button>
                        )}
                        {session.type === 'quiz' && session.quizDetails && (
                          <Button className="flex items-center gap-2"
                            onClick={() => {
                              setSelectedSession(session);
                              setQuizModalOpen(true);
                            }}>
                            <MessageSquare className="h-4 w-4" />
                            Start Quiz
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4 mt-4">
          {currentSessions.length === 0 && filteredAndSortedSessions.length > 0 ? (
            <div className="text-center py-8 text-gray-500">
              Loading sessions...
            </div>
          ) : currentSessions.length === 0 && filteredAndSortedSessions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No past sessions found.
            </div>
          ) : (
            currentSessions.map(session => (
              <Card key={session.id} className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{session.mentorName}</h3>
                    <p className="text-gray-600">{session.mentorRole} at {session.mentorCompany}</p>
                    <div className="flex items-center gap-2 text-sm">
                      {session.type === 'video' ? (
                        <Video className="h-4 w-4 text-blue-500" />
                      ) : (
                        <MessageSquare className="h-4 w-4 text-green-500" />
                      )}
                      <span>{new Date(session.dateTime).toLocaleString()}</span>
                      <span>·</span>
                      <span>{session.duration} mins</span>
                    </div>
                    {session.rating && (
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span>{session.rating}</span>
                      </div>
                    )}
                    {session.feedback && (
                      <p className="text-gray-600 text-sm">{session.feedback}</p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {session.topics.map((topic, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {topic}
                        </span>
                      ))}
                    </div>
                    {session.type === 'quiz' && session.quizDetails && (
                      <div className="mt-2 text-sm text-gray-700">
                        Quiz: {session.quizDetails.title}
                        {session.quizDetails.score !== undefined && (
                          <span> (Score: {session.quizDetails.score}/{session.quizDetails.totalQuestions})</span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    {!session.rating && session.type === 'video' && (
                      <Button variant="outline">
                        Leave Feedback
                      </Button>
                    )}
                    {session.type === 'video' && (
                      <Button variant="outline">
                        View Notes
                      </Button>
                    )}
                    {session.type === 'quiz' && (
                      <Button variant="outline">
                        Review Quiz
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>

      {/* Pagination */}
      {filteredAndSortedSessions.length > itemsPerPage && (
        <div className="flex justify-center mt-4">
          <nav role="navigation" aria-label="Pagination Navigation">
            <ul className="flex items-center space-x-2">
              <li>
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => paginate(currentPage - 1)}
                >
                  Previous
                </Button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                <li key={pageNumber}>
                  <Button
                    variant={currentPage === pageNumber ? 'primary' : 'outline'}
                    onClick={() => paginate(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                </li>
              ))}
              <li>
                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => paginate(currentPage + 1)}
                >
                  Next
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      <VideoPreviewModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        sessionData={{ mentorName: selectedSession?.mentorName, dateTime: selectedSession?.dateTime }}
      />
      <QuizModal
        isOpen={quizModalOpen}
        onClose={() => setQuizModalOpen(false)}
        quizData={selectedSession?.quizDetails}
      />

    </div>
  );
}