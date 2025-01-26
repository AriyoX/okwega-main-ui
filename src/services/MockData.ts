/* eslint-disable @typescript-eslint/no-unused-vars */
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

export const mockMentees: Mentee[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      status: 'pending',
      initialSession: {
        type: 'video',
        sessionType: 'introductory',
        description: '30-minute introductory call to discuss learning goals and expectations',
        dateTime: '2025-02-01T10:00:00'
      }
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      status: 'pending',
      initialSession: {
        type: 'video',
        sessionType: 'consultory',
        description: '45-minute consultation to review technical challenges and provide guidance',
        dateTime: '2025-02-02T14:30:00'
      }
    },
    {
      id: '3',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      status: 'pending',
      initialSession: {
        type: 'video',
        sessionType: 'full',
        description: '60-minute comprehensive mentoring session focusing on advanced React concepts',
        dateTime: '2025-02-03T11:00:00'
      }
    },
    {
      id: '4',
      name: 'Bob Wilson',
      email: 'bob@example.com',
      status: 'pending',
      initialSession: {
        type: 'message',
        description: 'Direct messaging to discuss potential mentorship opportunity'
      }
    },
    {
      id: '5',
      name: 'Sarah Chen',
      email: 'sarah@example.com',
      status: 'active',
      initialSession: {
        type: 'video',
        sessionType: 'full',
        description: 'Regular mentoring session',
        dateTime: '2025-01-15T09:00:00'
      },
      learningPath: {
        id: 'lp1',
        title: 'Frontend Development',
        description: 'Complete frontend development pathway',
        progress: 30,
        totalHours: 40,
        completedHours: 12,
        mentorId: 1,
        mentorName: 'David Kumar',
        modules: [],
        totalSessions: 10,
        completedSessions: 3,
        mentor: {
          id: 1,
          name: 'David Kumar',
          avatar: '',
          role: 'Senior Developer'
        }
      }
    }
  ];

  export const mockLearningPaths: { [key: string]: LearningPath } = {
    'lp1': {
      id: 'lp1',
      title: 'Frontend Development Path',
      description: 'Complete guide to modern frontend development',
      progress: 70,
      totalHours: 40,
      completedHours: 28,
      mentorId: 1,
      mentorName: 'David Kumar',
      totalSessions: 10,
      completedSessions: 7,
      mentor: {
        id: 1,
        name: 'David Kumar',
        avatar: '/api/placeholder/32/32',
        role: 'Senior Developer'
      },
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
              learningPathId: 'lp1',
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
              rating: 5,
              feedback: 'Great session! The mentee showed good understanding of React basics.'
            }
          ]
        }
      ]
    }
  };
  
  export function getLearningPath(pathId: string): LearningPath | undefined {
    return mockLearningPaths[pathId];
  }
  
  export function createLearningPath(learningPath: Partial<LearningPath>): string {
    const newId = `lp${Object.keys(mockLearningPaths).length + 1}`;
    mockLearningPaths[newId] = {
      ...learningPath,
      id: newId
    } as LearningPath;
    return newId;
  }
  
  export const updateLearningPath = async (pathData: LearningPath) => {
    // Mock API call
    return new Promise(resolve => setTimeout(() => resolve(pathData), 500));
  };