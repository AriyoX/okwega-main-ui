import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  Clock, 
  MessageCircle,
  Video,
  FileQuestion,
  Check,
  X,
  Users,
  BookOpen,
  MessageSquare
} from 'lucide-react';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import Button from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VideoPreviewModal } from '@/components/VideoPreviewModal';
import { mockMentees } from '../services/MockData';

// Updated Types
interface Mentee {
  id: string;
  name: string;
  email: string;
  status: 'pending' | 'active' | 'rejected';
  initialSession: {
    type: 'video' | 'message';
    sessionType?: 'introductory' | 'consultory' | 'full';
    description: string;
    dateTime?: string;
  };
  learningPath?: LearningPath;
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

interface LearningPath {
  id: string;
  title: string;
  description: string;
  progress: number;
  totalHours: number;
  completedHours: number;
  mentorId: number;
  mentorName: string;
  modules: Module[];
  totalSessions: number;
  completedSessions: number;
  mentor: {
    id: number;
    name: string;
    avatar: string;
    role: string;
  };
}


const MenteesPage = () => {
  const navigate = useNavigate();
  const [mentees, setMentees] = useState<Mentee[]>(mockMentees);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedMentee, setSelectedMentee] = useState<Mentee | null>(null);

  const handleAcceptMentee = (menteeId: string) => {
    setMentees(prevMentees =>
      prevMentees.map(mentee =>
        mentee.id === menteeId ? { ...mentee, status: 'active' } : mentee
      )
    );
  };

  const handleRejectMentee = (menteeId: string) => {
    setMentees(prevMentees =>
      prevMentees.map(mentee =>
        mentee.id === menteeId ? { ...mentee, status: 'rejected' } : mentee
      )
    );
  };

  const handleCreateLearningPath = (menteeId: string) => {
    navigate(`/mentees/${menteeId}/learning-path/create`);
  };

  const handleViewLearningPath = (menteeId: string) => {
    navigate(`/mentees/${menteeId}/learning-path`);
  };

  const handleJoinSession = (mentee: Mentee) => {
    if (mentee.initialSession.type === 'video') {
      setSelectedMentee(mentee);
      setVideoModalOpen(true);
    } else {
      navigate('/messages');
    }
  };

  const getSessionTypeIcon = (sessionType?: 'introductory' | 'consultory' | 'full') => {
    switch (sessionType) {
      case 'introductory':
        return <Users className="h-4 w-4" />;
      case 'consultory':
        return <FileQuestion className="h-4 w-4" />;
      case 'full':
        return <BookOpen className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getSessionTypeLabel = (sessionType?: 'introductory' | 'consultory' | 'full') => {
    switch (sessionType) {
      case 'introductory':
        return 'Introductory Call';
      case 'consultory':
        return 'Consultation Session';
      case 'full':
        return 'Full Session';
      default:
        return 'Direct Message';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold mb-6">My Mentees</h1>
      
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending Requests</TabsTrigger>
          <TabsTrigger value="active">Active Mentees</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <div className="grid gap-4">
            {mentees
              .filter(mentee => mentee.status === 'pending')
              .map(mentee => (
                <Card key={mentee.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{mentee.name}</h3>
                        <p className="text-sm text-gray-500">{mentee.email}</p>
                        <div className="flex items-center gap-2 mt-2">
                          {mentee.initialSession.type === 'video' ? (
                            <>
                              <Video className="h-4 w-4 text-blue-500" />
                              {getSessionTypeIcon(mentee.initialSession.sessionType)}
                              <span className="text-sm text-gray-600">
                                {getSessionTypeLabel(mentee.initialSession.sessionType)}
                              </span>
                            </>
                          ) : (
                            <>
                              <MessageCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm text-gray-600">Direct Message</span>
                            </>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {mentee.initialSession.description}
                        </p>
                        {mentee.initialSession.dateTime && (
                          <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                            <Clock className="h-4 w-4" />
                            <span>{new Date(mentee.initialSession.dateTime).toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline"
                          onClick={() => handleJoinSession(mentee)}
                        >
                          {mentee.initialSession.type === 'video' ? 'Join Session' : 'Message'}
                        </Button>
                        <Button 
                          variant="primary"
                          onClick={() => handleAcceptMentee(mentee.id)}
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Accept
                        </Button>
                        <Button 
                          variant="destructive"
                          onClick={() => handleRejectMentee(mentee.id)}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Decline
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="active">
          <div className="grid gap-4">
            {mentees
              .filter(mentee => mentee.status === 'active')
              .map(mentee => (
                <Card key={mentee.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{mentee.name}</h3>
                        <p className="text-sm text-gray-500">{mentee.email}</p>
                        {mentee.learningPath ? (
                          <div className="mt-2">
                            <p className="text-sm font-medium">
                              Current Learning Path: {mentee.learningPath.title}
                            </p>
                            <div className="mt-1 h-2 w-full bg-gray-100 rounded-full">
                              <div 
                                className="h-full bg-blue-600 rounded-full"
                                style={{ width: `${mentee.learningPath.progress}%` }}
                              />
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              {mentee.learningPath.completedSessions} of {mentee.learningPath.totalSessions} sessions completed
                            </p>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 mt-2">No learning path created yet</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {mentee.learningPath ? (
                          <Button 
                            variant="primary"
                            onClick={() => handleViewLearningPath(mentee.id)}
                          >
                            View Learning Path
                            <ChevronRight className="h-4 w-4 ml-2" />
                          </Button>
                        ) : (
                          <Button 
                            variant="primary"
                            onClick={() => handleCreateLearningPath(mentee.id)}
                          >
                            Create Learning Path
                            <ChevronRight className="h-4 w-4 ml-2" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      <VideoPreviewModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        sessionData={{
          mentorName: selectedMentee?.name,
          dateTime: selectedMentee?.initialSession.dateTime
        }}
      />
    </div>
  );
};

export default MenteesPage;