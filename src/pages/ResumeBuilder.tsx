
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import ResumeCreationModal from "@/components/ResumeCreationModal";

const ResumeBuilder = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateResume = () => {
    setIsModalOpen(true);
  };

  return (
    <SidebarProvider defaultOpen={!window.matchMedia("(max-width: 768px)").matches}>
      <div className="flex h-screen w-full bg-gray-50">
        <Sidebar />
        <SidebarInset className="flex-1 flex flex-col overflow-hidden">
          <TopBar />
          <div className="flex-1 overflow-auto scrollbar-improved">
            <main className="p-4 md:p-6 max-w-5xl mx-auto w-full">
              <div className="flex flex-col items-center justify-center h-[70vh] animate-fade-in">
                <div className="h-16 w-16 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500 mx-auto mb-4 shadow-sm">
                  <FileText size={32} />
                </div>
                <h1 className="text-2xl font-semibold text-center">Resume Builder</h1>
                <p className="text-gray-500 text-center mt-2 max-w-md">
                  Create professional resumes tailored to your dream job.
                </p>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 mt-6 hover-scale"
                  onClick={handleCreateResume}
                >
                  <Plus size={16} />
                  <span>Create New Resume</span>
                </Button>
              </div>
            </main>
          </div>
        </SidebarInset>
      </div>

      <ResumeCreationModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </SidebarProvider>
  );
};

export default ResumeBuilder;
