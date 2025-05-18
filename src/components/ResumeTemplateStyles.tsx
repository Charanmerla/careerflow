import React from "react";

// Interface for all resume data
export interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    location: string;
    phone: string;
  };
  summary: string;
  workExperience: {
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  education: {
    id: string;
    degree: string;
    institution: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  certifications: {
    id: string;
    name: string;
    issuer: string;
    date: string;
    description: string;
  }[];
  skills: {
    id: string;
    name: string;
    proficiency: string;
  }[];
  projects: {
    id: string;
    title: string;
    description: string;
    technologies: string;
  }[];
  publications: {
    id: string;
    title: string;
    publisher: string;
    date: string;
    description: string;
  }[];
  awards: {
    id: string;
    title: string;
    issuer: string;
    date: string;
    description: string;
  }[];
  volunteerExperience: {
    id: string;
    role: string;
    organization: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  languages: {
    id: string;
    language: string;
    proficiency: string;
  }[];
  socialLinks: {
    id: string;
    platform: string;
    url: string;
  }[];
}

interface ResumeTemplateProps {
  data: ResumeData;
}

// Career Focus template (current design)
export const CareerFocusTemplate: React.FC<ResumeTemplateProps> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm min-h-[800px]">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">{data.personalInfo.name}</h1>
        <p className="text-gray-600">{data.personalInfo.title}</p>
        <div className="flex items-center justify-center gap-3 text-sm text-gray-500 mt-1">
          <span>{data.personalInfo.email}</span>
          <span>•</span>
          <span>{data.personalInfo.location}</span>
          <span>•</span>
          <span>{data.personalInfo.phone}</span>
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">SUMMARY</h2>
          <p className="text-sm">{data.summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {data.workExperience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">WORK EXPERIENCE</h2>
          {data.workExperience.map((job) => (
            <div key={job.id} className="mb-3">
              <div className="flex justify-between">
                <h3 className="font-semibold">{job.title}</h3>
                <span className="text-sm">{job.startDate} - {job.endDate}</span>
              </div>
              <p className="text-sm font-medium">{job.company}{job.location ? `, ${job.location}` : ''}</p>
              <div className="text-sm whitespace-pre-line">{job.description}</div>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">EDUCATION</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between">
                <h3 className="font-semibold">{edu.degree}</h3>
                <span className="text-sm">{edu.startDate} - {edu.endDate}</span>
              </div>
              <p className="text-sm font-medium">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>
              {edu.description && <div className="text-sm">{edu.description}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">SKILLS</h2>
          <p className="text-sm">
            {data.skills.map((skill, index) => (
              <span key={skill.id}>
                {skill.name}{skill.proficiency ? ` (${skill.proficiency})` : ''}
                {index < data.skills.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        </div>
      )}

      {/* Certifications */}
      {data.certifications.some(cert => cert.name) && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">CERTIFICATIONS</h2>
          {data.certifications.map((cert) => (
            cert.name && (
              <div key={cert.id} className="mb-2">
                <div className="flex justify-between">
                  <h3 className="font-medium">{cert.name}</h3>
                  <span className="text-sm">{cert.date}</span>
                </div>
                <p className="text-sm">{cert.issuer}</p>
                {cert.description && <p className="text-sm text-gray-600">{cert.description}</p>}
              </div>
            )
          ))}
        </div>
      )}

      {/* Projects */}
      {data.projects.some(proj => proj.title) && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">PROJECTS</h2>
          {data.projects.map((proj) => (
            proj.title && (
              <div key={proj.id} className="mb-2">
                <h3 className="font-medium">{proj.title}</h3>
                <p className="text-sm">{proj.description}</p>
                {proj.technologies && <p className="text-sm italic mt-1">Technologies: {proj.technologies}</p>}
              </div>
            )
          ))}
        </div>
      )}

      {/* Publications */}
      {data.publications.some(pub => pub.title) && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">PUBLICATIONS</h2>
          {data.publications.map((pub) => (
            pub.title && (
              <div key={pub.id} className="mb-2">
                <div className="flex justify-between">
                  <h3 className="font-medium">{pub.title}</h3>
                  <span className="text-sm">{pub.date}</span>
                </div>
                <p className="text-sm">{pub.publisher}</p>
                {pub.description && <p className="text-sm text-gray-600">{pub.description}</p>}
              </div>
            )
          ))}
        </div>
      )}

      {/* Awards */}
      {data.awards.some(award => award.title) && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">AWARDS</h2>
          {data.awards.map((award) => (
            award.title && (
              <div key={award.id} className="mb-2">
                <div className="flex justify-between">
                  <h3 className="font-medium">{award.title}</h3>
                  <span className="text-sm">{award.date}</span>
                </div>
                <p className="text-sm">{award.issuer}</p>
                {award.description && <p className="text-sm text-gray-600">{award.description}</p>}
              </div>
            )
          ))}
        </div>
      )}

      {/* Volunteer Experience */}
      {data.volunteerExperience.some(vol => vol.role) && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">VOLUNTEER EXPERIENCE</h2>
          {data.volunteerExperience.map((vol) => (
            vol.role && (
              <div key={vol.id} className="mb-3">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{vol.role}</h3>
                  <span className="text-sm">{vol.startDate} - {vol.endDate}</span>
                </div>
                <p className="text-sm font-medium">{vol.organization}{vol.location ? `, ${vol.location}` : ''}</p>
                {vol.description && <div className="text-sm">{vol.description}</div>}
              </div>
            )
          ))}
        </div>
      )}

      {/* Languages */}
      {data.languages.some(lang => lang.language) && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">LANGUAGES</h2>
          <p className="text-sm">
            {data.languages.map((lang, index) => (
              lang.language && (
                <span key={lang.id}>
                  {lang.language}{lang.proficiency ? ` (${lang.proficiency})` : ''}
                  {index < data.languages.length - 1 && data.languages[index + 1].language ? ', ' : ''}
                </span>
              )
            ))}
          </p>
        </div>
      )}

      {/* Social Links */}
      {data.socialLinks.some(link => link.url) && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">LINKS</h2>
          <div className="flex flex-wrap gap-3">
            {data.socialLinks.map((link) => (
              link.url && (
                <div key={link.id} className="text-sm">
                  <span className="font-medium">{link.platform}:</span> {link.url}
                </div>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Modern template
export const ModernTemplate: React.FC<ResumeTemplateProps> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm min-h-[800px] font-sans">
      <div className="border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-2xl font-bold uppercase tracking-wider">{data.personalInfo.name}</h1>
        <p className="text-gray-700 font-medium">{data.personalInfo.title}</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600 mt-2">
          <span>{data.personalInfo.email}</span>
          <span>{data.personalInfo.phone}</span>
          <span>{data.personalInfo.location}</span>
          {data.socialLinks.map(link => link.url && (
            <span key={link.id}>{link.platform}: {link.url}</span>
          ))}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-5">
          <h2 className="text-base font-bold uppercase tracking-wider mb-2 text-gray-800">SUMMARY</h2>
          <p className="text-sm">{data.summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {data.workExperience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-base font-bold uppercase tracking-wider mb-2 text-gray-800">WORK EXPERIENCE</h2>
          {data.workExperience.map((job) => (
            <div key={job.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{job.title}</h3>
                  <p className="text-sm text-gray-700">{job.company}, {job.location}</p>
                </div>
                <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded">{job.startDate} - {job.endDate}</span>
              </div>
              <div className="text-sm mt-1 whitespace-pre-line">{job.description}</div>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-base font-bold uppercase tracking-wider mb-2 text-gray-800">EDUCATION</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold">{edu.degree}</h3>
                  <p className="text-sm text-gray-700">{edu.institution}, {edu.location}</p>
                </div>
                <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded">{edu.startDate} - {edu.endDate}</span>
              </div>
              {edu.description && <p className="text-sm">{edu.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Two columns for skills and certifications */}
      <div className="grid grid-cols-2 gap-6 mb-5">
        {/* Skills */}
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-base font-bold uppercase tracking-wider mb-2 text-gray-800">SKILLS</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span key={skill.id} className="px-2 py-1 bg-gray-100 rounded text-xs">
                  {skill.name} {skill.proficiency && `(${skill.proficiency})`}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {data.certifications.some(cert => cert.name) && (
          <div>
            <h2 className="text-base font-bold uppercase tracking-wider mb-2 text-gray-800">CERTIFICATIONS</h2>
            {data.certifications.map((cert) => (
              cert.name && (
                <div key={cert.id} className="mb-2">
                  <p className="font-medium">{cert.name} - {cert.issuer}</p>
                  <p className="text-xs text-gray-600">{cert.date}</p>
                </div>
              )
            ))}
          </div>
        )}
      </div>

      {/* Projects */}
      {data.projects.some(proj => proj.title) && (
        <div className="mb-5">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2 text-gray-800">PROJECTS</h2>
          {data.projects.map((proj) => (
            proj.title && (
              <div key={proj.id} className="mb-2">
                <h3 className="font-medium">{proj.title}</h3>
                <p className="text-sm">{proj.description}</p>
                {proj.technologies && <p className="text-sm italic mt-1">Technologies: {proj.technologies}</p>}
              </div>
            )
          ))}
        </div>
      )}

      {/* Publications */}
      {data.publications.some(pub => pub.title) && (
        <div className="mb-5">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2 text-gray-800">PUBLICATIONS</h2>
          {data.publications.map((pub) => (
            pub.title && (
              <div key={pub.id} className="mb-2">
                <div className="flex justify-between">
                  <h3 className="font-medium">{pub.title}</h3>
                  <span className="text-sm">{pub.date}</span>
                </div>
                <p className="text-sm">{pub.publisher}</p>
                {pub.description && <p className="text-sm text-gray-600">{pub.description}</p>}
              </div>
            )
          ))}
        </div>
      )}

      {/* Awards */}
      {data.awards.some(award => award.title) && (
        <div className="mb-5">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2 text-gray-800">AWARDS</h2>
          {data.awards.map((award) => (
            award.title && (
              <div key={award.id} className="mb-2">
                <div className="flex justify-between">
                  <h3 className="font-medium">{award.title}</h3>
                  <span className="text-sm">{award.date}</span>
                </div>
                <p className="text-sm">{award.issuer}</p>
                {award.description && <p className="text-sm text-gray-600">{award.description}</p>}
              </div>
            )
          ))}
        </div>
      )}

      {/* Volunteer Experience */}
      {data.volunteerExperience.some(vol => vol.role) && (
        <div className="mb-5">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2 text-gray-800">VOLUNTEER EXPERIENCE</h2>
          {data.volunteerExperience.map((vol) => (
            vol.role && (
              <div key={vol.id} className="mb-3">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{vol.role}</h3>
                  <span className="text-sm">{vol.startDate} - {vol.endDate}</span>
                </div>
                <p className="text-sm font-medium">{vol.organization}{vol.location ? `, ${vol.location}` : ''}</p>
                {vol.description && <div className="text-sm">{vol.description}</div>}
              </div>
            )
          ))}
        </div>
      )}

      {/* Languages */}
      {data.languages.some(lang => lang.language) && (
        <div className="mb-5">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2 text-gray-800">LANGUAGES</h2>
          <p className="text-sm">
            {data.languages.map((lang, index) => (
              lang.language && (
                <span key={lang.id}>
                  {lang.language}{lang.proficiency ? ` (${lang.proficiency})` : ''}
                  {index < data.languages.length - 1 && data.languages[index + 1].language ? ', ' : ''}
                </span>
              )
            ))}
          </p>
        </div>
      )}

      {/* Social Links */}
      {data.socialLinks.some(link => link.url) && (
        <div className="mb-5">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2 text-gray-800">LINKS</h2>
          <div className="flex flex-wrap gap-3">
            {data.socialLinks.map((link) => (
              link.url && (
                <div key={link.id} className="text-sm">
                  <span className="font-medium">{link.platform}:</span> {link.url}
                </div>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Compact template
export const CompactTemplate: React.FC<ResumeTemplateProps> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm min-h-[800px] font-sans">
      <header className="text-center border-b border-gray-300 pb-4 mb-5">
        <h1 className="text-2xl font-bold">{data.personalInfo.name}</h1>
        <p className="text-gray-600 italic">{data.personalInfo.title}</p>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-2 flex-wrap">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>| {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>| {data.personalInfo.location}</span>}
          {data.socialLinks.map(link => link.url && (
            <span key={link.id}>| {link.url}</span>
          ))}
        </div>
      </header>

      {/* Summary */}
      {data.summary && (
        <div className="mb-4">
          <h2 className="text-md font-bold border-b border-gray-200 pb-1 mb-2">Professional Summary</h2>
          <p className="text-sm">{data.summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {data.workExperience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-md font-bold border-b border-gray-200 pb-1 mb-2">Work Experience</h2>
          {data.workExperience.map((job) => (
            <div key={job.id} className="mb-3">
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <h3 className="font-semibold">{job.title}, {job.company}</h3>
                <p className="text-xs text-gray-600">{job.startDate} - {job.endDate}</p>
              </div>
              <p className="text-xs text-gray-600 italic">{job.location}</p>
              <div className="text-sm whitespace-pre-line mt-1">{job.description}</div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-4">
          <h2 className="text-md font-bold border-b border-gray-200 pb-1 mb-2">Skills</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            {data.skills.map((skill) => (
              <div key={skill.id} className="text-sm">
                <span className="font-medium">{skill.name}</span>
                {skill.proficiency && <span className="text-gray-600"> - {skill.proficiency}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-md font-bold border-b border-gray-200 pb-1 mb-2">Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-2">
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <h3 className="font-semibold">{edu.degree}</h3>
                <p className="text-xs text-gray-600">{edu.startDate} - {edu.endDate}</p>
              </div>
              <p className="text-sm">{edu.institution}, {edu.location}</p>
              {edu.description && <p className="text-xs text-gray-600 mt-1">{edu.description}</p>}
            </div>
          ))}
        </div>
      )}
      
      {/* Certifications */}
      {data.certifications.some(cert => cert.name) && (
        <div className="mb-4">
          <h2 className="text-md font-bold border-b border-gray-200 pb-1 mb-2">Certifications</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.certifications.map((cert) => (
              cert.name && (
                <div key={cert.id}>
                  <p className="text-sm font-medium">{cert.name}</p>
                  <p className="text-xs text-gray-600">{cert.issuer}, {cert.date}</p>
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.some(proj => proj.title) && (
        <div className="mb-4">
          <h2 className="text-md font-bold border-b border-gray-200 pb-1 mb-2">Projects</h2>
          {data.projects.map((proj) => (
            proj.title && (
              <div key={proj.id} className="mb-2">
                <h3 className="text-sm font-semibold">{proj.title}</h3>
                <p className="text-xs">{proj.description}</p>
                {proj.technologies && <p className="text-xs italic text-gray-600">{proj.technologies}</p>}
              </div>
            )
          ))}
        </div>
      )}

      {/* Additional sections in a more compact format */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Publications */}
        {data.publications.some(pub => pub.title) && (
          <div>
            <h2 className="text-md font-bold border-b border-gray-200 pb-1 mb-2">Publications</h2>
            {data.publications.map(pub => pub.title && (
              <div key={pub.id} className="text-sm mb-1">
                <span className="font-semibold">{pub.title}</span> - {pub.publisher}, {pub.date}
              </div>
            ))}
          </div>
        )}

        {/* Awards */}
        {data.awards.some(award => award.title) && (
          <div>
            <h2 className="text-md font-bold border-b border-gray-200 pb-1 mb-2">Awards</h2>
            {data.awards.map(award => award.title && (
              <div key={award.id} className="text-sm mb-1">
                <span className="font-semibold">{award.title}</span> - {award.issuer}, {award.date}
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {data.languages.some(lang => lang.language) && (
          <div>
            <h2 className="text-md font-bold border-b border-gray-200 pb-1 mb-2">Languages</h2>
            {data.languages.map(lang => lang.language && (
              <div key={lang.id} className="text-sm">
                <span className="font-medium">{lang.language}</span>
                {lang.proficiency && <span> - {lang.proficiency}</span>}
              </div>
            ))}
          </div>
        )}

        {/* Volunteer Experience */}
        {data.volunteerExperience.some(vol => vol.role) && (
          <div>
            <h2 className="text-md font-bold border-b border-gray-200 pb-1 mb-2">Volunteer Experience</h2>
            {data.volunteerExperience.map((vol) => (
              vol.role && (
                <div key={vol.id} className="mb-1">
                  <p className="text-sm font-medium">{vol.role}, {vol.organization}</p>
                  <p className="text-xs text-gray-600">{vol.startDate} - {vol.endDate}</p>
                </div>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Professional template
export const ProfessionalTemplate: React.FC<ResumeTemplateProps> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm min-h-[800px] font-serif">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-center">{data.personalInfo.name}</h1>
        <div className="h-1 bg-blue-800 w-32 mx-auto my-2"></div>
        <p className="text-gray-600 text-center font-medium">{data.personalInfo.title}</p>
        <div className="flex justify-center flex-wrap gap-3 mt-2 text-sm">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>• {data.personalInfo.location}</span>}
        </div>
        {data.socialLinks.some(link => link.url) && (
          <div className="flex justify-center flex-wrap gap-3 mt-1 text-sm text-blue-600">
            {data.socialLinks.map(link => link.url && (
              <a key={link.id} href={link.url} className="hover:underline">
                {link.platform}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Summary */}
      {data.summary && (
        <div className="mb-5">
          <h2 className="text-lg font-bold mb-2 text-blue-800">Professional Summary</h2>
          <p className="text-sm">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.workExperience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-lg font-bold mb-2 text-blue-800">Work Experience</h2>
          {data.workExperience.map((job) => (
            <div key={job.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold">{job.title}</h3>
                <span className="text-sm">{job.startDate} - {job.endDate}</span>
              </div>
              <p className="text-sm font-italic mb-1">{job.company}, {job.location}</p>
              <div className="text-sm whitespace-pre-line">{job.description}</div>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-lg font-bold mb-2 text-blue-800">Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between">
                <h3 className="font-bold">{edu.degree}</h3>
                <span className="text-sm">{edu.startDate} - {edu.endDate}</span>
              </div>
              <p className="text-sm italic">{edu.institution}, {edu.location}</p>
              {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Two column layout for skills and certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        {/* Skills */}
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-2 text-blue-800">Skills</h2>
            <ul className="list-disc pl-5">
              {data.skills.map((skill) => (
                <li key={skill.id} className="text-sm mb-1">
                  <span className="font-medium">{skill.name}</span>
                  {skill.proficiency && <span> - {skill.proficiency}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Certifications */}
        {data.certifications.some(cert => cert.name) && (
          <div>
            <h2 className="text-lg font-bold mb-2 text-blue-800">Certifications</h2>
            {data.certifications.map((cert) => (
              cert.name && (
                <div key={cert.id} className="mb-2">
                  <p className="text-sm font-medium">{cert.name}</p>
                  <p className="text-sm">{cert.issuer}, {cert.date}</p>
                </div>
              )
            ))}
          </div>
        )}
      </div>

      {/* Projects */}
      {data.projects.some(proj => proj.title) && (
        <div className="mb-5">
          <h2 className="text-lg font-bold mb-2 text-blue-800">Projects</h2>
          {data.projects.map((proj) => (
            proj.title && (
              <div key={proj.id} className="mb-3">
                <h3 className="font-medium">{proj.title}</h3>
                <p className="text-sm">{proj.description}</p>
                {proj.technologies && <p className="text-sm italic">Technologies: {proj.technologies}</p>}
              </div>
            )
          ))}
        </div>
      )}

      {/* Additional sections */}
      {data.publications.some(pub => pub.title) && (
        <div className="mb-5">
          <h2 className="text-lg font-bold mb-2 text-blue-800">Publications</h2>
          {data.publications.map((pub) => (
            pub.title && (
              <div key={pub.id} className="mb-2">
                <p className="text-sm font-medium">{pub.title}</p>
                <p className="text-sm">{pub.publisher}, {pub.date}</p>
              </div>
            )
          ))}
        </div>
      )}

      {data.awards.some(award => award.title) && (
        <div className="mb-5">
          <h2 className="text-lg font-bold mb-2 text-blue-800">Awards</h2>
          {data.awards.map((award) => (
            award.title && (
              <div key={award.id} className="mb-2">
                <p className="text-sm font-medium">{award.title}</p>
                <p className="text-sm">{award.issuer}, {award.date}</p>
              </div>
            )
          ))}
        </div>
      )}

      {/* Languages */}
      {data.languages.some(lang => lang.language) && (
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2 text-blue-800">Languages</h2>
          <div className="flex flex-wrap gap-4">
            {data.languages.map((lang) => (
              lang.language && (
                <div key={lang.id} className="text-sm">
                  <span className="font-medium">{lang.language}</span>
                  {lang.proficiency && <span> ({lang.proficiency})</span>}
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Volunteer Experience */}
      {data.volunteerExperience.some(vol => vol.role) && (
        <div>
          <h2 className="text-lg font-bold mb-2 text-blue-800">Volunteer Experience</h2>
          {data.volunteerExperience.map((vol) => (
            vol.role && (
              <div key={vol.id} className="mb-2">
                <div className="flex justify-between">
                  <h3 className="font-medium">{vol.role}</h3>
                  <span className="text-sm">{vol.startDate} - {vol.endDate}</span>
                </div>
                <p className="text-sm">{vol.organization}, {vol.location}</p>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
};
