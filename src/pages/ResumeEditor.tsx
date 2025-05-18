import { useState, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { ArrowLeft, Download, BarChart, CheckCircle, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import ResumeTemplates from "@/components/ResumeTemplates";
import { 
  CareerFocusTemplate, 
  ModernTemplate, 
  CompactTemplate, 
  ProfessionalTemplate 
} from "@/components/ResumeTemplateStyles";
import { downloadResumePDF } from "@/utils/resumeDownload";
import type { ResumeData } from "@/components/ResumeTemplateStyles";

const ResumeEditor = () => {
  const navigate = useNavigate();
  const [atsScore, setAtsScore] = useState(92);
  const [activeTab, setActiveTab] = useState("edit");
  const resumeRef = useRef<HTMLDivElement>(null);
  
  // Template state
  const [selectedTemplate, setSelectedTemplate] = useState("career-focus");
  
  const templates = [
    {
      id: "career-focus",
      name: "Career Focus",
      description: "Clean and professional design with emphasis on career history.",
    },
    {
      id: "modern",
      name: "Modern",
      description: "Contemporary layout with a bold header and focused sections.",
    },
    {
      id: "compact",
      name: "Compact",
      description: "Space-efficient design that fits more content on a single page.",
    },
    {
      id: "professional",
      name: "Professional",
      description: "Traditional resume format with a formal, elegant appearance.",
    }
  ];

  // State for all resume sections
  const [personalInfo, setPersonalInfo] = useState({
    name: "Avinash Abhi",
    title: "Digital Marketing Manager",
    email: "example@gmail.com",
    location: "India",
    phone: "+91 9123456789"
  });

  const [summary, setSummary] = useState(
    "Strategic Digital Marketing Manager with 7 years of experience driving impactful campaigns across e-commerce and B2B industries. Proven track record of exceeding KPIs, with expertise in SEO, SEM, and social media strategies. Skilled in data analysis and conversion optimization."
  );

  const [workExperience, setWorkExperience] = useState([
    {
      id: "work1",
      title: "Digital Marketing Manager",
      company: "Company ABC",
      location: "New Delhi, India",
      startDate: "May 2021",
      endDate: "Mar 2023",
      description: "• Developed digital marketing strategies across SEO, SEM, PPC, and social media channels\n• Managed a marketing budget of approximately $75,000\n• Collaborated with product and sales teams to design marketing campaigns"
    },
    {
      id: "work2",
      title: "Digital Marketing Specialist",
      company: "Company XYZ",
      location: "Bangalore, India",
      startDate: "Jun 2018",
      endDate: "Apr 2021",
      description: "• Created SEO and SEM campaigns that increased website traffic\n• Implemented content marketing strategies including blog posts"
    }
  ]);

  const [education, setEducation] = useState([
    {
      id: "edu1",
      degree: "Master of Business Administration",
      institution: "University XYZ",
      location: "Mumbai, India",
      startDate: "Aug 2016",
      endDate: "May 2018",
      description: ""
    }
  ]);

  const [certifications, setCertifications] = useState([
    {
      id: "cert1",
      name: "Google Analytics Certification",
      issuer: "Google",
      date: "Jan 2022",
      description: ""
    }
  ]);

  const [skills, setSkills] = useState([
    { id: "skill1", name: "Google Analytics", proficiency: "Expert" },
    { id: "skill2", name: "SEMrush", proficiency: "Advanced" },
    { id: "skill3", name: "Content Strategy", proficiency: "Expert" },
    { id: "skill4", name: "Email Marketing", proficiency: "Advanced" },
    { id: "skill5", name: "Social Media Management", proficiency: "Expert" }
  ]);

  const [projects, setProjects] = useState([
    {
      id: "proj1",
      title: "E-commerce Website Redesign",
      description: "Led the redesign of the company's e-commerce platform",
      technologies: "SEO, UX Design, Content Strategy"
    }
  ]);

  const [publications, setPublications] = useState([
    {
      id: "pub1",
      title: "Digital Marketing Trends 2023",
      publisher: "Marketing Journal",
      date: "Feb 2023",
      description: "An analysis of emerging digital marketing trends"
    }
  ]);

  const [awards, setAwards] = useState([
    {
      id: "award1",
      title: "Best Digital Campaign",
      issuer: "Marketing Excellence Awards",
      date: "Nov 2022",
      description: "Recognized for outstanding performance in digital marketing"
    }
  ]);

  const [volunteerExperience, setVolunteerExperience] = useState([
    {
      id: "vol1",
      role: "Digital Marketing Mentor",
      organization: "Youth Marketing Association",
      location: "Virtual",
      startDate: "Jan 2022",
      endDate: "Present",
      description: "Mentoring young professionals in digital marketing skills"
    }
  ]);

  const [languages, setLanguages] = useState([
    { id: "lang1", language: "English", proficiency: "Native" },
    { id: "lang2", language: "Hindi", proficiency: "Native" },
    { id: "lang3", language: "Spanish", proficiency: "Basic" }
  ]);

  const [socialLinks, setSocialLinks] = useState([
    { id: "social1", platform: "LinkedIn", url: "https://linkedin.com/in/username" },
    { id: "social2", platform: "Twitter", url: "https://twitter.com/username" }
  ]);

  // Helper to add new items to array state
  const addItemToSection = (section, setSection, template) => {
    setSection([...section, { ...template, id: `${section[0].id.split('1')[0]}${section.length + 1}` }]);
  };

  // Helper to update items in array state
  const updateItemInSection = (section, setSection, id, field, value) => {
    setSection(section.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  // Helper to remove items from array state
  const removeItemFromSection = (section, setSection, id) => {
    setSection(section.filter(item => item.id !== id));
  };

  // Combine all resume data for the templates
  const resumeData: ResumeData = {
    personalInfo,
    summary,
    workExperience,
    education,
    certifications,
    skills,
    projects,
    publications,
    awards,
    volunteerExperience,
    languages,
    socialLinks
  };

  // Handle resume download
  const handleDownloadResume = async () => {
    try {
      const fileName = await downloadResumePDF(resumeRef, resumeData);
      if (fileName) {
        toast({
          title: "Resume Downloaded!",
          description: `Your resume has been saved as ${fileName}`,
        });
      }
    } catch (error) {
      console.error("Error downloading resume:", error);
      toast({
        title: "Download Failed",
        description: "There was an error downloading your resume. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Render template based on selection
  const renderSelectedTemplate = () => {
    switch(selectedTemplate) {
      case "modern":
        return <ModernTemplate data={resumeData} />;
      case "compact":
        return <CompactTemplate data={resumeData} />;
      case "professional":
        return <ProfessionalTemplate data={resumeData} />;
      case "career-focus":
      default:
        return <CareerFocusTemplate data={resumeData} />;
    }
  };

  return (
    <SidebarProvider defaultOpen={!window.matchMedia("(max-width: 768px)").matches}>
      <div className="flex h-screen w-full bg-gray-50">
        <Sidebar />
        <SidebarInset className="flex-1 flex flex-col overflow-hidden">
          <TopBar />
          <div className="border-b border-gray-200 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center space-x-6 h-14">
                <Tabs defaultValue="edit" className="w-full" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-4">
                    <TabsTrigger value="edit" className="flex items-center gap-1.5">
                      <span>Edit</span>
                    </TabsTrigger>
                    <TabsTrigger value="design" className="flex items-center gap-1.5">
                      <span>Design</span>
                    </TabsTrigger>
                    <TabsTrigger value="analyze" className="flex items-center gap-1.5">
                      <BarChart className="h-4 w-4" />
                      <span>ATS Analysis</span>
                    </TabsTrigger>
                    <TabsTrigger value="match" className="flex items-center gap-1.5">
                      <CheckCircle className="h-4 w-4" />
                      <span>Skill Match</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-auto scrollbar-improved">
            <main className="p-4 md:p-6 max-w-7xl mx-auto w-full">
              {/* Header with back button */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => navigate("/resume-builder")}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </Button>
                  <h1 className="text-xl font-semibold">Resume Editor</h1>
                </div>
                <Button 
                  className="flex items-center gap-2"
                  onClick={handleDownloadResume}
                >
                  <Download className="h-4 w-4" />
                  <span>Download Resume</span>
                </Button>
              </div>

              {/* Main content with editor and preview */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Left sidebar with editing options */}
                {activeTab === "edit" && (
                  <div className="lg:col-span-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="font-semibold">ATS Score</h2>
                        <span className="text-sm font-medium text-blue-600">{atsScore}%</span>
                      </div>
                      <Progress value={atsScore} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">Your resume is highly optimized for ATS systems</p>
                    </div>

                    {/* Sections to edit */}
                    <div className="space-y-2">
                      <Accordion type="single" collapsible className="w-full">
                        {/* Personal Information Section */}
                        <AccordionItem value="personal-info">
                          <AccordionTrigger className="hover:bg-gray-50 px-3 py-2 rounded-lg">
                            <span>Personal Information</span>
                          </AccordionTrigger>
                          <AccordionContent className="px-4">
                            <div className="space-y-3">
                              <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-1">Full Name</Label>
                                <Input 
                                  value={personalInfo.name}
                                  onChange={(e) => setPersonalInfo({...personalInfo, name: e.target.value})}
                                  className="w-full p-2 text-sm"
                                />
                              </div>
                              <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-1">Job Title</Label>
                                <Input 
                                  value={personalInfo.title}
                                  onChange={(e) => setPersonalInfo({...personalInfo, title: e.target.value})}
                                  className="w-full p-2 text-sm"
                                />
                              </div>
                              <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-1">Email</Label>
                                <Input 
                                  type="email"
                                  value={personalInfo.email}
                                  onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                                  className="w-full p-2 text-sm"
                                />
                              </div>
                              <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-1">Location</Label>
                                <Input 
                                  value={personalInfo.location}
                                  onChange={(e) => setPersonalInfo({...personalInfo, location: e.target.value})}
                                  className="w-full p-2 text-sm"
                                />
                              </div>
                              <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-1">Phone</Label>
                                <Input 
                                  type="tel"
                                  value={personalInfo.phone}
                                  onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                                  className="w-full p-2 text-sm"
                                />
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Professional Summary Section */}
                        <AccordionItem value="summary">
                          <AccordionTrigger className="hover:bg-gray-50 px-3 py-2 rounded-lg">
                            <span>Professional Summary</span>
                          </AccordionTrigger>
                          <AccordionContent className="px-4">
                            <div className="space-y-3">
                              <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-1">Summary</Label>
                                <Textarea 
                                  value={summary}
                                  onChange={(e) => setSummary(e.target.value)}
                                  className="w-full p-2 text-sm min-h-[120px]"
                                />
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Work Experience Section */}
                        <AccordionItem value="work">
                          <AccordionTrigger className="hover:bg-gray-50 px-3 py-2 rounded-lg">
                            <span>Work Experience</span>
                          </AccordionTrigger>
                          <AccordionContent className="px-4">
                            {workExperience.map((job, index) => (
                              <div key={job.id} className="mb-6 border border-gray-100 rounded-lg p-4 relative">
                                {index > 0 && (
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                                    onClick={() => removeItemFromSection(workExperience, setWorkExperience, job.id)}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                )}
                                <div className="space-y-3">
                                  <div>
                                    <Label className="block text-sm font-medium text-gray-700 mb-1">Job Title</Label>
                                    <Input 
                                      value={job.title}
                                      onChange={(e) => updateItemInSection(workExperience, setWorkExperience, job.id, 'title', e.target.value)}
                                      className="w-full p-2 text-sm"
                                    />
                                  </div>
                                  <div>
                                    <Label className="block text-sm font-medium text-gray-700 mb-1">Company</Label>
                                    <Input 
                                      value={job.company}
                                      onChange={(e) => updateItemInSection(workExperience, setWorkExperience, job.id, 'company', e.target.value)}
                                      className="w-full p-2 text-sm"
                                    />
                                  </div>
                                  <div>
                                    <Label className="block text-sm font-medium text-gray-700 mb-1">Location</Label>
                                    <Input 
                                      value={job.location}
                                      onChange={(e) => updateItemInSection(workExperience, setWorkExperience, job.id, 'location', e.target.value)}
                                      className="w-full p-2 text-sm"
                                    />
                                  </div>
                                  <div className="grid grid-cols-2 gap-3">
                                    <div>
                                      <Label className="block text-sm font-medium text-gray-700 mb-1">Start Date</Label>
                                      <Input 
                                        value={job.startDate}
                                        onChange={(e) => updateItemInSection(workExperience, setWorkExperience, job.id, 'startDate', e.target.value)}
                                        className="w-full p-2 text-sm"
                                      />
                                    </div>
                                    <div>
                                      <Label className="block text-sm font-medium text-gray-700 mb-1">End Date</Label>
                                      <Input 
                                        value={job.endDate}
                                        onChange={(e) => updateItemInSection(workExperience, setWorkExperience, job.id, 'endDate', e.target.value)}
                                        className="w-full p-2 text-sm"
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <Label className="block text-sm font-medium text-gray-700 mb-1">Description</Label>
                                    <Textarea 
                                      value={job.description}
                                      onChange={(e) => updateItemInSection(workExperience, setWorkExperience, job.id, 'description', e.target.value)}
                                      className="w-full p-2 text-sm min-h-[100px]"
                                      placeholder="• List your achievements and responsibilities"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full mt-2 flex items-center justify-center gap-1"
                              onClick={() => addItemToSection(workExperience, setWorkExperience, {
                                id: "",
                                title: "",
                                company: "",
                                location: "",
                                startDate: "",
                                endDate: "",
                                description: ""
                              })}
                            >
                              <Plus className="h-4 w-4" />
                              <span>Add Another Position</span>
                            </Button>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Education Section */}
                        <AccordionItem value="education">
                          <AccordionTrigger className="hover:bg-gray-50 px-3 py-2 rounded-lg">
                            <span>Education</span>
                          </AccordionTrigger>
                          <AccordionContent className="px-4">
                            {education.map((edu, index) => (
                              <div key={edu.id} className="mb-6 border border-gray-100 rounded-lg p-4 relative">
                                {index > 0 && (
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                                    onClick={() => removeItemFromSection(education, setEducation, edu.id)}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                )}
                                <div className="space-y-3">
                                  <div>
                                    <Label className="block text-sm font-medium text-gray-700 mb-1">Degree</Label>
                                    <Input 
                                      value={edu.degree}
                                      onChange={(e) => updateItemInSection(education, setEducation, edu.id, 'degree', e.target.value)}
                                      className="w-full p-2 text-sm"
                                    />
                                  </div>
                                  <div>
                                    <Label className="block text-sm font-medium text-gray-700 mb-1">Institution</Label>
                                    <Input 
                                      value={edu.institution}
                                      onChange={(e) => updateItemInSection(education, setEducation, edu.id, 'institution', e.target.value)}
                                      className="w-full p-2 text-sm"
                                    />
                                  </div>
                                  <div>
                                    <Label className="block text-sm font-medium text-gray-700 mb-1">Location</Label>
                                    <Input 
                                      value={edu.location}
                                      onChange={(e) => updateItemInSection(education, setEducation, edu.id, 'location', e.target.value)}
                                      className="w-full p-2 text-sm"
                                    />
                                  </div>
                                  <div className="grid grid-cols-2 gap-3">
                                    <div>
                                      <Label className="block text-sm font-medium text-gray-700 mb-1">Start Date</Label>
                                      <Input 
                                        value={edu.startDate}
                                        onChange={(e) => updateItemInSection(education, setEducation, edu.id, 'startDate', e.target.value)}
                                        className="w-full p-2 text-sm"
                                      />
                                    </div>
                                    <div>
                                      <Label className="block text-sm font-medium text-gray-700 mb-1">End Date</Label>
                                      <Input 
                                        value={edu.endDate}
                                        onChange={(e) => updateItemInSection(education, setEducation, edu.id, 'endDate', e.target.value)}
                                        className="w-full p-2 text-sm"
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <Label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</Label>
                                    <Textarea 
                                      value={edu.description}
                                      onChange={(e) => updateItemInSection(education, setEducation, edu.id, 'description', e.target.value)}
                                      className="w-full p-2 text-sm min-h-[80px]"
                                      placeholder="Achievements, GPA, relevant coursework, etc."
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full mt-2 flex items-center justify-center gap-1"
                              onClick={() => addItemToSection(education, setEducation, {
                                id: "",
                                degree: "",
                                institution: "",
                                location: "",
                                startDate: "",
                                endDate: "",
                                description: ""
                              })}
                            >
                              <Plus className="h-4 w-4" />
                              <span>Add Another Education</span>
                            </Button>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Certifications Section */}
                        <AccordionItem value="certifications">
                          <AccordionTrigger className="hover:bg-gray-50 px-3 py-2 rounded-lg">
                            <span>Certifications</span>
                          </AccordionTrigger>
                          <AccordionContent className="px-4">
                            {certifications.map((cert, index) => (
                              <div key={cert.id} className="mb-6 border border-gray-100 rounded-lg p-4 relative">
                                {index > 0 && (
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                                    onClick={() => removeItemFromSection(certifications, setCertifications, cert.id)}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                )}
                                <div className="space-y-3">
                                  <div>
                                    <Label className="block text-sm font-medium text-gray-700 mb-1">Certification Name</Label>
                                    <Input 
                                      value={cert.name}
                                      onChange={(e) => updateItemInSection(certifications, setCertifications, cert.id, 'name', e.target.value)}
                                      className="w-full p-2 text-sm"
                                    />
                                  </div>
                                  <div>
                                    <Label className="block text-sm font-medium text-gray-700 mb-1">Issuing Organization</Label>
                                    <Input 
                                      value={cert.issuer}
                                      onChange={(e) => updateItemInSection(certifications, setCertifications, cert.id, 'issuer', e.target.value)}
                                      className="w-full p-2 text-sm"
                                    />
                                  </div>
                                  <div>
                                    <Label className="block text-sm font-medium text-gray-700 mb-1">Date</Label>
                                    <Input 
                                      value={cert.date}
                                      onChange={(e) => updateItemInSection(certifications, setCertifications, cert.id, 'date', e.target.value)}
                                      className="w-full p-2 text-sm"
                                    />
                                  </div>
                                  <div>
                                    <Label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</Label>
                                    <Textarea 
                                      value={cert.description}
                                      onChange={(e) => updateItemInSection(certifications, setCertifications, cert.id, 'description', e.target.value)}
                                      className="w-full p-2 text-sm"
                                      placeholder="Brief description of the certification"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full mt-2 flex items-center justify-center gap-1"
                              onClick={() => addItemToSection(certifications, setCertifications, {
                                id: "",
                                name: "",
                                issuer: "",
                                date: "",
                                description: ""
                              })}
                            >
                              <Plus className="h-4 w-4" />
                              <span>Add Another Certification</span>
                            </Button>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Skills Section */}
                        <AccordionItem value="skills">
                          <AccordionTrigger className="hover:bg-gray-50 px-3 py-2 rounded-lg">
                            <span>Skills</span>
                          </AccordionTrigger>
                          <AccordionContent className="px-4">
                            {skills.map((skill, index) => (
                              <div key={skill.id} className="mb-3 flex items-center gap-3 relative group">
                                <div className="flex-1">
                                  <Input 
                                    value={skill.name}
                                    onChange={(e) => updateItemInSection(skills, setSkills, skill.id, 'name', e.target.value)}
                                    className="w-full p-2 text-sm"
                                    placeholder="Skill name"
                                  />
                                </div>
                                <div className="w-1/3">
                                  <Input 
                                    value={skill.proficiency}
                                    onChange={(e) => updateItemInSection(skills, setSkills, skill.id, 'proficiency', e.target.value)}
                                    className="w-full p-2 text-sm"
                                    placeholder="Proficiency"
                                  />
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100"
                                  onClick={() => removeItemFromSection(skills, setSkills, skill.id)}
                                >
                                  <Trash className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            ))}
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full mt-2 flex items-center justify-center gap-1"
                              onClick={() => addItemToSection(skills, setSkills, {
                                id: "",
                                name: "",
                                proficiency: ""
                              })}
                            >
                              <Plus className="h-4 w-4" />
                              <span>Add Another Skill</span>
                            </Button>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Projects Section */}
                        <AccordionItem value="projects">
                          <AccordionTrigger className="hover:bg-gray-50 px-3 py-2 rounded-lg">
                            <span>Projects</span>
                          </AccordionTrigger>
                          <AccordionContent className="px-4">
                            {projects.map((project, index) => (
                              <div key={project.id} className="mb-6 border border-gray-100 rounded-lg p-4 relative">
                                {index > 0 && (
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                                    onClick={() => removeItemFromSection(projects, setProjects, project.id)}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                )}
                                <div className="space-y-3">
                                  <div>
                                    <Label className="block text-sm font-medium text-gray-700 mb-1">Project Title</Label>
                                    <Input 
                                      value={project.title}
                                      onChange={(e) => updateItemInSection(projects, setProjects, project.id, 'title', e.target.value)}
                                      className="w-full p-2 text-sm"
                                    />
                                  </div>
                                  <div>
                                    <Label className="block text-sm font-medium text-gray-700 mb-1">Description</Label>
                                    <Textarea 
                                      value={project.description}
                                      onChange={(e) => updateItemInSection(projects, setProjects, project.id, 'description', e.target.value)}
                                      className="w-full p-2 text-sm min-h-[80px]"
                                    />
                                  </div>
                                  <div>
                                    <Label className="block text-sm font-medium text-gray-700 mb-1">Technologies Used</Label>
                                    <Input 
                                      value={project.technologies}
                                      onChange={(e) => updateItemInSection(projects, setProjects, project.id, 'technologies', e.target.value)}
                                      className="w-full p-2 text-sm"
                                      placeholder="Separate with commas"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full mt-2 flex items-center justify-center gap-1"
                              onClick={() => addItemToSection(projects, setProjects, {
                                id: "",
                                title: "",
                                description: "",
                                technologies: ""
                              })}
                            >
                              <Plus className="h-4 w-4" />
                              <span>Add Another Project</span>
                            </Button>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Publications Section */}
                        <AccordionItem value="publications">
                          <AccordionTrigger className="hover:bg-gray-50 px-3 py-2 rounded-lg">
                            <span>Publications</span>
                          </AccordionTrigger>
                          <AccordionContent className="px-4">
                            {publications.map((publication, index) => (
                              <div key={publication.id} className="mb-6 border border-gray-100 rounded-lg p-4 relative">
                                {index > 0 && (
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                                    onClick={() => removeItemFromSection(publications, setPublications, publication.id)}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                )}
                                <div className="space-y-3">
                                  <div>
                                    <Label className="block text-sm font-medium text-gray-700 mb-1">Title</Label>
                                    <Input 
                                      value={publication.title}
                                      onChange={(e) => updateItemInSection(publications, setPublications, publication.id, 'title', e.target.value)}
                                      className="w-full p-2 text-sm"
                                    />
                                  </div>
                                  <div>
                                    <Label className="block text-sm font-medium text-gray-700 mb-1">Publisher</Label>
                                    <Input 
                                      value={publication.publisher}
                                      onChange={(e) => updateItemInSection(publications, setPublications, publication.id, 'publisher', e.target.value)}
                                      className="w-full p-2 text-sm"
                                    />
                                  </div>
                                  <div>
                                    <Label className="block text-sm font-medium text-gray-700 mb-1">Date</Label>
                                    <Input 
                                      value={publication.date}
                                      onChange={(e) => updateItemInSection(publications, setPublications, publication.id, 'date', e.target.value)}
                                      className="w-full p-2 text-sm"
                                    />
                                  </div>
                                  <div>
                                    <Label className="block text-sm font-medium text-gray-700 mb-1">Description</Label>
                                    <Textarea 
                                      value={publication.description}
                                      onChange={(e) => updateItemInSection(publications, setPublications, publication.id, 'description', e.target.value)}
                                      className="w-full p-2 text-sm min-h-[80px]"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full mt-2 flex items-center justify-center gap-1"
                              onClick={() => addItemToSection(publications, setPublications, {
                                id: "",
                                title: "",
                                publisher: "",
                                date: "",
                                description: ""
                              })}
                            >
                              <Plus className="h-4 w-4" />
                              <span>Add Another Publication</span>
                            </Button>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Awards Section */}
                        <AccordionItem value="awards">
                          <AccordionTrigger className="hover:bg-gray-50 px-3 py-2 rounded-lg">
                            <span>Awards</span>
                          </AccordionTrigger>
                          <AccordionContent className="px-4">
                            {awards.map((award, index) => (
                              <div key={award.id} className="mb-6 border border-gray-100 rounded-lg p-4 relative">
                                {index > 0 && (
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                                    onClick={() => removeItemFromSection(awards, setAwards, award.id)}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                )}
                                <div className="space-y-3">
                                  <div>
                                    <Label className="block text-sm font-medium text-gray-700 mb-1">Award Title</Label>
                                    <Input 
                                      value={award.title}
                                      onChange={(e) => updateItemInSection(awards, setAwards, award.id, 'title', e.target.value)}
                                      className="w-full p-2 text-sm"
                                    />
                                  </div>
                                  <div>
                                    <Label className="block text-sm font-medium text-gray-700 mb-1">Issuer</Label>
                                    <Input 
                                      value={award.issuer}
                                      onChange={(e) => updateItemInSection(awards, setAwards, award.id, 'issuer', e.target.value)}
                                      className="w-full p-2 text-sm"
                                    />
                                  </div>
                                  <div>
                                    <Label className="block text-sm font-medium text-gray-700 mb-1">Date</Label>
                                    <Input 
                                      value={award.date}
                                      onChange={(e) => updateItemInSection(awards, setAwards, award.id, 'date', e.target.value)}
                                      className="w-full p-2 text-sm"
                                    />
                                  </div>
                                  <div>
                                    <Label className="block text-sm font-medium text-gray-700 mb-1">Description</Label>
                                    <Textarea 
                                      value={award.description}
                                      onChange={(e) => updateItemInSection(awards, setAwards, award.id, 'description', e.target.value)}
                                      className="w-full p-2 text-sm min-h-[80px]"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full mt-2 flex items-center justify-center gap-1"
                              onClick={() => addItemToSection(awards, setAwards, {
                                id: "",
                                title: "",
                                issuer: "",
                                date: "",
                                description: ""
                              })}
                            >
                              <Plus className="h-4 w-4" />
                              <span>Add Another Award</span>
                            </Button>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Volunteer Experience Section */}
                        <AccordionItem value="volunteer">
                          <AccordionTrigger className="hover:bg-gray-50 px-3 py-2 rounded-lg">
                            <span>Volunteer Experience</span>
                          </AccordionTrigger>
                          <AccordionContent className="px-4">
                            {volunteerExperience.map((vol, index) => (
                              <div key={vol.id} className="mb-6 border border-gray-100 rounded-lg p-4 relative">
                                {index > 0 && (
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                                    onClick={() => removeItemFromSection(volunteerExperience, setVolunteerExperience, vol.id)}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                )}
                                <div className="space-y-3">
                                  <div>
                                    <Label className="block text-sm font-medium text-gray-700 mb-1">Role</Label>
                                    <Input 
                                      value={vol.role}
                                      onChange={(e) => updateItemInSection(volunteerExperience, setVolunteerExperience, vol.id, 'role', e.target.value)}
                                      className="w-full p-2 text-sm"
                                    />
                                  </div>
                                  <div>
                                    <Label className="block text-sm font-medium text-gray-700 mb-1">Organization</Label>
                                    <Input 
                                      value={vol.organization}
                                      onChange={(e) => updateItemInSection(volunteerExperience, setVolunteerExperience, vol.id, 'organization', e.target.value)}
                                      className="w-full p-2 text-sm"
                                    />
                                  </div>
                                  <div>
                                    <Label className="block text-sm font-medium text-gray-700 mb-1">Location</Label>
                                    <Input 
                                      value={vol.location}
                                      onChange={(e) => updateItemInSection(volunteerExperience, setVolunteerExperience, vol.id, 'location', e.target.value)}
                                      className="w-full p-2 text-sm"
                                    />
                                  </div>
                                  <div className="grid grid-cols-2 gap-3">
                                    <div>
                                      <Label className="block text-sm font-medium text-gray-700 mb-1">Start Date</Label>
                                      <Input 
                                        value={vol.startDate}
                                        onChange={(e) => updateItemInSection(volunteerExperience, setVolunteerExperience, vol.id, 'startDate', e.target.value)}
                                        className="w-full p-2 text-sm"
                                      />
                                    </div>
                                    <div>
                                      <Label className="block text-sm font-medium text-gray-700 mb-1">End Date</Label>
                                      <Input 
                                        value={vol.endDate}
                                        onChange={(e) => updateItemInSection(volunteerExperience, setVolunteerExperience, vol.id, 'endDate', e.target.value)}
                                        className="w-full p-2 text-sm"
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <Label className="block text-sm font-medium text-gray-700 mb-1">Description</Label>
                                    <Textarea 
                                      value={vol.description}
                                      onChange={(e) => updateItemInSection(volunteerExperience, setVolunteerExperience, vol.id, 'description', e.target.value)}
                                      className="w-full p-2 text-sm min-h-[80px]"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full mt-2 flex items-center justify-center gap-1"
                              onClick={() => addItemToSection(volunteerExperience, setVolunteerExperience, {
                                id: "",
                                role: "",
                                organization: "",
                                location: "",
                                startDate: "",
                                endDate: "",
                                description: ""
                              })}
                            >
                              <Plus className="h-4 w-4" />
                              <span>Add Another Volunteer Experience</span>
                            </Button>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Languages Section */}
                        <AccordionItem value="languages">
                          <AccordionTrigger className="hover:bg-gray-50 px-3 py-2 rounded-lg">
                            <span>Languages</span>
                          </AccordionTrigger>
                          <AccordionContent className="px-4">
                            {languages.map((lang, index) => (
                              <div key={lang.id} className="mb-3 flex items-center gap-3 relative group">
                                <div className="flex-1">
                                  <Input 
                                    value={lang.language}
                                    onChange={(e) => updateItemInSection(languages, setLanguages, lang.id, 'language', e.target.value)}
                                    className="w-full p-2 text-sm"
                                    placeholder="Language"
                                  />
                                </div>
                                <div className="w-1/3">
                                  <Input 
                                    value={lang.proficiency}
                                    onChange={(e) => updateItemInSection(languages, setLanguages, lang.id, 'proficiency', e.target.value)}
                                    className="w-full p-2 text-sm"
                                    placeholder="Proficiency"
                                  />
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100"
                                  onClick={() => removeItemFromSection(languages, setLanguages, lang.id)}
                                >
                                  <Trash className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            ))}
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full mt-2 flex items-center justify-center gap-1"
                              onClick={() => addItemToSection(languages, setLanguages, {
                                id: "",
                                language: "",
                                proficiency: ""
                              })}
                            >
                              <Plus className="h-4 w-4" />
                              <span>Add Another Language</span>
                            </Button>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Social Links Section */}
                        <AccordionItem value="social-links">
                          <AccordionTrigger className="hover:bg-gray-50 px-3 py-2 rounded-lg">
                            <span>Social Links</span>
                          </AccordionTrigger>
                          <AccordionContent className="px-4">
                            {socialLinks.map((link, index) => (
                              <div key={link.id} className="mb-3 flex items-center gap-3 relative group">
                                <div className="w-1/3">
                                  <Input 
                                    value={link.platform}
                                    onChange={(e) => updateItemInSection(socialLinks, setSocialLinks, link.id, 'platform', e.target.value)}
                                    className="w-full p-2 text-sm"
                                    placeholder="Platform"
                                  />
                                </div>
                                <div className="flex-1">
                                  <Input 
                                    value={link.url}
                                    onChange={(e) => updateItemInSection(socialLinks, setSocialLinks, link.id, 'url', e.target.value)}
                                    className="w-full p-2 text-sm"
                                    placeholder="URL"
                                  />
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100"
                                  onClick={() => removeItemFromSection(socialLinks, setSocialLinks, link.id)}
                                >
                                  <Trash className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            ))}
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full mt-2 flex items-center justify-center gap-1"
                              onClick={() => addItemToSection(socialLinks, setSocialLinks, {
                                id: "",
                                platform: "",
                                url: ""
                              })}
                            >
                              <Plus className="h-4 w-4" />
                              <span>Add Another Link</span>
                            </Button>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                )}

                {/* Design tab with template selection */}
                {activeTab === "design" && (
                  <div className="lg:col-span-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <ResumeTemplates 
                      templates={templates} 
                      selectedTemplate={selectedTemplate}
                      onSelectTemplate={setSelectedTemplate}
                    />
                  </div>
                )}

                {/* Right side with resume preview */}
                <div className={`${activeTab === "edit" || activeTab === "design" ? "lg:col-span-3" : "col-span-5"} bg-white p-0 rounded-lg border border-gray-200 shadow-sm min-h-[800px]`}>
                  <div ref={resumeRef} className="w-full h-full">
                    {renderSelectedTemplate()}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default ResumeEditor;
