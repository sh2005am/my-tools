import React, { useState, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib';

function PdfMerger() {
  const [files, setFiles] = useState([]);
  const [isMerging, setIsMerging] = useState(false);

  useEffect(() => {
    document.title = "Merge PDF Files Online for Free - acestuffs";
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(file => file.type === "application/pdf");
      setFiles([...files, ...newFiles]);
    }
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setFiles([]);
  };

  const mergePDFs = async () => {
    if (files.length < 2) return;
    setIsMerging(true);

    try {
      // Create a brand new blank PDF document
      const mergedPdf = await PDFDocument.create();

      // Loop through each selected file and copy its pages over
      for (const file of files) {
        const fileBytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(fileBytes);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      // Save the final merged document bytes
      const mergedPdfBytes = await mergedPdf.save();

      // Trigger an instant browser download
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `merged_acestuffs_${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error merging PDFs:", error);
      alert("Ah damn, something went wrong while merging. Make sure none of your files are password protected, bruh!");
    } finally {
      setIsMerging(false);
    }
  };

  return (
    <main class="flex-grow">
      {/* Main Tool Container */}
      <div className="flex justify-center items-center min-h-[80vh] py-10">
        <div className="bg-slate-900 p-6 rounded-2xl shadow-md w-full max-w-md text-center border border-slate-800">
          <h1 className="text-white text-2xl font-bold mb-4">Online PDF Merger</h1>
          <hr style={{ borderTop: '2px solid #d3d3d3' }} />
          <p className="text-white text-sm mt-2 mb-4">
            Combine multiple PDF files into a single document instantly. Secure, fast, and completely in your browser.
          </p>

          {/* Custom Hidden Input File styling */}
          <div className="mb-4">
            <label className="w-full flex flex-col items-center px-4 py-4 bg-gray-800 text-white rounded-lg shadow-lg tracking-wide uppercase border border-blue-500 cursor-pointer hover:bg-blue-600/20 transition-all duration-200">
              <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L9 9.414V13H5.5z" />
                <path d="M9 13h2v5H9z" />
              </svg>
              <span className="mt-2 text-sm font-semibold">Select PDF Files</span>
              <input 
                type="file" 
                multiple 
                accept=".pdf" 
                className="hidden" 
                onChange={handleFileChange} 
              />
            </label>
          </div>

          {/* Selected Files List View */}
          {files.length > 0 && (
            <div className="bg-slate-800 p-3 rounded-lg mb-4 text-left max-h-48 overflow-y-auto border border-slate-700">
              <div className="flex justify-between items-center mb-2 pb-1 border-b border-slate-600">
                <span className="text-xs text-gray-400 font-bold uppercase">Queue ({files.length})</span>
                <button onClick={clearAll} className="text-xs text-red-400 hover:underline">Clear All</button>
              </div>
              <ul className="space-y-1.5 text-xs text-white">
                {files.map((file, idx) => (
                  <li key={idx} className="flex justify-between items-center bg-slate-900 p-2 rounded">
                    <span className="truncate max-w-[80%]">{idx + 1}. {file.name}</span>
                    <button 
                      onClick={() => removeFile(idx)} 
                      className="text-red-500 font-bold hover:text-red-400 px-1"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Submit Action Button */}
          <button
            onClick={mergePDFs}
            disabled={files.length < 2 || isMerging}
            className={`w-full text-white p-2 rounded-lg font-semibold shadow transition-sm duration-200 ease-in-out hover:scale-101 ${
              files.length < 2 || isMerging
                ? 'bg-gray-700 cursor-not-allowed opacity-50'
                : 'bg-blue-500 hover:bg-blue-600 hover:cursor-pointer'
            }`}
          >
            {isMerging ? 'Merging Files...' : 'Merge PDFs'}
          </button>
        </div>
      </div>

      <hr style={{ borderTop: '4px solid #d3d3d3' }} />

      {/* SEO Pre-rendering Content Section for react-snap */}
      <div className="px-8 sm:px-16 pb-16 pt-4 text-white bg-blue-950/80">
        <h2 className="text-2xl font-bold mb-3 text-orange-600">What is an Online PDF Merger?</h2>
        <p className="sm:px-4 mb-6">
          An Online PDF Merger is a lightweight web utility that lets you combine multiple standalone PDF files into one clean, continuous document. Instead of dealing with separate records, invoices, or project files, you can sequence and bind them together instantly from your dashboard.
        </p>

        <h2 className="text-2xl font-bold mb-3 text-orange-600">How to use.</h2>
        <p className="sm:px-4 mb-6">
          Using our PDF combiner tool is effortless. Click the "Select PDF Files" dashboard option to load multiple files directly from your computer or phone. Your document stack will show up in the project queue list. Review the list, clean up any mistakes, and hit "Merge PDFs" to build and auto-download your new master file.
        </p>

        <h2 className="text-2xl font-bold mb-3 text-orange-600">Features</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Client-Side Engine:</strong> Merges documents instantly inside your local environment without network file lags.</li>
          <li><strong>No Content Limits:</strong> Add and combine as many documents as your browser memory can handle.</li>
          <li><strong>100% Free Service:</strong> Completely free utility with zero sign-up wall, watermarks, or hidden upgrade tiers.</li>
          <li><strong>Absolute Data Privacy:</strong> Files stay fully on your local machine and never touch outside cloud storage systems.</li>
        </ul>

        <h2 className="text-2xl font-bold mb-3 text-orange-600">Use cases</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Academic Submissions:</strong> Package separate assignment files, resource notes, and cover letters into a single PDF asset.</li>
          <li><strong>Business Reports:</strong> Consolidate financial balances, monthly invoices, and client briefs for cleaner storage.</li>
          <li><strong>Application Portfolios:</strong> Bundle professional resumes, certificates, and project summaries into a unified hiring packet.</li>
        </ul>
      </div>

      <hr style={{ borderTop: '4px solid #d3d3d3' }} />

      {/* SEO FAQ Section */}
      <div className="px-8 sm:px-16 pb-16 pt-4 text-white bg-slate-900/80">
        <h2 className="text-2xl font-bold mb-3 text-orange-600">FAQs</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg text-orange-600">Are my private documents secure?</h3>
            <p className="sm:px-4">
              Yes, entirely. Unlike traditional online converters that upload your documentation to remote servers, this utility runs entirely client-side using JavaScript. Your files are processed inside your browser instance and are never monitored or transferred.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-orange-600">Can I rearrange the files before merging?</h3>
            <p className="sm:px-4">
              Currently, files are merged in the exact order you select them. If you need a specific layout order, simply click "Clear All" and select your files in the sequential order you want them to appear in the final master document.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PdfMerger;