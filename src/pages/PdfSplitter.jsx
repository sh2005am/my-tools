import React, { useState, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib';

export default function PdfSplitter() {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [numPages, setNumPages] = useState(0);
  
  // These will now accept empty strings temporarily while typing
  const [fromPage, setFromPage] = useState(1);
  const [toPage, setToPage] = useState(1);
  
  const [isExtracting, setIsExtracting] = useState(false);

  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      
      const url = URL.createObjectURL(file);
      setPdfUrl(url);

      setTimeout(async () => {
        try {
          const arrayBuffer = await file.arrayBuffer();
          const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
          const count = pdfDoc.getPageCount();
          
          setNumPages(count);
          setFromPage(1);
          setToPage(count);
        } catch (error) {
          console.error('Error reading PDF structure:', error);
        }
      }, 100); 
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  const handleExtractPdf = async () => {
    const start = Number(fromPage);
    const end = Number(toPage);

    if (!pdfFile || start < 1 || end > numPages || start > end) {
      alert('Please enter a valid page range.');
      return;
    }

    setIsExtracting(true);
    try {
      const fileArrayBuffer = await pdfFile.arrayBuffer();
      const srcDoc = await PDFDocument.load(fileArrayBuffer);
      const newDoc = await PDFDocument.create();

      const pageIndices = [];
      for (let i = start - 1; i <= end - 1; i++) {
        pageIndices.push(i);
      }

      const copiedPages = await newDoc.copyPages(srcDoc, pageIndices);
      copiedPages.forEach((page) => newDoc.addPage(page));

      const pdfBytes = await newDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const downloadUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${pdfFile.name.replace(/\.pdf$/i, '')}_pages_${start}_to_${end}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error splitting PDF:', error);
      alert('An error occurred while splitting the PDF.');
    } finally {
      setIsExtracting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">PDF Splitter</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Upload a PDF, scroll through to find your pages, and set the extraction range.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
            id="pdf-upload"
          />
          <label
            htmlFor="pdf-upload"
            className="cursor-pointer inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
          >
            {pdfFile ? 'Change File' : 'Upload PDF'}
          </label>
          {pdfFile && numPages > 0 && (
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {pdfFile.name} ({numPages} pages)
            </span>
          )}
        </div>
      </div>

      {pdfFile && numPages > 0 && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 flex flex-wrap items-center justify-between gap-4 sticky top-4 z-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="font-semibold text-gray-700 dark:text-gray-300">Start Page:</label>
              <input
                type="number"
                min="1"
                max={numPages}
                value={fromPage}
                onChange={(e) => setFromPage(e.target.value === '' ? '' : Number(e.target.value))}
                onBlur={() => {
                  let val = Number(fromPage);
                  if (!val || val < 1) val = 1;
                  if (val > numPages) val = numPages;
                  setFromPage(val);
                }}
                className="w-20 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 text-center focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="font-semibold text-gray-700 dark:text-gray-300">End Page:</label>
              <input
                type="number"
                min="1"
                max={numPages}
                value={toPage}
                onChange={(e) => setToPage(e.target.value === '' ? '' : Number(e.target.value))}
                onBlur={() => {
                  let val = Number(toPage);
                  if (!val || val < 1) val = 1;
                  if (val > numPages) val = numPages;
                  setToPage(val);
                }}
                className="w-20 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 text-center focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <button
            onClick={handleExtractPdf}
            disabled={isExtracting}
            className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold transition shadow-sm disabled:opacity-50"
          >
            {isExtracting ? 'Extracting...' : 'Extract & Download'}
          </button>
        </div>
      )}

      {pdfUrl && (
        <div className="bg-gray-100 dark:bg-gray-900 rounded-xl shadow-inner border border-gray-300 dark:border-gray-600 overflow-hidden h-[75vh] w-full">
          <object
            data={`${pdfUrl}#view=FitH`} 
            type="application/pdf"
            className="w-full h-full"
          >
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <p className="mb-2">Your browser does not support inline PDF viewing.</p>
              <a href={pdfUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                Click here to view the PDF
              </a>
            </div>
          </object>
        </div>
      )}
    </div>
  );
}