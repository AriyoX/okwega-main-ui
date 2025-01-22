import { useState } from 'react';
import { CalendarIcon, ChevronLeft, ChevronRight, Video, MessageSquare, Info } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Button from '@/components/ui/button';
import Card from '@/components/ui/card-1';
import { VideoPreviewModal } from '@/components/VideoPreviewModal';
import { QuizModal } from '@/components/QuizModal';
import { QuizReviewModal } from '@/components/QuizReviewModal';
import { NotesModal } from '@/components/NotesModal';

export function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [sessionTypeFilter, setSessionTypeFilter] = useState('all');
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [isQuizReviewModalOpen, setIsQuizReviewModalOpen] = useState(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<Session['quizDetails'] | null>(null);
  const [selectedNotes, setSelectedNotes] = useState<string | undefined>(undefined);

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

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getSessionsForDate = (year: number, month: number, day: number) => {
    const dateString = formatDate(year, month, day);
    return mockSessions.filter(session => {
      const sessionDate = session.dateTime.split('T')[0];
      const matchesDate = sessionDate === dateString;
      const matchesType = sessionTypeFilter === 'all' || session.type === sessionTypeFilter;
      return matchesDate && matchesType;
    });
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const SessionBadge = ({ type }: { type: Session['type'] }) => (
    <div className={`w-2 h-2 rounded-full ${type === 'video' ? 'bg-blue-500' : 'bg-green-500'}`} />
  );

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const today = new Date();

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2" />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateString = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day);
      const sessions = getSessionsForDate(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isToday = date.toDateString() === today.toDateString();
      const isSelected = selectedDate === dateString;

      days.push(
        <Popover key={day}>
          <PopoverTrigger asChild>
            <div
              className={`
                relative p-2 min-h-[80px] border border-gray-200 rounded-md cursor-pointer
                hover:bg-gray-100 transition-colors
                ${isToday ? 'bg-blue-50' : ''}
                ${isSelected ? 'border-blue-500' : ''}
              `}
              onClick={() => setSelectedDate(dateString)}
            >
              <span className={`
                text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-800'}
              `}>
                {day}
              </span>

              {sessions.length > 0 && (
                <div className="absolute bottom-1 left-1 flex gap-1">
                  {sessions.map((session, index) => (
                    <SessionBadge key={index} type={session.type} />
                  ))}
                </div>
              )}
            </div>
          </PopoverTrigger>

          {sessions.length > 0 && (
            <PopoverContent className="w-80 p-2">
              <div className="space-y-2">
                {sessions.map((session) => (
                  <div key={session.id} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md">
                    {session.type === 'video' ? (
                      <Video className="h-4 w-4 text-blue-500" />
                    ) : (
                      <MessageSquare className="h-4 w-4 text-green-500" />
                    )}
                    <div>
                      <p className="font-medium text-sm">{session.topics[0]}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(session.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · {session.duration} mins
                      </p>
                      <p className="text-xs text-gray-500">
                        with {session.mentorName}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </PopoverContent>
          )}
        </Popover>
      );
    }

    return days;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Calendar</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage your upcoming mentoring sessions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Select value={sessionTypeFilter} onValueChange={setSessionTypeFilter}>
            <SelectTrigger className="w-[180px] text-sm">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sessions</SelectItem>
              <SelectItem value="video">Video Sessions</SelectItem>
              <SelectItem value="quiz">Quizzes</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <Info className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 p-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-sm text-gray-700">Video Sessions</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-sm text-gray-700">Quizzes</span>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handlePrevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-base font-semibold text-gray-800">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <Button variant="outline" size="icon" onClick={handleNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <Button
          variant="outline"
          className="text-sm flex items-center gap-2"
          onClick={() => setCurrentDate(new Date())}
        >
          <CalendarIcon className="h-4 w-4" />
          Today
        </Button>
      </div>

      {/* Calendar Grid */}
      <Card className="p-3 shadow-sm">
        {/* Week day headers */}
        <div className="grid grid-cols-7 gap-px mb-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="p-1 text-center text-xs font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-px bg-white rounded-md">
          {renderCalendarDays()}
        </div>
      </Card>

      {/* Selected Date Details */}
      {selectedDate && (
        <Card className="p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            Sessions on {new Date(selectedDate).toLocaleDateString()}
          </h3>
          <div className="space-y-3">
            {getSessionsForDate(
              new Date(selectedDate).getFullYear(),
              new Date(selectedDate).getMonth(),
              new Date(selectedDate).getDate()
            ).map((session) => (
              <div key={session.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-md">
                <div className="flex items-center gap-3">
                  {session.type === 'video' ? (
                    <Video className="h-4 w-4 text-blue-500" />
                  ) : (
                    <MessageSquare className="h-4 w-4 text-green-500" />
                  )}
                  <div>
                    <h4 className="font-medium text-sm text-gray-800">{session.topics[0]}</h4>
                    <p className="text-gray-500 text-xs">
                      {new Date(session.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · {session.duration} mins · with {session.mentorName}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {session.status === 'scheduled' && (
                    <Button size="sm"
                      onClick={() => {
                        setSelectedSession(session);
                        if (session.type === 'video') {
                          setVideoModalOpen(true);
                        } else if (session.type === 'quiz') {
                          setQuizModalOpen(true);
                        }
                      }}
                    >
                      {session.type === 'video' ? 'Join' : 'Start'}
                    </Button>
                  )}
                  {session.status === 'completed' && session.type === 'video' && (
                    <Button size="sm" variant="outline" onClick={() => {
                      setSelectedNotes(session.notes);
                      setIsNotesModalOpen(true);
                    }}>
                      Notes
                    </Button>
                  )}
                  {session.status === 'completed' && session.type === 'quiz' && session.quizDetails && (
                    <Button size="sm" variant="outline" onClick={() => {
                      setSelectedQuiz(session.quizDetails);
                      setIsQuizReviewModalOpen(true);
                    }}>
                      Review
                    </Button>
                  )}
                </div>
              </div>
            ))}
            {getSessionsForDate(
              new Date(selectedDate).getFullYear(),
              new Date(selectedDate).getMonth(),
              new Date(selectedDate).getDate()
            ).length === 0 && (
              <p className="text-sm text-gray-500">No sessions on this day.</p>
            )}
          </div>
        </Card>
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