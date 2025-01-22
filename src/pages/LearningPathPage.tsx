import { useState } from 'react';
import { BookOpen, CheckCircle, Clock, Trophy, FileText, Video, ExternalLink, MessageSquare, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { VideoPreviewModal } from '@/components/VideoPreviewModal';
import { QuizModal } from '@/components/QuizModal';
import { QuizReviewModal } from '@/components/QuizReviewModal';
import { NotesModal } from '@/components/NotesModal';
import Button from '@/components/ui/button';

// Shared interfaces with sessions page
interface Session {
  id: string;
    learningPathId: string;
    learningPathTitle: string;
    sessionNumber: number;
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
    duration?: number;
  };
}

  
  interface Module {
    id: number;
    title: string;
    completed: boolean;
    resources: {
      id: number;
      title: string;
      type: 'document' | 'video';
      url?: string;
    }[];
    sessions: Session[];
  }
  
  interface LearningPath {
    id: string;
    title: string;
    description: string;
    progress: number;
    totalHours: number;
    completedHours: number;
      mentorId: number;
      mentorName: string;
    nextSession?: string;
    mentor: {
      id: number;
      name: string;
      avatar: string;
      role: string;
      feedback?: string;
    };
    modules: Module[];
    totalSessions: number;
    completedSessions: number;
  }

const mockPaths: LearningPath[] = [
  {
    id: 'path-1',
    title: 'Frontend Development Path',
      description: 'Complete guide to modern frontend development',
    progress: 70,
    totalHours: 40,
    completedHours: 28,
      mentorId: 1,
      mentorName: 'Sarah Wilson',
    nextSession: '2024-01-15T10:00',
    mentor: {
      id: 1,
      name: 'Sarah Wilson',
      avatar: '/api/placeholder/32/32',
      role: 'Senior Software Engineer at Google',
      feedback: 'Good progress on React fundamentals. Focus on state management patterns next.'
    },
      totalSessions: 5,
      completedSessions: 3,
    modules: [
      {
        id: 1,
        title: 'React Fundamentals',
        completed: true,
        resources: [
          { id: 1, title: 'React Basics Guide', type: 'document' },
          { id: 2, title: 'Component Architecture', type: 'video' }
        ],
        sessions: [
            {
                id: 'session-1',
                learningPathId: 'path-1',
                learningPathTitle: 'Frontend Development Path',
                sessionNumber: 1,
                mentorId: 1,
                mentorName: 'Sarah Wilson',
                mentorRole: 'Senior Software Engineer',
                mentorCompany: 'Google',
                type: 'video',
                status: 'completed',
                dateTime: '2024-01-10T15:00',
                duration: 60,
                topics: ['React Basics', 'Components'],
                rating: 5
            },
            {
                id: 'session-2',
                learningPathId: 'path-1',
                learningPathTitle: 'Frontend Development Path',
                sessionNumber: 2,
                mentorId: 1,
                mentorName: 'Sarah Wilson',
                mentorRole: 'Senior Software Engineer',
                mentorCompany: 'Google',
                type: 'quiz',
                status: 'scheduled',
                dateTime: '2024-01-15T10:00',
                duration: 45,
                topics: ['Lifecycle Methods', 'Hooks'],
                quizDetails: {
                  quizId: 'quiz-1',
                  title: 'React Lifecycle Quiz',
                  totalQuestions: 10,
                  duration: 30
                }
            }
        ]
      },
       {
        id: 2,
        title: 'State Management',
        completed: true,
        resources: [
          { id: 3, title: 'Redux vs Context', type: 'document' },
          { id: 4, title: 'State Management Demo', type: 'video' }
        ],
        sessions: [
          {
            id: 'session-3',
            learningPathId: 'path-1',
                learningPathTitle: 'Frontend Development Path',
                sessionNumber: 3,
                mentorId: 1,
                mentorName: 'Sarah Wilson',
                mentorRole: 'Senior Software Engineer',
                mentorCompany: 'Google',
            type: 'video',
            status: 'scheduled',
            dateTime: '2024-01-18T14:00',
            duration: 50,
            topics: ['Redux', 'Context API']
            
          }
        ]
      },
    ]
  },
   {
    id: 'path-2',
    title: 'Backend Development Path',
        description: 'Learn the core concepts of backend systems',
    progress: 35,
    totalHours: 50,
    completedHours: 17.5,
      mentorId: 2,
      mentorName: 'David Kumar',
    nextSession: '2024-01-18T14:00',
    mentor: {
      id: 2,
      name: 'David Kumar',
      avatar: '/api/placeholder/32/32',
      role: 'Principal Engineer at Amazon',
      feedback: 'Need to improve API design patterns. Database optimization is going well.'
    },
      totalSessions: 5,
      completedSessions: 2,
    modules: [
        {
            id: 3,
            title: 'API Design',
            completed: false,
            resources: [
              { id: 5, title: 'RESTful API Guide', type: 'document' },
              { id: 6, title: 'GraphQL Introduction', type: 'video' }
            ],
            sessions: [
              {
                id: 'session-4',
                learningPathId: 'path-2',
                  learningPathTitle: 'Backend Development Path',
                  sessionNumber: 1,
                  mentorId: 2,
                mentorName: 'David Kumar',
                mentorRole: 'Principal Engineer',
                mentorCompany: 'Amazon',
                type: 'video',
                status: 'scheduled',
                dateTime: '2024-01-20T10:00',
                duration: 60,
                topics: ['API Design', 'HTTP Methods']
              }
            ]
          }
    ]
  }
];

