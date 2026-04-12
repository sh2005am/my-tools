import React from 'react'
import ToolsCards from '../components/ToolsCards'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
  <h2 className="text-center mb-8 text-s sm:text-2xl md:text-3xl font-bold">
    Choose one of our tools to start with
  </h2>

  {/* Responsive Grid: 1 column on mobile, 2 on tablet, 4 on desktop */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <Link to="/qr-generator" className="block h-full">
      <ToolsCards 
        toolName="QR Generator" 
        toolDescription="Generate QR codes from any text or url" 
      />
    </Link>

    <Link to="/barcode-generator" className="block h-full">
      <ToolsCards 
        toolName="Barcode Generator" 
        toolDescription="Generate barcode from any text" 
      />
    </Link>

    <Link to="/json-tool" className="block h-full">
      <ToolsCards 
        toolName="JSON Tool" 
        toolDescription="A simple JSON formatting tool" 
      />
    </Link>

    <Link to="/pdf-merger" className="block h-full">
      <ToolsCards 
        toolName="PDF Merger" 
        toolDescription="Merge multiple PDF files into one" 
      />
    </Link>
  </div>
  {/* search */}
  <div className='mt-8 border border-gray-300 rounded-md p-2 flex gap-2 items-center bg-white shadow-sm'>
  {/* flex-grow (or flex-1) makes the input fill all available space */}
  <input 
    type="text" 
    className="w-full sm:flex-[4] p-2 outline-none text-[#516078] placeholder:text-gray-400" 
    placeholder="Search for tools..."
  />
  
  {/* flex-1 makes the button take up the remaining 1 part of the 5 total parts */}
  <button className="w-full sm:flex-1 bg-[#516078] text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-all font-medium">
    Search
  </button>
</div>
</div>
  )
}

export default Home
