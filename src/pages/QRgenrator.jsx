import React, { useState, useRef } from "react";
import QRCode from "qrcode";
import toast, { Toaster } from "react-hot-toast";

export default function QRGenerator() {
  const [text, setText] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);
  const canvasRef = useRef(null);

  const generateQR = async () => {
    if (!text) {
      toast.error("Please enter some text or URL to generate QR code.");
      return;
    }

    try {
      await QRCode.toCanvas(canvasRef.current, text);
      setIsGenerated(true);
      toast.success("QR code generated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate QR code.");
    }
  };

  const downloadQR = () => {
    if (!isGenerated) {
      toast.error("QR code has not been generated yet.");
      return;
    }

    const canvas = canvasRef.current;
    const url = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = url;
    link.download = "qr-code.png";
    link.click();
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <Toaster position="top-center" />
        <div className="bg-slate-900 p-6 rounded-2xl shadow-md w-full max-w-md text-center">

          <h1 className="text-white text-2xl font-bold mb-4">QR Code Generator</h1>

          {/* --- ADDED INTRO --- */}
          <hr style={{ borderTop: "2px solid lightgrey" }} />

          <p className="text-white text-sm mt-1 mb-4">
            Generate QR codes instantly for free. Enter any text, URL, or data and download your QR code in seconds.
          </p>

          <input
            type="text"

            placeholder="Enter text or URL"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 border rounded-lg mb-4 bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-amber-50"
          />

          <button
            onClick={generateQR}
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 hover:scale-101 transition-sm duration-200 ease-in-out hover:cursor-pointer"
          >
            Generate QR Code
          </button>
          <div className="flex justify-center">
            <div className="flex mt-4 justify-center">
              <canvas ref={canvasRef}></canvas>
            </div>
            /</div>

          <button
            onClick={downloadQR}
            className="mt-4 w-full bg-orange-700 text-white p-2 rounded-lg hover:bg-orange-600 hover:cursor-pointer hover:scale-101 transition-sm duration-200 ease-in-out"
          >
            Download QR Code
          </button>

        </div>
      </div>

      {/* --- ADDED SEO CONTENT --- */}
       <hr style={{ borderTop: "4px solid lightgrey" }} />
      <div className="px-8 sm:px-16 pb-16 pt-4 text-white bg-blue-950/80">
        <h2 className="text-2xl font-bold mb-3 text-orange-600">What is a QR Code Generator?</h2>
        <p className="sm:px-4 mb-6">
          A QR Code Generator is a free online tool that converts plain text, website URLs, or contact information into a scannable 2D graphic. By entering your data, the tool instantly generates a unique QR code that can be scanned by modern smartphones to instantly access the encoded information.
        </p>

        <h2 className="text-2xl font-bold mb-3 text-orange-600">How to use.</h2>
        <p className="sm:px-4 mb-6">
          Using this tool is incredibly simple. Just paste your desired text or website link into the input box above and click the "Generate QR Code" button. Your custom QR code will appear immediately. Once you are satisfied, click "Download QR Code" to save it as a high-quality PNG image.
        </p>

        <h2 className="text-2xl font-bold mb-3 text-orange-600">Features</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2 ">
          <li><strong>Instant Processing:</strong> Generate codes instantly without any lag.</li>
          <li><strong>High-Quality Downloads:</strong> Save crisp PNG files perfect for both print and digital media.</li>
          <li><strong>100% Free:</strong> No sign-ups, subscriptions, or hidden fees.</li>
          <li><strong>Privacy Focused:</strong> Your data is processed directly in your browser.</li>
        </ul>

        <h2 className="text-2xl font-bold mb-3 text-orange-600">Use cases</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Business & Marketing:</strong> Add scannable codes to business cards, brochures, and flyers.</li>
          <li><strong>Events:</strong> Quickly share event details, venue locations, or ticketing links.</li>
          <li><strong>Hospitality:</strong> Create contactless digital menus for restaurants and cafes.</li>
          <li><strong>Personal Use:</strong> Easily share your home Wi-Fi password or personal portfolio.</li>
        </ul>
        </div>
 <hr style={{ borderTop: "4px solid lightgrey" }} />
 <div className="px-8 sm:px-16 pb-16 pt-4 text-white bg-slate-900/80">
        <h2 className="text-2xl font-bold mb-3 text-orange-600">FAQs</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg text-orange-600">Do these QR codes expire?</h3>
            <p className="sm:px-4">No, the QR codes generated here are static and will never expire. They will continue to work as long as the destination link or text remains active.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-orange-600">Is there a scan limit?</h3>
            <p className="sm:px-4">Absolutely not. There are no scan limits. You can generate, download, and scan your QR codes an unlimited number of times for free.</p>
          </div>
          </div>
      </div>
    </>
  );
}