export default function LearningPathPage() {
  const [activePath, setActivePath] = useState(mockPaths[0]);
    const [videoModalOpen, setVideoModalOpen] = useState(false);
    const [quizModalOpen, setQuizModalOpen] = useState(false);
    const [selectedSession, setSelectedSession] = useState<Session | null>(null);
    const [isQuizReviewModalOpen, setIsQuizReviewModalOpen] = useState(false);
    const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState<Session['quizDetails'] | null>(null);
    const [selectedNotes, setSelectedNotes] = useState<string | undefined>(undefined);

  const handlePathChange = (pathId: string) => {
    const newPath = mockPaths.find(p => p.id === pathId);
    if (newPath) {
      setActivePath(newPath);
    }
  };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleSessionAction = (session: Session) => {
        setSelectedSession(session);
        if (session.type === 'video') {
            setVideoModalOpen(true);
        } else if (session.type === 'quiz') {
            setQuizModalOpen(true);
        }
    };

    const renderSessionCard = (session: Session) => (
        <Card key={session.id} className="border">
        <div className="p-4">
            {/* Learning Path Header */}
            <div className="flex items-center gap-2 mb-3 text-sm text-blue-600">
            <BookOpen className="h-4 w-4" />
            <span>{session.learningPathTitle}</span>
            <ChevronRight className="h-4 w-4" />
            <span>Session {session.sessionNumber}</span>
            </div>

            {/* Existing session card content */}
            <div className="flex items-center justify-between">
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
                    Quiz: {session.quizDetails.title}
                    {session.quizDetails.score !== undefined && (
                        <span> (Score: {session.quizDetails.score}/{session.quizDetails.totalQuestions})</span>
                    )}
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
                {session.status === 'completed' && (
                    <>
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
                    </>
                )}
            </div>
            </div>
        </div>
        </Card>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header and Path Selection - Same as before */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Learning Paths</h1>
            <p className="text-gray-500 mt-1 text-sm">Track your progress and upcoming milestones in your learning journey</p>
          </div>
          <Select onValueChange={handlePathChange} defaultValue={activePath.id}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a learning path" />
            </SelectTrigger>
            <SelectContent>
              {mockPaths.map(path => (
                <SelectItem key={path.id} value={path.id}>
                  {path.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Progress Overview - Same as before */}
       <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Progress Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Overall Progress</span>
                  <span>{activePath.progress}%</span>
                </div>
                <Progress value={activePath.progress} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-600">Hours Completed</p>
                    <p className="font-medium">{activePath.completedHours}/{activePath.totalHours}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <div>
                    <p className="text-sm text-gray-600">Achievements</p>
                    <p className="font-medium">3 Earned</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mentor Feedback Card */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Mentor Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src={activePath.mentor.avatar} alt={activePath.mentor.name} />
                <AvatarFallback>{activePath.mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-medium">{activePath.mentor.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{activePath.mentor.role}</p>
                <p className="text-sm">{activePath.mentor.feedback}</p>
              </div>
            </div>
          </CardContent>
        </Card>


      {/* Updated Module Cards with new Session handling */}
      {activePath.modules.map((module) => (
        <Card key={module.id} className="col-span-1 lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                {module.completed ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <BookOpen className="w-5 h-5 text-blue-500" />
                )}
                {module.title}
              </CardTitle>
              <span className="text-sm text-gray-600">
                {module.completed ? 'Completed' : 'In Progress'}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Updated Sessions Section */}
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  Sessions
                </h4>
                <div className="space-y-3">
                  {module.sessions.map(session => renderSessionCard(session))}
                </div>
              </div>

              {/* Resources Section remains the same */}
             <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Resources
                </h4>
                <div className="space-y-3">
                    {module.resources.map(resource => (
                    <div key={resource.id} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-2">
                        {resource.type === 'video' ? (
                            <Video className="w-4 h-4 text-blue-500" />
                        ) : (
                            <FileText className="w-4 h-4 text-green-500" />
                        )}
                        <p className="font-medium">{resource.title}</p>
                        </div>
                        <button className="text-blue-500 hover:text-blue-600">
                            <ExternalLink className="w-4 h-4" />
                        </button>
                    </div>
                    ))}
                </div>
                </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Modals */}
      <VideoPreviewModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        sessionData={selectedSession ? {
          mentorName: selectedSession.mentorName,
          dateTime: selectedSession.dateTime
        } : {}}
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