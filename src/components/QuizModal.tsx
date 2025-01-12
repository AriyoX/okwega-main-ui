import { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Button from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  quizData?: {
    quizId: string;
    title?: string;
    duration?: number; // Duration in minutes
  };
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer?: string; // Optional, for answer checking later
}

export const QuizModal = ({ isOpen, onClose, quizData }: QuizModalProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(quizData?.duration ? quizData.duration * 60 : 0); // Time in seconds
  const timerInterval = useRef<NodeJS.Timeout | null>(null);

  // Function to fetch quiz-specific questions
  const fetchQuizQuestions = async (quizId: string | undefined) => {
    if (!quizId) {
      setLoadingQuestions(false);
      return;
    }
    setLoadingQuestions(true);
    // Replace this with your actual API endpoint to fetch questions based on quizId
    try {
      // Mock API call - replace with your actual fetch logic
      const response = await new Promise<Question[]>((resolve) => {
        setTimeout(() => {
          // Generate different questions based on quizId for demonstration
          const baseQuestions = [
            { id: 1, question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], correctAnswer: "Paris" },
            { id: 2, question: "Which planet is known as the Red Planet?", options: ["Mars", "Jupiter", "Venus", "Saturn"], correctAnswer: "Mars" },
          ];

          if (quizId === 'quiz-101') {
            resolve([...baseQuestions, { id: 3, question: "What is the chemical symbol for water?", options: ["H2O", "CO2", "NaCl", "O2"], correctAnswer: "H2O" }]);
          } else if (quizId === 'quiz-102') {
            resolve([...baseQuestions, { id: 3, question: "Who painted the Mona Lisa?", options: ["Leonardo da Vinci", "Michelangelo", "Raphael", "Donatello"], correctAnswer: "Leonardo da Vinci" }]);
          } else if (quizId === 'quiz-103') {
            resolve([...baseQuestions, { id: 3, question: "What is the largest mammal?", options: ["Blue Whale", "Elephant", "Giraffe", "Hippopotamus"], correctAnswer: "Blue Whale" }]);
          } else if (quizId === 'quiz-104') {
            resolve([...baseQuestions, { id: 3, question: "In which year did World War II end?", options: ["1945", "1939", "1941", "1948"], correctAnswer: "1945" }]);
          } else if (quizId === 'quiz-105') {
            resolve([...baseQuestions, { id: 3, question: "What is the smallest country in the world?", options: ["Vatican City", "Monaco", "Nauru", "Tuvalu"], correctAnswer: "Vatican City" }]);
          } else if (quizId === 'quiz-106') {
            resolve([...baseQuestions, { id: 3, question: "What is the currency of Japan?", options: ["Yen", "Dollar", "Euro", "Pound"], correctAnswer: "Yen" }]);
          } else if (quizId === 'quiz-107') {
            resolve([...baseQuestions, { id: 3, question: "Who wrote 'Hamlet'?", options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"], correctAnswer: "William Shakespeare" }]);
          } else {
            resolve(baseQuestions); // Default questions if quizId doesn't match
          }
        }, 1000); // Simulate API delay
      });
      setQuestions(response);
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
      // Handle error appropriately, e.g., display an error message
      setQuestions([]);
    } finally {
      setLoadingQuestions(false);
    }
  };

  useEffect(() => {
    if (isOpen && quizData?.quizId) {
      fetchQuizQuestions(quizData.quizId);
    } else {
      setQuestions([]); // Clear questions when modal is closed or no quizId
    }
  }, [isOpen, quizData?.quizId]);

  // Set up the timer when the modal opens and quiz data is available
  useEffect(() => {
    if (isOpen && quizData?.duration) {
      setTimeRemaining(quizData.duration * 60);
      timerInterval.current = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timerInterval.current!);
            // Handle quiz timeout - maybe auto submit
            handleSubmit();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
    };
  }, [isOpen, quizData?.duration]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: value,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handleSubmit = () => {
    clearInterval(timerInterval.current!);
    // Handle quiz submission logic here, e.g., send answers to the server
    console.log("Quiz submitted with answers:", answers);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{quizData?.title || "Quiz"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {loadingQuestions ? (
            <p>Loading questions...</p>
          ) : questions.length > 0 ? (
            <>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>Time remaining: {formatTime(timeRemaining)}</span>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  {questions[currentQuestion].question}
                </h3>

                <RadioGroup
                  value={answers[currentQuestion]}
                  onValueChange={handleAnswer}
                  className="space-y-3"
                >
                  {questions[currentQuestion].options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={onClose}>
                  Exit Quiz
                </Button>
                {currentQuestion < questions.length - 1 ? (
                  <Button onClick={handleNext}>Next Question</Button>
                ) : (
                  <Button onClick={handleSubmit}>Submit Quiz</Button>
                )}
              </div>
            </>
          ) : (
            <p>No questions available for this quiz.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function SessionModals() {
  return null; // This is just a container for the modal components
}