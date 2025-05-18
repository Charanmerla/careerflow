import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import ProfileInfo from "./ProfileInfo";
import { useAuth } from "@/hooks/use-auth";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "sonner";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<{
    name: string;
    email: string;
    jobTitle: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && isOpen) {
      setLoading(true);
      getDoc(doc(db, "users", user.uid)).then((snap) => {
        if (snap.exists()) {
          setProfile(snap.data() as any);
        }
        setLoading(false);
      });
    }
  }, [user, isOpen]);

  const handleUpdate = async (name: string, jobTitle: string) => {
    if (!user) return;
    setLoading(true);
    try {
      await updateDoc(doc(db, "users", user.uid), { name, jobTitle });
      setProfile((prev) => (prev ? { ...prev, name, jobTitle } : prev));
      toast("Profile updated!");
    } catch (e) {
      toast("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="bg-white p-6 pt-10">
          <DialogHeader className="text-center">
            <DialogTitle className="text-xl font-bold mb-2">
              Profile
            </DialogTitle>
          </DialogHeader>
          {profile && (
            <ProfileInfo
              name={profile.name}
              email={profile.email}
              jobTitle={profile.jobTitle}
              onUpdate={handleUpdate}
              loading={loading}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
