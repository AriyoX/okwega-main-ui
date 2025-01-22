import { useState } from 'react';
import { Search, Send, Clock, BookOpen, ChevronRight, ArrowLeft } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import Button from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Existing interfaces remain the same
interface Message {
  id: string;
  senderId: number;
  receiverId: number;
  content: string;
  timestamp: string;
  relatedTo?: {
    type: 'session' | 'learningPath';
    id: string;
    title: string;
  };
}

interface Contact {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  online: boolean;
}

const mockContacts: Contact[] = [
    {
      id: 1,
      name: "Sarah Wilson",
      role: "Senior Software Engineer",
      company: "Google",
      avatar: "/api/placeholder/32/32",
      lastMessage: "Great progress on the React fundamentals!",
      lastMessageTime: "2025-01-22T10:30:00",
      unreadCount: 2,
      online: true
    },
    {
      id: 2,
      name: "David Kumar",
      role: "Principal Engineer",
      company: "Amazon",
      avatar: "/api/placeholder/32/32",
      lastMessage: "Let's discuss the backend architecture in our next session",
      lastMessageTime: "2025-01-21T15:45:00",
      unreadCount: 0,
      online: false
    },
    {
      id: 3,
      name: "Emily Chen",
      role: "Data Scientist",
      company: "Netflix",
      avatar: "/api/placeholder/32/32",
      lastMessage: "Don't forget to complete the ML quiz before our next meeting",
      lastMessageTime: "2025-01-20T09:15:00",
      unreadCount: 1,
      online: true
    }
  ];
  
const mockMessages: Message[] = [
    {
      id: "1",
      senderId: 1,
      receiverId: 0,
      content: "How are you progressing with the React hooks exercise?",
      timestamp: "2025-01-22T10:30:00",
      relatedTo: {
        type: "session",
        id: "session-1",
        title: "React Fundamentals"
      }
    },
    {
      id: "2",
      senderId: 0,
      receiverId: 1,
      content: "I've completed most of it, but I have some questions about useEffect dependencies.",
      timestamp: "2025-01-22T10:31:00"
    },
    {
      id: "3",
      senderId: 1,
      receiverId: 0,
      content: "That's a common point of confusion. Let's go through it in detail during our next session.",
      timestamp: "2025-01-22T10:32:00"
    }
  ];

export default function MessagesPage() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(true);

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
    setIsMobileNavOpen(false);
  };

  const handleBackToContacts = () => {
    setIsMobileNavOpen(true);
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedContact) return;
    // Handle sending message logic here
    setMessageInput('');
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-2 sm:py-6">
      <div className="flex h-[calc(100vh-4rem)] gap-4">
        {/* Contacts Sidebar - Hidden on mobile when chat is open */}
        <div className={cn(
          "w-full sm:w-80 flex flex-col border rounded-lg bg-white transition-all duration-300",
          "absolute sm:relative",
          "h-full sm:h-auto",
          "z-10",
          !isMobileNavOpen && "translate-x-[-100%] sm:translate-x-0 hidden sm:flex"
        )}>
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search contacts..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className={cn(
                    "p-3 rounded-lg cursor-pointer transition-colors",
                    selectedContact?.id === contact.id
                      ? 'bg-blue-50'
                      : 'hover:bg-gray-50'
                  )}
                  onClick={() => handleContactSelect(contact)}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={contact.avatar} alt={contact.name} />
                        <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      {contact.online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium truncate">{contact.name}</h3>
                        {contact.lastMessageTime && (
                          <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                            {formatTime(contact.lastMessageTime)}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{contact.role}</p>
                      {contact.lastMessage && (
                        <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area - Full width on mobile */}
        <div className={cn(
          "flex-1 flex flex-col border rounded-lg bg-white",
          isMobileNavOpen && "hidden sm:flex"
        )}>
          {selectedContact ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="sm:hidden mr-2"
                      onClick={handleBackToContacts}
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <Avatar>
                      <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                      <AvatarFallback>{selectedContact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="font-semibold">{selectedContact.name}</h2>
                      <p className="text-sm text-gray-600">
                        {selectedContact.role} at {selectedContact.company}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2">
                    {selectedContact.online ? (
                      <span className="text-sm text-green-600 flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-600 rounded-full" />
                        Online
                      </span>
                    ) : (
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Offline
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {mockMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.senderId === 0 ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] sm:max-w-[70%] rounded-lg p-3",
                          message.senderId === 0
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-900'
                        )}
                      >
                        {message.relatedTo && (
                          <div className={cn(
                            "flex items-center gap-1 text-xs mb-2",
                            message.senderId === 0 ? 'text-blue-100' : 'text-gray-500'
                          )}>
                            <BookOpen className="w-3 h-3" />
                            {message.relatedTo.type === 'session' ? 'Session: ' : 'Learning Path: '}
                            {message.relatedTo.title}
                            <ChevronRight className="w-3 h-3" />
                          </div>
                        )}
                        <p>{message.content}</p>
                        <div className={cn(
                          "text-xs mt-1",
                          message.senderId === 0 ? 'text-blue-100' : 'text-gray-500'
                        )}>
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') handleSendMessage();
                    }}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center border rounded-lg bg-white">
              <p className="text-gray-500">Select a contact to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}