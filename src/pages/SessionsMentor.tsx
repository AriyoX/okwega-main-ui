import { useState } from 'react';
import { Search, User, Video, BookOpen, ChevronRight } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Button from '@/components/ui/button';
import Card from '@/components/ui/card-1';
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
  learningPathId: string;
  learningPathTitle: string;
  sessionNumber: number;
  mentorId: number;
  menteeId: number;
  menteeName: string;
  menteeRole: string;
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
    duration?: number;
  };
}

const currentMentorId = 1; // Assuming logged-in mentor ID

const mockSessions: Session[] = [
  {
    id: '1',
    learningPathId: 'path-1',
    learningPathTitle: 'Frontend Development Masterclass',
    sessionNumber: 1,
    mentorId: 1,
    menteeId: 101,
    menteeName: 'John Carter',
    menteeRole: 'Mentee',
    type: 'video',
    status: 'scheduled',
    dateTime: '2025-01-15T10:00:00',
    duration: 60,
    topics: ['React', 'Frontend Architecture']
  },
  {
    id: '2',
    learningPathId: 'path-2',
    learningPathTitle: 'Backend Development Essentials',
    sessionNumber: 1,
    mentorId: 1,
    menteeId: 102,
    menteeName: 'Sarah Johnson',
    menteeRole: 'Mentee',
    type: 'video',
    status: 'completed',
    dateTime: '2025-01-10T15:00:00',
    duration: 30,
    topics: ['System Design', 'AWS'],
    rating: 5,
    feedback: 'Excellent session! Learned a lot about microservices architecture.',
    notes: 'Discussed the trade-offs of different architectural patterns.'
  },
  // Add more sessions as needed...
];

export function MentorSessionsPage() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'video' | 'quiz'>('all');
  const [filterMentee, setFilterMentee] = useState<string>('all');
  const [sortBy, setSortBy] = useState('date');
  const [currentPage, setCurrentPage] = useState(1);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [isQuizReviewModalOpen, setIsQuizReviewModalOpen] = useState(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<Session['quizDetails'] | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedNotes, setSelectedNotes] = useState<string | undefined>(undefined);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sessions, setSessions] = useState<Session[]>(mockSessions);
  const itemsPerPage = 5;

  const filterSessions = (sessions: Session[]) => {
    return sessions.filter(session => {
      const matchesMentor = session.mentorId === currentMentorId;
      const matchesSearch =
        session.menteeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase())) ||
        session.learningPathTitle.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === 'all' || session.type === filterType;
      const matchesMentee = filterMentee === 'all' || session.menteeId.toString() === filterMentee;
      const matchesTab =
        (activeTab === 'upcoming' && session.status === 'scheduled') ||
        (activeTab === 'past' && session.status === 'completed');

      return matchesMentor && matchesSearch && matchesType && matchesMentee && matchesTab;
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

  const filteredAndSortedSessions = sortSessions(filterSessions(sessions));
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSessions = filteredAndSortedSessions.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredAndSortedSessions.length / itemsPerPage);

  const uniqueMentees = Array.from(new Set(sessions.map(s => s.menteeId)))
    .map(id => {
      const session = sessions.find(s => s.menteeId === id);
      return { id: session?.menteeId, name: session?.menteeName };
    });

  const renderSessionCard = (session: Session) => (
    <Card key={session.id} className="border">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3 text-sm text-blue-600">
          <BookOpen className="h-4 w-4" />
          <span>{session.learningPathTitle}</span>
          <ChevronRight className="h-4 w-4" />
          <span>Session {session.sessionNumber}</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-gray-800">{session.menteeName}</h3>
            <p className="text-gray-500 text-sm">{session.menteeRole}</p>
            <div className="flex items-center gap-2 text-xs mt-1">
              {session.type === 'video' ? (
                <Video className="h-3 w-3 text-blue-500" />
              ) : (
                <User className="h-3 w-3 text-green-500" />
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
            {session.status === 'completed' && session.rating && (
              <div className="mt-2 text-sm">
                <span className="text-yellow-500">★ {session.rating}/5</span>
                {session.feedback && (
                  <p className="text-gray-600 mt-1">{session.feedback}</p>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            {session.status === 'scheduled' && (
              <>
                {session.type === 'video' ? (
                  <Button variant="outline" size="sm" onClick={() => {
                    setSelectedSession(session);
                    setVideoModalOpen(true);
                  }}>
                    Start Session
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => {
                    setSelectedSession(session);
                    setQuizModalOpen(true);
                  }}>
                    Prepare Quiz
                  </Button>
                )}
              </>
            )}
            {session.status === 'completed' && (
              <>
                {session.type === 'video' && (
                  <Button variant="outline" size="sm" onClick={() => {
                    setSelectedSession(session);
                    setIsNotesModalOpen(true);
                  }}>
                    {session.notes ? 'View/Edit Notes' : 'Add Notes'}
                  </Button>
                )}
                {session.type === 'quiz' && (
                  <Button variant="outline" size="sm" onClick={() => {
                    setSelectedQuiz(session.quizDetails);
                    setIsQuizReviewModalOpen(true);
                  }}>
                    Review Results
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 space-y-8">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-gray-900">My Mentoring Sessions</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your scheduled mentoring sessions and view past session details.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
        <Select value={filterMentee} onValueChange={setFilterMentee}>
          <SelectTrigger className="w-full sm:w-[auto] text-sm">
            <SelectValue placeholder="Filter by mentee" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Mentees</SelectItem>
            {uniqueMentees.map(mentee => (
              <SelectItem key={mentee.id} value={mentee.id?.toString() || ''}>
                {mentee.name}
              </SelectItem>
            ))}
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

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
          <TabsTrigger value="past">Past Sessions</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {currentSessions.map(renderSessionCard)}
          {currentSessions.length === 0 && (
            <div className="text-center py-6 text-gray-500 text-sm">
              No upcoming sessions found.
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {currentSessions.map(renderSessionCard)}
          {currentSessions.length === 0 && (
            <div className="text-center py-6 text-gray-500 text-sm">
              No past sessions found.
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Pagination and Modals remain similar to original */}
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
        sessionData={{ mentorName: selectedSession?.menteeName, dateTime: selectedSession?.dateTime }}
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