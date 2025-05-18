
import { useState } from "react";
import { FileText, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Documents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const handleAddDocument = () => {
    console.log("Add document clicked");
    // Future implementation: Document upload functionality
  };

  return (
    <SidebarProvider defaultOpen={!window.matchMedia("(max-width: 768px)").matches}>
      <div className="flex h-screen w-full bg-gray-50">
        <Sidebar />
        <SidebarInset className="flex-1 flex flex-col overflow-hidden">
          <TopBar />
          <div className="flex-1 overflow-auto scrollbar-improved">
            <main className="p-4 md:p-6 max-w-7xl mx-auto w-full">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <FileText className="h-6 w-6 mr-2 text-gray-600" />
                  <h1 className="text-2xl font-semibold">Documents</h1>
                </div>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                  onClick={handleAddDocument}
                >
                  <Plus size={16} />
                  <span>Add document</span>
                </Button>
              </div>
              
              {/* Tabs */}
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
                <TabsList className="grid grid-cols-3 w-full max-w-md">
                  <TabsTrigger value="all" className="text-sm">All Documents</TabsTrigger>
                  <TabsTrigger value="careerflow" className="text-sm">Careerflow Documents</TabsTrigger>
                  <TabsTrigger value="imported" className="text-sm">Imported Documents</TabsTrigger>
                </TabsList>
              </Tabs>
              
              {/* Search and Filter */}
              <div className="flex flex-col gap-4 mb-8 sm:flex-row">
                <div className="relative flex-grow">
                  <Input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 h-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                <div className="flex gap-4">
                  <select className="px-4 py-2 bg-white border rounded-md text-sm w-full sm:w-40">
                    <option value="">Category</option>
                    <option value="resume">Resume</option>
                    <option value="cover-letter">Cover Letter</option>
                    <option value="other">Other</option>
                  </select>
                  <select className="px-4 py-2 bg-white border rounded-md text-sm w-full sm:w-40">
                    <option value="">Type</option>
                    <option value="pdf">PDF</option>
                    <option value="doc">DOC</option>
                    <option value="txt">TXT</option>
                  </select>
                </div>
              </div>
              
              {/* Empty State */}
              <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
                <div className="h-24 w-24 bg-blue-50 rounded-full flex items-center justify-center text-blue-200 mx-auto mb-6">
                  <FileText size={48} />
                </div>
                <h2 className="text-xl font-semibold text-center mb-2">No Documents Added</h2>
                <p className="text-gray-500 text-center mb-8 max-w-lg">
                  You have not created any documents yet. You can upload your resume versions, cover letters, and more, and link them to jobs you are tracking!
                </p>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                  onClick={handleAddDocument}
                >
                  <Plus size={16} />
                  <span>Add document</span>
                </Button>
              </div>
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Documents;
