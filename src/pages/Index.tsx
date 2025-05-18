
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

const Index = () => {
  return (
    <SidebarProvider defaultOpen={!window.matchMedia("(max-width: 768px)").matches}>
      <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
        {/* Sidebar - will handle its own responsive behavior */}
        <Sidebar />
        
        {/* Main Content */}
        <SidebarInset className="flex-1 flex flex-col overflow-hidden w-full">
          {/* Top Bar - now contains sidebar toggle button */}
          <TopBar />
          
          {/* Content Area with improved scrolling */}
          <div className="flex-1 w-full overflow-auto scrollbar-improved">
            {/* Welcome Section */}
            <main className="p-4 md:p-6 max-w-5xl mx-auto w-full">
              <div className="text-center py-8 md:py-16 animate-fade-in">
                <h1 className="text-3xl md:text-4xl font-semibold text-gray-700 mb-4">Welcome</h1>
                <p className="text-gray-500 mb-5">
                  To your hub for career insights,<br />
                  activities, and more.
                </p>
                <Button variant="outline" className="flex items-center gap-2 mx-auto hover-scale">
                  View All Features <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="bg-white rounded-lg border p-4 md:p-8 my-4 md:my-6 shadow-sm w-full">
                <div className="text-center text-gray-500 py-8 md:py-12">
                  You'll need to add jobs to get analytics for your jobs here
                  
                  <div className="mt-6">
                    <Button className="flex items-center gap-2 mx-auto bg-blue-600 hover:bg-blue-700 hover-scale">
                      <span>Add A New Job</span>
                    </Button>
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

export default Index;
