import { useState } from 'react';
import { Search, Star, MessageSquare, Video } from 'lucide-react';
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
import { QuizReviewModal } from '@/components/QuizReviewModal';
import { NotesModal } from '@/components/NotesModal';

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
  { id: '2', mentorId: 2, mentorName: 'David Kumar', mentorRole: 'Principal Engineer', mentorCompany: 'Amazon', type: 'video', status: 'completed', dateTime: '2025-01-10T15:00:00', duration: 30, topics: ['System Design', 'AWS'], rating: 5, feedback: 'Excellent session! David helped me understand microservices architecture.', notes: 'Discussed the trade-offs of different architectural patterns.' },
  { id: '3', mentorId: 3, mentorName: 'Emily Chen', mentorRole: 'Data Scientist', mentorCompany: 'Netflix', type: 'quiz', status: 'scheduled', dateTime: '2025-01-18T14:00:00', duration: 45, topics: ['Machine Learning', 'Python'], quizDetails: { quizId: 'quiz-101', title: 'Introduction to Machine Learning', totalQuestions: 20, duration: 30 } },
  { id: '4', mentorId: 1, mentorName: 'Sarah Wilson', mentorRole: 'Senior Software Engineer', mentorCompany: 'Google', type: 'quiz', status: 'completed', dateTime: '2025-01-05T11:30:00', duration: 60, topics: ['JavaScript', 'ES6 Features'], quizDetails: { quizId: 'quiz-102', title: 'Advanced JavaScript Concepts', score: 18, totalQuestions: 20, duration: 45 }, rating: 4, feedback: 'The quiz was challenging and helped me identify areas for improvement.' },
  { id: '5', mentorId: 4, mentorName: 'John Doe', mentorRole: 'Product Manager', mentorCompany: 'Microsoft', type: 'video', status: 'scheduled', dateTime: '2025-01-22T09:00:00', duration: 45, topics: ['Product Strategy', 'Market Analysis'] },
  { id: '6', mentorId: 2, mentorName: 'David Kumar', mentorRole: 'Principal Engineer', mentorCompany: 'Amazon', type: 'quiz', status: 'scheduled', dateTime: '2025-01-25T16:00:00', duration: 30, topics: ['Cloud Computing', 'Serverless'], quizDetails: { quizId: 'quiz-103', title: 'Serverless Architecture Fundamentals', totalQuestions: 15, duration: 20 } },
  { id: '7', mentorId: 5, mentorName: 'Alice Brown', mentorRole: 'UX Designer', mentorCompany: 'Airbnb', type: 'video', status: 'completed', dateTime: '2024-12-20T13:00:00', duration: 50, topics: ['User Research', 'Interaction Design'], rating: 5, feedback: 'Alice provided great insights into user-centered design processes.', notes: 'Discussed the importance of user interviews and usability testing.' },
  { id: '8', mentorId: 3, mentorName: 'Emily Chen', mentorRole: 'Data Scientist', mentorCompany: 'Netflix', type: 'quiz', status: 'completed', dateTime: '2024-12-15T17:00:00', duration: 55, topics: ['Data Analysis', 'SQL'], quizDetails: { quizId: 'quiz-104', title: 'Data Analysis with SQL', score: 16, totalQuestions: 20, duration: 40 }, rating: 4, feedback: 'Good quiz to test my SQL knowledge.' },
  { id: '9', mentorId: 4, mentorName: 'John Doe', mentorRole: 'Product Manager', mentorCompany: 'Microsoft', type: 'video', status: 'cancelled', dateTime: '2025-01-10T14:30:00', duration: 30, topics: ['Agile Methodology', 'Sprint Planning'] },
  { id: '10', mentorId: 5, mentorName: 'Alice Brown', mentorRole: 'UX Designer', mentorCompany: 'Airbnb', type: 'quiz', status: 'scheduled', dateTime: '2025-01-28T10:30:00', duration: 40, topics: ['Prototyping', 'Figma'], quizDetails: { quizId: 'quiz-105', title: 'Interactive Prototyping in Figma', totalQuestions: 18, duration: 25 } },
  { id: '11', mentorId: 1, mentorName: 'Sarah Wilson', mentorRole: 'Senior Software Engineer', mentorCompany: 'Google', type: 'video', status: 'scheduled', dateTime: '2025-02-01T11:00:00', duration: 75, topics: ['TypeScript', 'Node.js'] },
  { id: '12', mentorId: 2, mentorName: 'David Kumar', mentorRole: 'Principal Engineer', mentorCompany: 'Amazon', type: 'quiz', status: 'completed', dateTime: '2025-01-12T14:00:00', duration: 40, topics: ['Databases', 'NoSQL'], quizDetails: { quizId: 'quiz-106', title: 'Introduction to NoSQL Databases', score: 15, totalQuestions: 18, duration: 35 }, rating: 5, feedback: 'Very helpful quiz on NoSQL concepts.' },
  { id: '13', mentorId: 3, mentorName: 'Emily Chen', mentorRole: 'Data Scientist', mentorCompany: 'Netflix', type: 'video', status: 'completed', dateTime: '2025-01-08T10:00:00', duration: 60, topics: ['Statistical Analysis', 'R Programming'], rating: 4, feedback: 'Good session covering the basics of statistical analysis.', notes: 'Covered topics like hypothesis testing and regression analysis.' },
  { id: '14', mentorId: 4, mentorName: 'John Doe', mentorRole: 'Product Manager', mentorCompany: 'Microsoft', type: 'quiz', status: 'scheduled', dateTime: '2025-02-05T16:30:00', duration: 35, topics: ['User Stories', 'Product Backlog'], quizDetails: { quizId: 'quiz-107', title: 'Writing Effective User Stories', totalQuestions: 16, duration: 28 } },
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
  const itemsPerPage = 5;
  const [isQuizReviewModalOpen, setIsQuizReviewModalOpen] = useState(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<Session['quizDetails'] | null>(null);
  const [selectedNotes, setSelectedNotes] = useState<string | undefined>(undefined);

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
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-gray-900">My Sessions</h1>
        <p className="mt-1 text-sm text-gray-500">
          Track your mentoring sessions, review past meetings, and prepare for upcoming ones.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search sessions..."
            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filterType} onValueChange={(value) => setFilterType(value as 'all' | 'video' | 'quiz')}>
          <SelectTrigger className="w-full sm:w-[auto] text-sm">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="video">Video</SelectItem>
            <SelectItem value="quiz">Quiz</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-[auto] text-sm">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="duration">Duration</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabs and Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming" className="text-sm font-medium focus-visible:ring-2 focus-visible:ring-blue-500">
            Upcoming Sessions
          </TabsTrigger>
          <TabsTrigger value="past" className="text-sm font-medium focus-visible:ring-2 focus-visible:ring-blue-500">
            Past Sessions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {currentSessions.length === 0 && filteredAndSortedSessions.length > 0 ? (
            <div className="text-center py-6 text-gray-500 text-sm">
              Loading sessions...
            </div>
          ) : currentSessions.length === 0 && filteredAndSortedSessions.length === 0 ? (
            <div className="text-center py-6 text-gray-500 text-sm">
              No upcoming sessions found.
            </div>
          ) : (
            currentSessions.map(session => (
              <Card key={session.id} className="border">
                <div className="flex items-center justify-between p-4">
                  <div>
                    <h3 className="text-base font-semibold text-gray-800">{session.mentorName}</h3>
                    <p className="text-gray-500 text-sm">{session.mentorRole} at {session.mentorCompany}</p>
                    <div className="flex items-center gap-2 text-xs mt-1">
                      {session.type === 'video' ? (
                        <Video className="h-3 w-3 text-blue-500" />
                      ) : (
                        <MessageSquare className="h-3 w-3 text-green-500" />
                      )}
                      <span>{new Date(session.dateTime).toLocaleString()}</span>
                      <span>·</span>
                      <span>{session.duration} mins</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {session.topics.map((topic, index) => (
                        <span key={index} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {topic}
                        </span>
                      ))}
                    </div>
                    {session.type === 'quiz' && session.quizDetails && (
                      <p className="text-gray-600 text-xs mt-1">
                        Quiz: {session.quizDetails.title} ({session.quizDetails.totalQuestions} questions)
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {session.status === 'scheduled' && (
                      <>
                        {session.type === 'video' && (
                          <Button variant="outline" size="sm"
                            onClick={() => {
                              setSelectedSession(session);
                              setVideoModalOpen(true);
                            }}>
                            Join
                          </Button>
                        )}
                        {session.type === 'quiz' && session.quizDetails && (
                          <Button variant="outline" size="sm"
                            onClick={() => {
                              setSelectedSession(session);
                              setQuizModalOpen(true);
                            }}>
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

        <TabsContent value="past" className="space-y-4">
          {currentSessions.length === 0 && filteredAndSortedSessions.length > 0 ? (
            <div className="text-center py-6 text-gray-500 text-sm">
              Loading sessions...
            </div>
          ) : currentSessions.length === 0 && filteredAndSortedSessions.length === 0 ? (
            <div className="text-center py-6 text-gray-500 text-sm">
              No past sessions found.
            </div>
          ) : (
            currentSessions.map(session => (
              <Card key={session.id} className="border">
                <div className="flex items-center justify-between p-4">
                  <div>
                    <h3 className="text-base font-semibold text-gray-800">{session.mentorName}</h3>
                    <p className="text-gray-500 text-sm">{session.mentorRole} at {session.mentorCompany}</p>
                    <div className="flex items-center gap-2 text-xs mt-1">
                      {session.type === 'video' ? (
                        <Video className="h-3 w-3 text-blue-500" />
                      ) : (
                        <MessageSquare className="h-3 w-3 text-green-500" />
                      )}
                      <span>{new Date(session.dateTime).toLocaleString()}</span>
                      <span>·</span>
                      <span>{session.duration} mins</span>
                    </div>
                    {session.rating && (
                      <div className="flex items-center gap-1 text-yellow-500 text-xs mt-1">
                        <Star className="h-3 w-3 fill-current" />
                        <span>{session.rating}</span>
                      </div>
                    )}
                    {session.feedback && (
                      <p className="text-gray-600 text-xs mt-1 line-clamp-1">{session.feedback}</p>
                    )}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {session.topics.map((topic, index) => (
                        <span key={index} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {topic}
                        </span>
                      ))}
                    </div>
                    {session.type === 'quiz' && session.quizDetails && (
                      <p className="text-gray-600 text-xs mt-1">
                        Quiz: {session.quizDetails.title}
                        {session.quizDetails.score !== undefined && (
                          <span> (Score: {session.quizDetails.score}/{session.quizDetails.totalQuestions})</span>
                        )}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {!session.rating && session.type === 'video' && (
                      <Button variant="outline" size="sm">
                        Feedback
                      </Button>
                    )}
                    {session.type === 'video' && (
                      <Button variant="outline" size="sm" onClick={() => {
                        setSelectedNotes(session.notes);
                        setIsNotesModalOpen(true);
                      }}>
                        Notes
                      </Button>
                    )}
                    {session.type === 'quiz' && session.quizDetails && (
                      <Button variant="outline" size="sm" onClick={() => {
                        setSelectedQuiz(session.quizDetails);
                        setIsQuizReviewModalOpen(true);
                      }}>
                        Review
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
        <div className="flex justify-center mt-6">
          <nav role="navigation" aria-label="Pagination Navigation">
            <ul className="flex items-center space-x-2">
              <li>
                <Button
                  variant="outline"
                  size="sm"
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
                    size="sm"
                    onClick={() => paginate(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                </li>
              ))}
              <li>
                <Button
                  variant="outline"
                  size="sm"
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
      <QuizReviewModal
        isOpen={isQuizReviewModalOpen}
        onClose={() => setIsQuizReviewModalOpen(false)}
        quizData={selectedQuiz || undefined}
      />
      <NotesModal
        isOpen={isNotesModalOpen}
        onClose={() => setIsNotesModalOpen(false)}
        notes={selectedNotes}
      />
    </div>
  );
}