import React, { useState, useRef } from "react";
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
import { generateCoverLetter } from "@/services/ai";
import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist";

// Set workerSrc for pdfjs to the local public path (Vite compatible)
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

// Utility: Remove placeholder lines from AI output
function removePlaceholders(text: string) {
  const placeholderPatterns = [
    /^\[.*?\]$/i, // Any line that is just [something]
    /^\[Your Name\]$/i,
    /^\[Your Address\]$/i,
    /^\[City, State, ZIP\]$/i,
    /^\[Your Email\]$/i,
    /^\[Your Phone Number\]$/i,
    /^\[Date\]$/i,
    /^\[Company Name\]$/i,
    /^\[Recipient Name\]$/i,
    /^\[Recipient Address\]$/i,
    /^\[Recipient Email\]$/i,
    /^\[Recipient Phone Number\]$/i,
    /^\[Hiring Manager\]$/i,
    /^\[.*?\]$/i, // catch-all for any other bracketed line
  ];
  return text
    .split("\n")
    .filter(
      (line) =>
        !placeholderPatterns.some((pattern) => pattern.test(line.trim()))
    )
    .join("\n")
    .replace(/\n{3,}/g, "\n\n"); // Remove extra blank lines
}

// Motivational messages for loading
const loadingMessages = [
  "Crafting a cover letter that stands out...",
  "Analyzing your achievements and matching them to the job...",
  "Highlighting your best skills for this opportunity...",
  "Personalizing your story for the perfect fit...",
  "AI is working its magic to impress the hiring manager...",
  "Almost there! Your tailored cover letter is on its way...",
];
function getRandomLoadingMessage() {
  return loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
}

