import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from '@/components/ui/dialog';
  import Button from '@/components/ui/button';

interface NotesModalProps {
    isOpen: boolean;
    onClose: () => void;
    notes?: string;
  }
  
  export const NotesModal = ({ isOpen, onClose, notes }: NotesModalProps) => {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Session Notes</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="whitespace-pre-line">{notes || "No notes available for this session."}</p>
            <div className="flex justify-end">
              <Button variant="outline" onClick={onClose}>Close</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };