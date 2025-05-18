
import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChecklistItemProps {
  title: string;
  description: string;
  buttonText: string;
  completed?: boolean;
}

const ChecklistItem = ({ title, description, buttonText, completed = false }: ChecklistItemProps) => {
  return (
    <div className="border-b border-gray-100 px-4 py-3 flex">
      <div className="mt-1 mr-3">
        <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${
          completed ? "bg-blue-600 border-blue-600" : "border-gray-300"
        }`}>
          {completed && <Check className="h-4 w-4 text-white" />}
        </div>
      </div>
      <div className="flex-1">
        <h3 className="font-medium mb-1">{title}</h3>
        <p className="text-sm text-gray-500 mb-2">{description}</p>
        <Button 
          variant="link" 
          className="p-0 h-auto text-blue-600 font-medium"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default ChecklistItem;