const CoverLetterGenerator = () => {
  const [resume, setResume] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState<string>("");
  const [generatedContent, setGeneratedContent] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [prompt, setPrompt] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Helper: Parse resume file
  const parseResumeFile = async (file: File) => {
    if (file.type === "application/pdf") {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let text = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map((item: any) => item.str).join(" ") + "\n";
      }
      return text;
    } else if (
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.name.endsWith(".docx")
    ) {
      const arrayBuffer = await file.arrayBuffer();
      const { value } = await mammoth.extractRawText({ arrayBuffer });
      return value;
    } else {
      toast({
        title: "Unsupported file type",
        description: "Only PDF and DOCX files are supported.",
        variant: "destructive",
      });
      return "";
    }
  };

  // Handle file upload reliably
  const handleUploadButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setResume(file);
      const text = await parseResumeFile(file);
      setResumeText(text);
      localStorage.setItem("uploadedResumeText", text);
      console.log("[Resume Parsed Text]", text);
      toast({
        title: "Resume uploaded",
        description: "Resume parsed and ready for AI.",
      });
    }
  };

  // Generate cover letter using OpenAI
  const handleGenerate = async () => {
    if (!jobTitle.trim()) {
      toast({
        title: "Job Title required",
        description: "Please enter a job title.",
        variant: "destructive",
      });
      return;
    }
    setIsGenerating(true);
    setError(null);
    try {
      // Compose prompt: instruct AI to extract candidate info from resume and interviewer/company info from job description, and strictly avoid placeholders
      const aiPrompt = `You are an expert career coach and writer. Write a professional, personalized cover letter for the following job description, using the candidate's real resume information. Extract the candidate's name, address, email, and phone from the resume text below and use them in the cover letter header. Extract the interviewer/hiring manager/company details from the job description and use them in the recipient section. Do not use or include any placeholder fields, bracketed text, or template markers such as [Your Name], [Your Address], [City, State, ZIP], [Your Email], [Your Phone Number], or similar. Only use real information you extract from the resume and job description. If any information is missing, simply omit that line. Highlight the most relevant skills and experiences from the resume that match the job description. Make the letter engaging, achievement-focused, and tailored to the company and role.\n\nJob Description:\n${
        prompt || ""
      }\n\n[RESUME TEXT]\n${resumeText}\n[END RESUME TEXT]`;
      const coverLetter = await generateCoverLetter({
        jobTitle,
        companyName,
        skills,
        experience,
        prompt: aiPrompt,
      });
      const cleanedCoverLetter = removePlaceholders(coverLetter);
      setGeneratedContent(cleanedCoverLetter);
      localStorage.setItem("generatedCoverLetter", cleanedCoverLetter);
      toast({
        title: "Cover letter generated",
        description: "Your cover letter has been generated successfully.",
      });
    } catch (error: any) {
      setError(
        "Sorry, something went wrong while generating your cover letter. Please try again later."
      );
      toast({
        title: "Error",
        description:
          "Sorry, something went wrong while generating your cover letter. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadAsPDF = () => {
    if (!generatedContent) {
      toast({
        title: "No content to download",
        description: "Please generate a cover letter first.",
        variant: "destructive",
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
      const element = document.createElement("a");
      const file = new Blob([generatedContent], { type: "application/pdf" });
      element.href = URL.createObjectURL(file);
      element.download = "cover-letter.pdf";
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
        variant: "destructive",
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
      const element = document.createElement("a");
      const file = new Blob([generatedContent], { type: "application/msword" });
      element.href = URL.createObjectURL(file);
      element.download = "cover-letter.doc";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 500);
  };

  return (
    <SidebarProvider
      defaultOpen={!window.matchMedia("(max-width: 768px)").matches}
    >
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
                <h1 className="text-xl font-medium">
                  AI Cover Letter Generator
                </h1>

                <Button
                  variant="outline"
                  size="sm"
                  className="ml-auto flex items-center gap-2"
                >
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
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="company-name" className="mb-1 block">
                      Company Name
                    </Label>
                    <Input
                      id="company-name"
                      placeholder="Enter Company Name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
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
                      <p className="text-sm text-gray-700 mb-4">
                        Upload your resume
                      </p>

                      <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center">
                        <div className="mx-auto flex justify-center mb-3">
                          <Upload className="h-8 w-8 text-blue-500" />
                        </div>
                        <p className="text-sm font-medium mb-2">
                          Add your Resume
                        </p>
                        <p className="text-xs text-gray-500 mb-3">
                          File names cannot contain special characters and
                          should be in either .doc, .docx, or .pdf
                        </p>
                        <Button
                          variant="outline"
                          className="bg-blue-500 text-white border-0 hover:bg-blue-600"
                          type="button"
                          onClick={handleUploadButtonClick}
                        >
                          Choose or Upload
                        </Button>
                        {resume && (
                          <div
                            className="mt-2 text-xs text-gray-700 truncate"
                            title={resume.name}
                          >
                            Uploaded:{" "}
                            <span className="font-medium">{resume.name}</span>
                          </div>
                        )}
                        <input
                          ref={fileInputRef}
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept=".doc,.docx,.pdf"
                          onChange={handleFileChange}
                          tabIndex={-1}
                        />
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
                        <Label htmlFor="default-template" className="ml-2">
                          Default
                        </Label>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Preview
                        </Button>
                        <Button variant="outline" size="sm">
                          Change
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer py-2">
                        <h3 className="text-sm font-medium">
                          Advanced Settings
                        </h3>
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
                          <Label htmlFor="context" className="mb-1 block">
                            Additional Context
                          </Label>
                          <Textarea
                            id="context"
                            placeholder="Enter any additional instructions or information as a prompt"
                            className="min-h-[100px]"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                          />
                        </div>

                        <div className="mb-4">
                          <p className="text-sm font-medium mb-2">Tone</p>
                          <div className="flex flex-wrap gap-3">
                            {[
                              "Professional",
                              "Casual",
                              "Enthusiastic",
                              "Informational",
                              "Custom",
                            ].map((tone) => (
                              <div key={tone} className="flex items-center">
                                <input
                                  type="radio"
                                  id={`tone-${tone.toLowerCase()}`}
                                  name="tone"
                                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                                  defaultChecked={tone === "Professional"}
                                />
                                <Label
                                  htmlFor={`tone-${tone.toLowerCase()}`}
                                  className="ml-2"
                                >
                                  {tone}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm font-medium mb-2">Length</p>
                          <div className="flex gap-4">
                            {["Short", "Medium", "Long"].map((length) => (
                              <div key={length} className="flex items-center">
                                <input
                                  type="radio"
                                  id={`length-${length.toLowerCase()}`}
                                  name="length"
                                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                                  defaultChecked={length === "Medium"}
                                />
                                <Label
                                  htmlFor={`length-${length.toLowerCase()}`}
                                  className="ml-2"
                                >
                                  {length}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="language" className="mb-1 block">
                            Language
                          </Label>
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
                      {isGenerating ? (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                          <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg px-8 py-8 min-w-[280px]">
                            <svg
                              className="animate-spin h-10 w-10 text-blue-500 mb-4"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8z"
                              />
                            </svg>
                            <h2 className="text-lg font-semibold text-blue-700 mb-2">
                              Generating your cover letter...
                            </h2>
                            <p className="text-gray-500 text-center text-sm">
                              This may take a few moments. Please stay on this
                              page.
                            </p>
                          </div>
                        </div>
                      ) : (
                        "Generate"
                      )}
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
                          <pre className="whitespace-pre-wrap font-sans">
                            {generatedContent}
                          </pre>
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
      {/* Error Overlay */}
      {error && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg px-8 py-8 min-w-[280px]">
            <svg
              className="h-10 w-10 text-red-500 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <h2 className="text-lg font-semibold text-red-700 mb-2">Error</h2>
            <p className="text-gray-500 text-center text-sm mb-4">{error}</p>
            <button
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => setError(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </SidebarProvider>
  );
};

export default CoverLetterGenerator;
