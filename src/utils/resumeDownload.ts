
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import type { ResumeData } from '../components/ResumeTemplateStyles';

export const downloadResumePDF = async (resumeRef: React.RefObject<HTMLDivElement>, resumeData: ResumeData) => {
  if (!resumeRef.current) {
    console.error('Resume reference is not available');
    return;
  }

  try {
    // Create canvas from the resume element
    const canvas = await html2canvas(resumeRef.current, {
      scale: 2, // Higher scale for better quality
      logging: false,
      useCORS: true,
      windowWidth: 1000,
    });

    // Calculate dimensions for A4 page
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Create PDF document
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Add image to PDF
    pdf.addImage(
      canvas.toDataURL('image/jpeg', 1.0), 
      'JPEG', 
      0, 
      0, 
      imgWidth, 
      imgHeight
    );
    
    // If content exceeds a page, create multiple pages
    let heightLeft = imgHeight;
    let position = 0;
    
    // Remove first page height
    heightLeft -= pageHeight;
    
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(
        canvas.toDataURL('image/jpeg', 1.0), 
        'JPEG', 
        0, 
        position, 
        imgWidth, 
        imgHeight
      );
      heightLeft -= pageHeight;
    }
    
    // Generate filename from user's name and current date
    const fileName = `${resumeData.personalInfo.name.replace(/\s+/g, '_')}_Resume_${new Date().toLocaleDateString().replace(/\//g, '-')}.pdf`;
    
    // Save the PDF
    pdf.save(fileName);
    
    return fileName;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return null;
  }
};
