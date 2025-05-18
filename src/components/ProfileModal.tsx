import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="absolute right-4 top-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <div className="bg-white p-6 pt-10">
          <DialogHeader className="text-center">
            <DialogTitle className="text-xl font-bold mb-2">
              Profile
            </DialogTitle>
          </DialogHeader>
          {/* User info placeholder */}
          <div className="flex flex-col items-center gap-3 mt-4">
            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-3xl font-bold">
              U
            </div>
            <div className="text-lg font-semibold">User Name</div>
            <div className="text-gray-500 text-sm">user@email.com</div>
            <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium">
              Edit Profile
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
