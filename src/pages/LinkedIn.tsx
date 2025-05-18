
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { Linkedin } from "lucide-react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

const LinkedIn = () => {
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
                  <Linkedin size={32} />
                </div>
                <h1 className="text-2xl font-semibold text-center">LinkedIn Integration</h1>
                <p className="text-gray-500 text-center mt-2 max-w-md">
                  Connect your LinkedIn profile to optimize your job search.
                </p>
              </div>
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default LinkedIn;
