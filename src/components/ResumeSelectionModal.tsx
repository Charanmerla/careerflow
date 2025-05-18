
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Search, Upload, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResumeSelectionModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onPrevious: () => void;
}

const ResumeSelectionModal = ({ isOpen, onOpenChange, onPrevious }: ResumeSelectionModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Select A Resume</DialogTitle>
          <p className="text-sm text-gray-500">Choose from your existing resumes on Careerfocus or local computer</p>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {/* Search and Upload section */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-white border border-gray-200 pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 px-4 py-2 border border-gray-200"
            >
              <Upload className="h-4 w-4" />
              <span>Upload Resume</span>
            </Button>
          </div>

          {/* Resume list area - currently empty */}
          <div className="flex items-center justify-center py-12 text-gray-500">
            <p>No Resumes Found</p>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between pt-4">
            <Button 
              variant="outline" 
              onClick={onPrevious}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous</span>
            </Button>
            <Button 
              disabled={true}
              className="bg-gray-200 text-gray-500 cursor-not-allowed"
            >
              Next Step
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeSelectionModal;
