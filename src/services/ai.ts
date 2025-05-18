import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Only for development, should be moved to backend in production
});

export interface ResumeGenerationInput {
  jobTitle: string;
  experience: number;
  skills: string;
  prompt: string;
}

export interface CoverLetterGenerationInput {
  jobTitle: string;
  companyName: string;
  skills: string;
  experience: string;
  prompt: string;
}

export const generateResume = async (input: ResumeGenerationInput) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are an expert resume writer and career coach. Your task is to create an ATS-friendly resume based on the user's input.",
        },
        {
          role: "user",
          content: `Create a professional resume for a ${input.jobTitle} position with ${input.experience} years of experience. 
          Key skills: ${input.skills}
          Additional instructions: ${input.prompt}
          
          Format the resume in a clear, professional structure with sections for:
          1. Professional Summary
          2. Skills
          3. Work Experience
          4. Education
          
          Make it ATS-friendly and highlight achievements using metrics where possible.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating resume:", error);
    throw error;
  }
};

export const generateCoverLetter = async (
  input: CoverLetterGenerationInput
) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are an expert cover letter writer. Your task is to create a compelling cover letter based on the user's input.",
        },
        {
          role: "user",
          content: `Create a professional cover letter for a ${input.jobTitle} position at ${input.companyName}.
          Skills: ${input.skills}
          Experience: ${input.experience}
          Additional instructions: ${input.prompt}
          
          The cover letter should be:
          1. Professional and engaging
          2. Highlight relevant skills and experience
          3. Show enthusiasm for the role
          4. Include a call to action
          
          Format it as a proper business letter.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating cover letter:", error);
    throw error;
  }
};
