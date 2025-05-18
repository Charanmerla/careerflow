import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowLeft, Binary, FileText, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { useForm } from "react-hook-form";
import { generateResume } from "@/services/ai";
import { toast } from "@/hooks/use-toast";

interface AIPromptModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onPrevious: () => void;
}

type AIPromptFormValues = {
  prompt: string;
  jobTitle: string;
  experience: number;
  skills: string;
};

const AIPromptModal = ({
  isOpen,
  onOpenChange,
  onPrevious,
}: AIPromptModalProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const form = useForm<AIPromptFormValues>({
    defaultValues: {
      prompt: "",
      jobTitle: "",
      experience: 3,
      skills: "",
    },
  });

  const handleCreateResume = async (values: AIPromptFormValues) => {
    if (!values.prompt.trim() && !values.jobTitle.trim()) return;

    setIsGenerating(true);

    try {
      const generatedResume = await generateResume({
        jobTitle: values.jobTitle,
        experience: values.experience,
        skills: values.skills,
        prompt: values.prompt,
      });

      // Store the generated resume in localStorage or state management
      localStorage.setItem("generatedResume", generatedResume);

      toast({
        title: "Resume Generated",
        description: "Your AI-generated resume is ready!",
      });

      // Navigate to the resume editor page
      window.location.href = "/resume-builder/editor";
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
      onOpenChange(false);
    }
  };

  if (isGenerating) {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-10">
            <div className="animate-pulse mb-4">
              <Binary className="h-12 w-12 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Generating Your Resume
            </h3>
            <p className="text-gray-500 text-center">
              Our AI is creating an ATS-friendly resume based on your
              instructions...
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Create AI Resume
          </DialogTitle>
          <p className="text-sm text-gray-500">
            Provide details to help our AI create a personalized ATS-friendly
            resume
          </p>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateResume)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-4">
              {/* Job Title */}
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">
                      Target Job Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Digital Marketing Manager"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Experience Level */}
              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">
                      Years of Experience
                    </FormLabel>
                    <div className="flex items-center gap-4">
                      <FormControl>
                        <Slider
                          min={0}
                          max={20}
                          step={1}
                          value={[field.value]}
                          onValueChange={(vals) => field.onChange(vals[0])}
                          className="flex-1"
                        />
                      </FormControl>
                      <span className="text-sm font-medium w-8 text-center">
                        {field.value}
                      </span>
                    </div>
                  </FormItem>
                )}
              />

              {/* Skills */}
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">
                      Key Skills (separate with commas)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. SEO, Social Media, Content Marketing"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* AI Prompt */}
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-2 mb-1">
                      <Binary className="h-4 w-4 text-blue-500" />
                      <FormLabel className="font-medium">
                        Additional Instructions
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Textarea
                        placeholder="Provide any additional details about your experience and career preferences..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="mt-2 flex items-center gap-2 text-gray-500">
                <Upload className="h-4 w-4" />
                <span className="text-sm">
                  Upload existing resume for reference
                </span>
                <Input type="file" className="hidden" id="resume-upload" />
                <label
                  htmlFor="resume-upload"
                  className="text-sm text-blue-600 cursor-pointer hover:underline"
                >
                  Browse
                </label>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-between pt-4 border-t border-gray-100">
              <Button
                type="button"
                variant="outline"
                onClick={onPrevious}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Generate Resume
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AIPromptModal;
