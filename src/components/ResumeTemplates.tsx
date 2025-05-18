
import React from "react";
import { Check } from "lucide-react";

export interface ResumeTemplateProps {
  id: string;
  name: string;
  description: string;
  previewImage?: string;
}

export interface ResumeTemplateSelectionProps {
  templates: ResumeTemplateProps[];
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

const ResumeTemplates: React.FC<ResumeTemplateSelectionProps> = ({
  templates,
  selectedTemplate,
  onSelectTemplate,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Resume Templates</h3>
      <div className="grid grid-cols-1 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`border rounded-md p-3 transition-all cursor-pointer hover:border-blue-400 ${
              selectedTemplate === template.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200"
            }`}
            onClick={() => onSelectTemplate(template.id)}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">{template.name}</h4>
              {selectedTemplate === template.id && (
                <div className="h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500 mb-3">{template.description}</p>
            <div className="aspect-[8.5/11] bg-gray-100 rounded overflow-hidden border border-gray-200">
              {template.previewImage ? (
                <img
                  src={template.previewImage}
                  alt={`${template.name} preview`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                  Preview
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeTemplates;
