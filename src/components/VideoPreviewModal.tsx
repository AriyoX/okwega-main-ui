import { useState, useEffect } from 'react';
import { Video, Mic, MicOff, VideoOff } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Button from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

// Video Preview Modal Component
interface VideoPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionData: {
    mentorName?: string;
    dateTime?: string; // Add the dateTime of the session
  };
}

export const VideoPreviewModal = ({ isOpen, onClose, sessionData }: VideoPreviewModalProps) => {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [timeUntilStart, setTimeUntilStart] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen && sessionData.dateTime) {
      const scheduledTime = new Date(sessionData.dateTime).getTime();

      const updateTimeRemaining = () => {
        const now = new Date().getTime();
        const difference = scheduledTime - now;

        if (difference <= 0) {
          setTimeUntilStart(0);
        } else {
          setTimeUntilStart(Math.floor(difference / 1000));
        }
      };

      updateTimeRemaining(); // Initial call to set the time immediately
      const timer = setInterval(updateTimeRemaining, 1000);

      return () => clearInterval(timer);
    } else {
      setTimeUntilStart(null); // Reset timer if modal is closed or no dateTime
    }
  }, [isOpen, sessionData.dateTime]);

  const formatTime = (seconds: number) => {
    if (seconds <= 0) {
      return "0:00";
    }

    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''}, ${hours} hour${hours !== 1 ? 's' : ''}`;
    } else if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    } else {
      return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Join Session with {sessionData?.mentorName}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {timeUntilStart !== null && timeUntilStart > 0 ? (
            <Alert>
              <AlertTitle>Session starts in: {formatTime(timeUntilStart)}</AlertTitle>
              <AlertDescription>
                You can join the session when the timer reaches 0:00
              </AlertDescription>
            </Alert>
          ) : timeUntilStart === 0 ? (
            <Alert>
              <AlertTitle>Session is starting now!</AlertTitle>
            </Alert>
          ) : null}

          <div className="bg-gray-900 w-full aspect-video rounded-lg relative">
            {isVideoOn ? (
              <img
                src="/api/placeholder/640/360"
                alt="Video preview"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-800 rounded-lg">
                <Video className="h-20 w-20 text-gray-400" />
              </div>
            )}
          </div>

          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              className="rounded-full p-3"
              onClick={() => setIsMicOn(!isMicOn)}
            >
              {isMicOn ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
            </Button>
            <Button
              variant="outline"
              className="rounded-full p-3"
              onClick={() => setIsVideoOn(!isVideoOn)}
            >
              {isVideoOn ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
            </Button>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button disabled={timeUntilStart !== 0}>Join Now</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};