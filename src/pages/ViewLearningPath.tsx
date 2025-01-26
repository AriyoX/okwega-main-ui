import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  BookOpen, Video, FileText, CheckCircle, Clock, 
  MessageSquare, ChevronRight, Users, Edit
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Button from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { VideoPreviewModal } from '@/components/VideoPreviewModal';
import { QuizModal } from '@/components/QuizModal';

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

export default function ViewLearningPath() {
  const { menteeId } = useParams();
  const navigate = useNavigate();
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  // Mock data with complete structure
  const learningPath = {
      id: 'lp-1',
      title: 'Frontend Development Path',
      description: 'Complete guide to modern frontend development',
      progress: 70,
      totalHours: 40,
      completedHours: 28,
      mentee: {
        id: menteeId,
        name: 'John Doe',
        avatar: '/api/placeholder/32/32',
        email: 'john@example.com'
      },
      modules: [
        {
          id: 'mod-1',
          title: 'React Fundamentals',
          completed: true,
          resources: [
            { id: 'res-1', title: 'React Basics Guide', type: 'document' },
            { id: 'res-2', title: 'Component Architecture', type: 'video' }
          ],
          sessions: [
            {
              id: 'session-1',
              learningPathId: 'lp-1',
              learningPathTitle: 'Frontend Development Path',
              sessionNumber: 1,
              mentorId: 1,
              mentorName: 'Sarah Wilson',
              mentorRole: 'Senior Software Engineer',
              mentorCompany: 'Google',
              type: 'video' as const,
              status: 'completed' as const,
              dateTime: '2024-01-10T15:00',
              duration: 60,
              topics: ['React Basics', 'Components'],
              rating: 5,
              feedback: 'Great session! The mentee showed good understanding of React basics.'
            }
          ]
        }
      ]
    };

  const handleEdit = () => {
    const formReadyData = {
      ...learningPath,
      modules: learningPath.modules.map(module => ({
        ...module,
        resources: module.resources.map(resource => ({
          ...resource,
          url: '' // Add empty URL field for form compatibility
        })),
        sessions: module.sessions.map(session => ({
          ...session,
          title: `Session ${session.sessionNumber}`, // Add title field for form
          description: session.feedback || '' // Map feedback to description
        }))
      }))
    };
    
    navigate(`/mentees/${menteeId}/learning-path/edit`, {
      state: { initialData: formReadyData }
    });
  };

  const renderSessionCard = (session: Session) => (
    <Card key={session.id} className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {session.type === 'video' ? (
                <Video className="h-4 w-4 text-blue-500" />
              ) : ( <MessageSquare className="h-4 w-4 text-green-500" />
              )}
              <span className="font-medium">Session {session.sessionNumber}</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {new Date(session.dateTime).toLocaleString()}
                </span>
                <span className="text-sm text-gray-600">·</span>
                <span className="text-sm text-gray-600">{session.duration} mins</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {session.topics.map((topic, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {topic}
                  </span>
                ))}
              </div>
              {session.feedback && (
                <p className="text-sm text-gray-600 mt-2">{session.feedback}</p>
              )}
              {session.rating && (
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`h-4 w-4 ${
                        i < session.rating! ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {session.status === 'scheduled' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedSession(session);
                  if (session.type === 'video') {
                    setVideoModalOpen(true);
                  } else {
                    setQuizModalOpen(true);
                  }
                }}
              >
                {session.type === 'video' ? 'Join Session' : 'View Quiz'}
              </Button>
            )}
            {session.status === 'completed' && (
              <div className="flex items-center gap-1 text-green-500">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Completed</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {learningPath.title}
            </h1>
            <p className="text-gray-500 mt-1">{learningPath.description}</p>
          </div>
          <Button variant="outline" onClick={handleEdit}>
            <Edit className="h-4 w-4 mr-2" />
              Edit Learning Path
          </Button>
        </div>
      </div>

      {/* Mentee Info Card */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={learningPath.mentee.avatar} />
              <AvatarFallback>
                {learningPath.mentee.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{learningPath.mentee.name}</h3>
              <p className="text-sm text-gray-500">{learningPath.mentee.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Overview */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Progress Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Overall Progress</span>
                <span>{learningPath.progress}%</span>
              </div>
              <Progress value={learningPath.progress} className="h-2" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600">Hours Completed</p>
                  <p className="font-medium">
                    {learningPath.completedHours}/{learningPath.totalHours}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-green-500" />
                <div>
                  <p className="text-sm text-gray-600">Sessions</p>
                  <p className="font-medium">
                    {learningPath.modules.reduce(
                      (acc, module) => acc + module.sessions.length,
                      0
                    )} Total
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modules */}
      {learningPath.modules.map(module => (
        <Card key={module.id} className="mb-6">
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
              {/* Sessions */}
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  Sessions
                </h4>
                <div className="space-y-3">
                  {module.sessions.map(session => renderSessionCard(session))}
                </div>
              </div>

              {/* Resources */}
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Resources
                </h4>
                <div className="space-y-3">
                  {module.resources.map(resource => (
                    <div
                      key={resource.id}
                      className="flex items-center justify-between p-3 rounded-lg border"
                    >
                      <div className="flex items-center gap-2">
                        {resource.type === 'video' ? (
                          <Video className="w-4 h-4 text-blue-500" />
                        ) : (
                          <FileText className="w-4 h-4 text-green-500" />
                        )}
                        <p className="font-medium">{resource.title}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
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
    </div>
  );
}