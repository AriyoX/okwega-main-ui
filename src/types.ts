export interface Session {
  id: string;
  mentorId: string;
  menteeId: string;
  startTime: Date;
  endTime: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
  topic: string;
  notes?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'mentor' | 'mentee';
  avatar?: string;
  specializations?: string[];
  bio?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Stats {
  totalSessions: number;
  completedSessions: number;
  upcomingSessions: number;
  totalEarnings?: number;
  averageRating?: number;
}