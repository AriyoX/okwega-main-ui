import { useState } from 'react';
import { Search, SlidersHorizontal, Star, Briefcase } from 'lucide-react';
import Card from '../components/ui/card';
import Button from '../components/ui/button';
import { BookingModal } from '../components/BookingModal';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Mentor {
  id: number;
  name: string;
  role: string;
  company: string;
  expertise: string[];
  experience: number;
  rating: number;
  sessionsCompleted: number;
  availability: string;
  bio: string;
  hourlyRate: number;
  languages: string[];
}

const mentors: Mentor[] = [
  {
    id: 1,
    name: "Sarah Wilson",
    role: "Senior Software Engineer",
    company: "Google",
    expertise: ["Frontend Development", "React", "TypeScript"],
    experience: 8,
    rating: 4.9,
    sessionsCompleted: 156,
    availability: "This Week",
    bio: "Passionate about helping developers master modern frontend technologies. Specialized in React ecosystem and large-scale applications.",
    hourlyRate: 120,
    languages: ["English", "Spanish"]
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Tech Lead",
    company: "Microsoft",
    expertise: ["Backend Development", "Python", "System Design"],
    experience: 12,
    rating: 4.8,
    sessionsCompleted: 203,
    availability: "Next Week",
    bio: "Experienced in building scalable backend systems. Love mentoring developers in system design and architecture.",
    hourlyRate: 150,
    languages: ["English", "Mandarin"]
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Mobile Developer",
    company: "Apple",
    expertise: ["iOS Development", "Swift", "Mobile Architecture"],
    experience: 6,
    rating: 4.7,
    sessionsCompleted: 89,
    availability: "This Week",
    bio: "Specialized in iOS development and mobile app architecture. Passionate about clean code and best practices.",
    hourlyRate: 100,
    languages: ["English", "Portuguese"]
  },
  {
    id: 4,
    name: "David Kumar",
    role: "Principal Engineer",
    company: "Amazon",
    expertise: ["Full Stack", "AWS", "Microservices"],
    experience: 15,
    rating: 5.0,
    sessionsCompleted: 312,
    availability: "This Month",
    bio: "Cloud architecture expert with extensive experience in distributed systems and microservices.",
    hourlyRate: 180,
    languages: ["English", "Hindi"]
  },
  {
    id: 5,
    name: "Lisa Park",
    role: "DevOps Engineer",
    company: "Netflix",
    expertise: ["DevOps", "Kubernetes", "CI/CD"],
    experience: 7,
    rating: 4.9,
    sessionsCompleted: 134,
    availability: "This Week",
    bio: "DevOps specialist focusing on cloud-native technologies and automation. Expert in building robust CI/CD pipelines.",
    hourlyRate: 140,
    languages: ["English", "Korean"]
  },
  {
    id: 6,
    name: "James Thompson",
    role: "Security Engineer",
    company: "Cloudflare",
    expertise: ["Security", "Penetration Testing", "Cloud Security"],
    experience: 9,
    rating: 4.8,
    sessionsCompleted: 167,
    availability: "Next Week",
    bio: "Cybersecurity expert specialized in web security and cloud infrastructure protection.",
    hourlyRate: 160,
    languages: ["English"]
  },
  {
    id: 7,
    name: "Ana Silva",
    role: "Data Scientist",
    company: "Meta",
    expertise: ["Machine Learning", "Python", "Data Analysis"],
    experience: 5,
    rating: 4.7,
    sessionsCompleted: 78,
    availability: "This Week",
    bio: "Data scientist passionate about machine learning and AI. Experience in building recommendation systems.",
    hourlyRate: 130,
    languages: ["English", "Portuguese", "Spanish"]
  },
  {
    id: 8,
    name: "Tom Anderson",
    role: "Engineering Manager",
    company: "Stripe",
    expertise: ["Engineering Management", "System Design", "Team Building"],
    experience: 14,
    rating: 4.9,
    sessionsCompleted: 245,
    availability: "This Month",
    bio: "Engineering leader with experience in scaling teams and building world-class payment systems.",
    hourlyRate: 200,
    languages: ["English", "French"]
  },
  {
    id: 9,
    name: "Nina Patel",
    role: "UX Engineer",
    company: "Airbnb",
    expertise: ["UI/UX", "Frontend", "Design Systems"],
    experience: 6,
    rating: 4.8,
    sessionsCompleted: 112,
    availability: "This Week",
    bio: "Bridging the gap between design and development. Expert in creating accessible and beautiful user interfaces.",
    hourlyRate: 120,
    languages: ["English", "Hindi", "Gujarati"]
  },
  {
    id: 10,
    name: "Marcus Schmidt",
    role: "Blockchain Developer",
    company: "Coinbase",
    expertise: ["Blockchain", "Smart Contracts", "Web3"],
    experience: 4,
    rating: 4.6,
    sessionsCompleted: 67,
    availability: "Next Week",
    bio: "Web3 developer specialized in building decentralized applications and smart contracts.",
    hourlyRate: 140,
    languages: ["English", "German"]
  }
];

