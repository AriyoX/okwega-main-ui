import { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import Button from './ui/button';
import { Textarea } from './ui/textarea';

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

interface BookingModalProps {
  mentor: Mentor | null;
  isOpen: boolean;
  onClose: () => void;
  onBookingComplete: (mentorId: number) => void;
}

export function BookingModal({ mentor, isOpen, onClose, onBookingComplete }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    sessionType: '',
    date: '',
    time: '',
    topics: '',
  });

  const handleNext = () => {
    if (step === 1 && formData.sessionType === 'message') {
        setStep(3);
      } else {
        setStep(step + 1);
      }
  };

  const handleBack = () => {
    if (step === 3 && formData.sessionType === 'message') {
        setStep(1);
      } else {
        setStep(step - 1);
      }
  };

  const handleSubmit = () => {
    // Here you would typically send the booking data to your backend
    console.log('Submitting booking:', {
      mentor,
      ...formData
    });
    if (mentor) {
        onBookingComplete(mentor.id);  // Call this when booking is successful
    }
    setStep(1); // Reset step
    setFormData({ // Reset form
      sessionType: '',
      date: '',
      time: '',
      topics: '',
    });
    onClose();
  };

  // Early return if no mentor selected
  if (!mentor) return null;

  const renderStep1 = () => (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Choose the type of initial session with {mentor.name}
      </p>
      <Select onValueChange={(value) => setFormData({ ...formData, sessionType: value })}>
        <SelectTrigger>
          <SelectValue placeholder="Select session type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="message">
            Send a Message
          </SelectItem>
          <SelectItem value="introduction">
            Introduction Call (15 mins - Free)
          </SelectItem>
          <SelectItem value="consultation">
            Consultation Session (30 mins - ${mentor.hourlyRate / 2})
          </SelectItem>
          <SelectItem value="full">
            Full Session (60 mins - ${mentor.hourlyRate})
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-600">Select Date</label>
          <div className="flex items-center mt-2">
            <Calendar className="w-4 h-4 mr-2" />
            <input
              type="date"
              className="w-full p-2 border rounded"
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>
        </div>
        <div>
          <label className="text-sm text-gray-600">Select Time</label>
          <div className="flex items-center mt-2">
            <Clock className="w-4 h-4 mr-2" />
            <input
              type="time"
              className="w-full p-2 border rounded"
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        {formData.sessionType === 'message' 
          ? "What would you like to discuss with the mentor?"
          : "What topics would you like to discuss? This helps the mentor prepare for the session."
        }
      </p>
      <Textarea
        placeholder={formData.sessionType === 'message'
          ? "Write your message here..."
          : "E.g., Career progression in frontend development, specific technical challenges, etc."
        }
        className="h-32"
        onChange={(e) => setFormData({ ...formData, topics: e.target.value })}
      />
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {step === 1 && "Choose Session Type"}
            {step === 2 && "Select Date & Time"}
            {step === 3 && "Session Details"}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>

        <DialogFooter className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={step === 1 ? onClose : handleBack}
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </Button>
          <Button
            onClick={step === 3 ? handleSubmit : handleNext}
          >
            {step === 3 ? 'Confirm Booking' : 'Next'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}