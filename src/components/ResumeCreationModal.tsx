import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileText, Linkedin, Binary, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import ResumeSelectionModal from "./ResumeSelectionModal";
import AIPromptModal from "./AIPromptModal";

interface ResumeCreationModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ResumeCreationModal = ({
  isOpen,
  onOpenChange,
}: ResumeCreationModalProps) => {
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);
  const [isAIPromptModalOpen, setIsAIPromptModalOpen] = useState(false);

  const options = [
    {
      id: "existing",
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      title: "Select An Existing Resume",
      description: "Pick a resume from your Careerfocus or local storage",
    },
    {
      id: "linkedin",
      icon: <Linkedin className="h-8 w-8 text-blue-600" />,
      title: "Build Using LinkedIn",
      description: "We'll fetch the details from your LinkedIn profile",
    },
    {
      id: "ai",
      icon: <Binary className="h-8 w-8 text-blue-600" />,
      title: "Start With AI Prompt",
      description: "Provide the instructions to the AI for your resume",
    },
    {
      id: "blank",
      icon: <File className="h-8 w-8 text-blue-600" />,
      title: "Choose A Blank Template",
      description: "You'll get a blank template to fill the details yourself",
    },
  ];

  const handleOptionClick = (optionId: string) => {
    if (optionId === "existing") {
      setIsSelectionModalOpen(true);
    } else if (optionId === "ai") {
      setIsAIPromptModalOpen(true);
    } else {
      console.log(`Selected option: ${optionId}`);
      onOpenChange(false);
      // Future implementation: Handle different options based on optionId
    }
  };

  const handlePreviousClick = () => {
    setIsSelectionModalOpen(false);
    setIsAIPromptModalOpen(false);
  };

  return (
    <>
      <Dialog
        open={isOpen && !isSelectionModalOpen && !isAIPromptModalOpen}
        onOpenChange={onOpenChange}
      >
        <DialogContent className="sm:max-w-md p-2 sm:p-6 w-full max-w-xs xs:max-w-sm sm:max-w-md overflow-x-hidden mx-2 sm:mx-0">
          <DialogHeader>
            <DialogTitle className="text-base sm:text-xl font-semibold">
              Options To Create A New Resume
            </DialogTitle>
            <p className="text-xs sm:text-sm text-gray-500">
              Go with the option that fits best for you
            </p>
          </DialogHeader>
          <div className="space-y-2 sm:space-y-4 mt-2">
            {options.map((option) => (
              <Button
                key={option.id}
                variant="outline"
                className="w-full flex flex-col xs:flex-row items-start xs:items-center justify-start gap-2 xs:gap-3 sm:gap-4 p-2 sm:p-4 h-auto hover:bg-blue-50 hover:border-blue-200 group text-left whitespace-normal break-words"
                onClick={() => handleOptionClick(option.id)}
              >
                <div className="p-2 bg-blue-50 rounded-md group-hover:bg-white flex-shrink-0 mb-2 xs:mb-0">
                  {option.icon}
                </div>
                <div className="text-left w-full">
                  <h3 className="text-sm sm:text-md font-medium">
                    {option.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {option.description}
                  </p>
                </div>
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <ResumeSelectionModal
        isOpen={isOpen && isSelectionModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsSelectionModalOpen(false);
            onOpenChange(false);
          }
        }}
        onPrevious={handlePreviousClick}
      />

      <AIPromptModal
        isOpen={isOpen && isAIPromptModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsAIPromptModalOpen(false);
            onOpenChange(false);
          }
        }}
        onPrevious={handlePreviousClick}
      />
    </>
  );
};

export default ResumeCreationModal;
