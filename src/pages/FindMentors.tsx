import { useState } from 'react';
import { Search, SlidersHorizontal, Star, Briefcase, ChevronDown } from 'lucide-react';
import Card from '../components/ui/card';
import Button from '../components/ui/button';
import { BookingModal } from '../components/BookingModal';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Find Your Perfect Mentor</h1>
        <p className="mt-2 text-base text-gray-500">Browse our network of experienced mentors to guide you on your learning journey.</p>
      </div>

      {/* Search, Sort and Filter Header */}
      <div className="bg-white rounded-lg shadow p-4 sm:px-6 sm:py-5">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by name, expertise, company..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <select
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:w-auto w-full"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="rating">Sort by: Rating</option>
              <option value="experience">Sort by: Experience</option>
              <option value="sessions">Sort by: Sessions</option>
              <option value="price-low">Sort by: Price (Low to High)</option>
              <option value="price-high">Sort by: Price (High to Low)</option>
            </select>

            <Button
              variant="outline"
              className="flex items-center gap-2 whitespace-nowrap rounded-md"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-5 w-5" />
              Filters
              <ChevronDown className={`h-4 w-4 ml-1 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap gap-3">
            <select
              className="px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              value={selectedExpertise}
              onChange={(e) => setSelectedExpertise(e.target.value)}
            >
              <option value="all">All Expertise</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="fullstack">Full Stack</option>
              <option value="mobile">Mobile</option>
            </select>

            <select
              className="px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
            >
              <option value="all">All Experience</option>
              <option value="0-3">0-3 years</option>
              <option value="4-7">4-7 years</option>
              <option value="8+">8+ years</option>
            </select>

            <select
              className="px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
            >
              <option value="all">All Availability</option>
              <option value="this-week">This Week</option>
              <option value="next-week">Next Week</option>
              <option value="this-month">This Month</option>
            </select>
          </div>
        )}
      </div>

      {/* Results and Mentor Cards */}
      <div className="space-y-4">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">{currentMentors.length}</span> of <span className="font-medium">{filteredAndSortedMentors.length}</span> mentors
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentMentors.map((mentor) => (
            <Card key={mentor.id} className="p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center uppercase font-semibold text-blue-600">
                    {mentor.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">{mentor.name}</h3>
                  <p className="text-sm text-gray-600">{mentor.role} at {mentor.company}</p>
                  <div className="flex items-center gap-1 text-sm text-yellow-500">
                    <Star className="h-4 w-4" />
                    <span>{mentor.rating}</span>
                    <span className="text-gray-400">({mentor.sessionsCompleted} sessions)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Briefcase className="h-4 w-4" />
                    <span>{mentor.experience} Years Exp.</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {mentor.expertise.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {mentor.languages.map((lang, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                        {lang}
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 flex justify-between items-center">
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
                        Book Session
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-3 mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "primary" : "outline"}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}

          <Button
            variant="outline"
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