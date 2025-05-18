
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CoverLetterGenerator from "./pages/CoverLetterGenerator";
import Documents from "./pages/Documents";
import LinkedIn from "./pages/LinkedIn";
import ResumeBuilder from "./pages/ResumeBuilder";
import ResumeEditor from "./pages/ResumeEditor";
import JobTracker from "./pages/JobTracker";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
          <Route path="/resume-builder/editor" element={<ResumeEditor />} />
          <Route path="/job-tracker" element={<JobTracker />} />
          <Route path="/cover-letter" element={<CoverLetterGenerator />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/linkedin" element={<LinkedIn />} />
          <Route path="/auth" element={<Auth />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
