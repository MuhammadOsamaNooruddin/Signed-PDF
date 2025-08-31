import { Worker } from '@react-pdf-viewer/core';
// Import the main component
import { Viewer } from '@react-pdf-viewer/core';

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';


export const CreatePDF = ({pdfPath}: {pdfPath: string}) => {
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
     <Viewer fileUrl={pdfPath} />
    </Worker>
  );
};