export function FindMentors() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedExpertise, setSelectedExpertise] = useState('all');
  const [selectedExperience, setSelectedExperience] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [currentPage, setCurrentPage] = useState(1);
  const [bookedMentors, setBookedMentors] = useState<number[]>(() => {
    const saved = localStorage.getItem('bookedMentors');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const mentorsPerPage = 6;

  const sortMentors = (mentors: Mentor[]) => {
    return [...mentors].sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return b.experience - a.experience;
        case 'sessions':
          return b.sessionsCompleted - a.sessionsCompleted;
        case 'price-low':
          return a.hourlyRate - b.hourlyRate;
        case 'price-high':
          return b.hourlyRate - a.hourlyRate;
        default:
          return 0;
      }
    });
  };

  const handleCloseBooking = () => {
    setSelectedMentor(null);
  };

  const handleBookingComplete = (mentorId: number) => {
    setBookedMentors(prev => {
      const updated = [...prev, mentorId];
      localStorage.setItem('bookedMentors', JSON.stringify(updated));
      return updated;
    });
  };

  const filterMentors = (mentors: Mentor[]) => {
    return mentors.filter(mentor => {
      const matchesSearch =
        mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.expertise.some(e => e.toLowerCase().includes(searchQuery.toLowerCase())) ||
        mentor.company.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesExpertise = selectedExpertise === 'all' ||
        mentor.expertise.some(e => e.toLowerCase().includes(selectedExpertise.toLowerCase()));

      const matchesExperience = selectedExperience === 'all' ||
        (selectedExperience === '0-3' && mentor.experience <= 3) ||
        (selectedExperience === '4-7' && mentor.experience > 3 && mentor.experience <= 7) ||
        (selectedExperience === '8+' && mentor.experience > 7);

      const matchesAvailability = selectedAvailability === 'all' ||
        mentor.availability.toLowerCase().replace(' ', '-') === selectedAvailability;

      return matchesSearch && matchesExpertise && matchesExperience && matchesAvailability;
    });
  };

  const filteredAndSortedMentors = sortMentors(filterMentors(mentors));
  const totalPages = Math.ceil(filteredAndSortedMentors.length / mentorsPerPage);
  const currentMentors = filteredAndSortedMentors.slice(
    (currentPage - 1) * mentorsPerPage,
    currentPage * mentorsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Find Your Perfect Mentor</h1>
        <p className="mt-1 text-sm text-gray-500">Browse our network of experienced mentors to guide you.</p>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search mentors..."
            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={sortBy} onValueChange={(value) => setSortBy(value as 'rating' | 'experience' | 'sessions' | 'price-low' | 'price-high')}>
          <SelectTrigger className="w-full sm:w-[auto] text-sm">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">Rating</SelectItem>
            <SelectItem value="experience">Experience</SelectItem>
            <SelectItem value="sessions">Sessions</SelectItem>
            <SelectItem value="price-low">Price (Low to High)</SelectItem>
            <SelectItem value="price-high">Price (High to Low)</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          className="w-full justify-center text-sm"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
        </Button>
        {showFilters && (
          <div className="col-span-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Select value={selectedExpertise} onValueChange={setSelectedExpertise}>
              <SelectTrigger className="w-full text-sm">
                <SelectValue placeholder="Expertise" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Expertise</SelectItem>
                <SelectItem value="frontend">Frontend</SelectItem>
                <SelectItem value="backend">Backend</SelectItem>
                <SelectItem value="fullstack">Full Stack</SelectItem>
                <SelectItem value="mobile">Mobile</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedExperience} onValueChange={setSelectedExperience}>
              <SelectTrigger className="w-full text-sm">
                <SelectValue placeholder="Experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Experience</SelectItem>
                <SelectItem value="0-3">0-3 years</SelectItem>
                <SelectItem value="4-7">4-7 years</SelectItem>
                <SelectItem value="8+">8+ years</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
              <SelectTrigger className="w-full text-sm">
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Availability</SelectItem>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="next-week">Next Week</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Mentor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentMentors.map((mentor) => (
          <Card key={mentor.id} className="border">
            <div className="p-4">
              <div className="flex items-start mb-3">
                <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center uppercase font-semibold text-blue-600 text-sm">
                    {mentor.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-base font-semibold text-gray-800">{mentor.name}</h3>
                  <p className="text-sm text-gray-500">{mentor.role} at {mentor.company}</p>
                  <div className="flex items-center gap-1 text-sm text-yellow-500">
                    <Star className="h-3 w-3" />
                    <span>{mentor.rating}</span>
                    <span className="text-gray-400 text-xs">({mentor.sessionsCompleted})</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                <Briefcase className="h-3 w-3" />
                <span>{mentor.experience} Years Exp.</span>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {mentor.expertise.map((skill, index) => (
                  <span key={index} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {mentor.languages.map((lang, index) => (
                  <span key={index} className="px-2 py-0.5 bg-gray-50 text-gray-700 text-xs rounded-full">
                    {lang}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700 font-medium">${mentor.hourlyRate}/hr</span>
                {bookedMentors.includes(mentor.id) ? (
                  <Button
                    size="sm"
                    className="whitespace-nowrap"
                    disabled
                    variant="outline"
                  >
                    Contacted
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    className="whitespace-nowrap"
                    onClick={() => setSelectedMentor(mentor)}
                  >
                    Book
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "primary" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}

      <BookingModal
        mentor={selectedMentor}
        isOpen={selectedMentor !== null}
        onClose={handleCloseBooking}
        onBookingComplete={handleBookingComplete}
      />
    </div>
  );
}