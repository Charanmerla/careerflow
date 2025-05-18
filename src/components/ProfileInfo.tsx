import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ProfileInfoProps {
  name: string;
  email: string;
  jobTitle: string;
  onUpdate?: (name: string, jobTitle: string) => void;
  loading?: boolean;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  name,
  email,
  jobTitle,
  onUpdate,
  loading,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editJobTitle, setEditJobTitle] = useState(jobTitle);

  useEffect(() => {
    setEditName(name);
    setEditJobTitle(jobTitle);
  }, [name, jobTitle]);

  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="flex flex-col items-center gap-3">
        <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-3xl font-bold">
          {name.charAt(0).toUpperCase()}
        </div>
        {editMode ? (
          <>
            <label className="block text-xs text-gray-500 mb-1 w-full text-left">
              Name
            </label>
            <input
              className="border rounded px-2 py-1 w-full text-center"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Name"
            />
            <label className="block text-xs text-gray-500 mb-1 w-full text-left mt-2">
              Email
            </label>
            <div className="text-gray-500 text-sm w-full text-center">
              {email}
            </div>
            <label className="block text-xs text-gray-500 mb-1 w-full text-left mt-2">
              Job Title
            </label>
            <input
              className="border rounded px-2 py-1 w-full text-center"
              value={editJobTitle}
              onChange={(e) => setEditJobTitle(e.target.value)}
              placeholder="Job Title"
            />
            <Button
              className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
              onClick={() => {
                setEditMode(false);
                if (onUpdate) onUpdate(editName, editJobTitle);
              }}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </Button>
          </>
        ) : (
          <>
            <div className="text-lg font-semibold">{name}</div>
            <div className="text-gray-500 text-sm">{email}</div>
            <div className="text-sm text-gray-700">{jobTitle}</div>
            <Button
              className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
              onClick={() => setEditMode(true)}
            >
              Edit
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
