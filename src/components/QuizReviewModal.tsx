import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Button from '@/components/ui/button';

interface QuizReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    quizData?: {
      title: string;
      score?: number;
      totalQuestions: number;
      // In a real application, you might have more detailed results here
    };
  }
  
  export const QuizReviewModal = ({ isOpen, onClose, quizData }: QuizReviewModalProps) => {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{quizData?.title || "Quiz Review"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {quizData ? (
              <>
                <p>
                  Your Score: {quizData.score}/{quizData.totalQuestions}
                </p>
                {/* In a real application, you might display individual question results */}
                <p className="text-sm text-gray-500">
                  For a detailed review, please refer to your submitted answers.
                </p>
              </>
            ) : (
              <p>No quiz data available.</p>
            )}
            <div className="flex justify-end">
              <Button variant="outline" onClick={onClose}>Close</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };