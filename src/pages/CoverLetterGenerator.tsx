
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, FileText, Download } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { toast } from "@/hooks/use-toast";

const CoverLetterGenerator = () => {
  const [resume, setResume] = useState<File | null>(null);
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleGenerate = () => {
    // This is a mock generation process, in a real app this would call an API
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const mockContent = "Dear Hiring Manager,\n\nI am writing to express my interest in the [Job Title] position at [Company Name]. With my background in [relevant field] and experience in [relevant skills], I am confident that I would be a valuable addition to your team.\n\nThank you for considering my application. I look forward to the opportunity to discuss my qualifications further.\n\nSincerely,\n[Your Name]";
      setGeneratedContent(mockContent);
      setIsGenerating(false);
      
      toast({
        title: "Cover letter generated",
        description: "Your cover letter has been generated successfully.",
      });
    }, 1500);
  };

  const downloadAsPDF = () => {
    if (!generatedContent) {
      toast({
        title: "No content to download",
        description: "Please generate a cover letter first.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real implementation, this would use a library like jsPDF or call a backend API
    // This is a simplified version for demonstration purposes
    toast({
      title: "Download started",
      description: "Your PDF is being prepared for download.",
    });
    
    // Simulate download delay
    setTimeout(() => {
      const element = document.createElement('a');
      const file = new Blob([generatedContent], {type: 'application/pdf'});
      element.href = URL.createObjectURL(file);
      element.download = 'cover-letter.pdf';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 500);
  };

  const downloadAsDoc = () => {
    if (!generatedContent) {
      toast({
        title: "No content to download",
        description: "Please generate a cover letter first.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real implementation, this would use a library to properly format DOC files
    // This is a simplified version for demonstration purposes
    toast({
      title: "Download started",
      description: "Your DOC file is being prepared for download.",
    });
    
    // Simulate download delay
    setTimeout(() => {
      const element = document.createElement('a');
      const file = new Blob([generatedContent], {type: 'application/msword'});
      element.href = URL.createObjectURL(file);
      element.download = 'cover-letter.doc';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 500);
  };

  return (
    <SidebarProvider defaultOpen={!window.matchMedia("(max-width: 768px)").matches}>
      <div className="flex h-screen w-full bg-gray-50">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <SidebarInset className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <TopBar />
          
          {/* Content Area */}
          <div className="flex-1 overflow-auto">
            <div className="p-6 max-w-5xl mx-auto">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 text-blue-600 h-8 w-8 rounded-full flex items-center justify-center mr-3">
                  <span className="text-lg">AI</span>
                </div>
                <h1 className="text-xl font-medium">AI Cover Letter Generator</h1>
                
                <Button variant="outline" size="sm" className="ml-auto flex items-center gap-2">
                  View History
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left column - Form */}
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="job-description" className="mb-1 block">
                      Job Description*
                    </Label>
                    <Textarea 
                      id="job-description" 
                      placeholder="Enter Job Description" 
                      className="min-h-[120px]"
                    />
                    <div className="mt-2">
                      <Button variant="outline" size="sm">
                        Import from Board
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="job-title" className="mb-1 block">
                      Job Title*
                    </Label>
                    <Input 
                      id="job-title"
                      placeholder="Enter Job Title" 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="company-name" className="mb-1 block">
                      Company Name
                    </Label>
                    <Input 
                      id="company-name"
                      placeholder="Enter Company Name" 
                    />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Your Profile*</h3>
                    
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id="resume-upload" 
                        name="profile-type" 
                        className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500" 
                        defaultChecked
                      />
                      <Label htmlFor="resume-upload">Resume Upload</Label>
                    </div>
                    
                    <div className="border rounded-md p-4 bg-white">
                      <p className="text-sm text-gray-700 mb-4">Upload your resume</p>
                      
                      <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center">
                        <div className="mx-auto flex justify-center mb-3">
                          <Upload className="h-8 w-8 text-blue-500" />
                        </div>
                        <p className="text-sm font-medium mb-2">Add your Resume</p>
                        <p className="text-xs text-gray-500 mb-3">File names cannot contain special characters and should be in either .doc, .docx, or .pdf</p>
                        <label htmlFor="file-upload">
                          <Button 
                            variant="outline" 
                            className="bg-blue-500 text-white border-0 hover:bg-blue-600"
                          >
                            Choose or Upload
                          </Button>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept=".doc,.docx,.pdf"
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-3">Template</h3>
                    <div className="border rounded-md p-4 bg-white flex items-center justify-between">
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="default-template" 
                          name="template" 
                          className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500" 
                          defaultChecked
                        />
                        <Label htmlFor="default-template" className="ml-2">Default</Label>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Preview</Button>
                        <Button variant="outline" size="sm">Change</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer py-2">
                        <h3 className="text-sm font-medium">Advanced Settings</h3>
                        <svg
                          className="h-5 w-5 text-gray-500 group-open:transform group-open:rotate-180"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M14.77 12.79a.75.75 0 01-1.06 0L10 9.06l-3.71 3.71a.75.75 0 01-1.06-1.06l4.25-4.25a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </summary>
                      <div className="pt-2 pb-4">
                        <div className="mb-4">
                          <Label htmlFor="context" className="mb-1 block">Additional Context</Label>
                          <Textarea 
                            id="context" 
                            placeholder="Enter any additional instructions or information as a prompt" 
                            className="min-h-[100px]"
                          />
                        </div>
                        
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-2">Tone</p>
                          <div className="flex flex-wrap gap-3">
                            {["Professional", "Casual", "Enthusiastic", "Informational", "Custom"].map(tone => (
                              <div key={tone} className="flex items-center">
                                <input
                                  type="radio"
                                  id={`tone-${tone.toLowerCase()}`}
                                  name="tone"
                                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                                  defaultChecked={tone === "Professional"}
                                />
                                <Label htmlFor={`tone-${tone.toLowerCase()}`} className="ml-2">{tone}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-2">Length</p>
                          <div className="flex gap-4">
                            {["Short", "Medium", "Long"].map(length => (
                              <div key={length} className="flex items-center">
                                <input
                                  type="radio"
                                  id={`length-${length.toLowerCase()}`}
                                  name="length"
                                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                                  defaultChecked={length === "Medium"}
                                />
                                <Label htmlFor={`length-${length.toLowerCase()}`} className="ml-2">{length}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="language" className="mb-1 block">Language</Label>
                          <select
                            id="language"
                            className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          >
                            <option>Select Language</option>
                            <option>English</option>
                            <option>Spanish</option>
                            <option>French</option>
                            <option>German</option>
                          </select>
                        </div>
                      </div>
                    </details>
                  </div>
                  
                  <div>
                    <Button 
                      className="w-full py-6 text-base bg-blue-600 hover:bg-blue-700"
                      onClick={handleGenerate}
                      disabled={isGenerating}
                    >
                      {isGenerating ? "Generating..." : "Generate"}
                    </Button>
                  </div>
                </div>
                
                {/* Right column - Results */}
                <div>
                  <Card className="bg-blue-50 h-full">
                    <div className="p-4 h-full flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium flex items-center">
                          Result
                        </h3>
                        
                        <div className="flex gap-2">
                          {generatedContent && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-1 text-blue-600 border-blue-600"
                                onClick={downloadAsPDF}
                              >
                                <Download size={16} />
                                PDF
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-1 text-blue-600 border-blue-600"
                                onClick={downloadAsDoc}
                              >
                                <FileText size={16} />
                                DOC
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="bg-white rounded-md border border-gray-200 p-4 flex-1 overflow-auto">
                        {generatedContent ? (
                          <pre className="whitespace-pre-wrap font-sans">{generatedContent}</pre>
                        ) : (
                          <p className="text-gray-500 flex items-center justify-center h-full">
                            Your AI generated content will show here
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default CoverLetterGenerator;
