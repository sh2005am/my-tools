import React, { useState } from 'react'
import ToolsCards from '../components/ToolsCards'
import { Link } from 'react-router-dom'

function Home() {
  let [searchTerm, setSearchTerm] = useState("")
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    // Implement search functionality here
    console.log("Searching for:", searchTerm)
  }

  let tools = [
    {
      name: "QR Generator",
      description: "Generate QR codes from any text or url",
      image: "src/assets/tool_images/qr-generator.png"
    },
    {
      name: "Barcode Generator",
      description: "Generate barcode from any text",
      image: "src/assets/tool_images/barcode-generator.png"
    },
    {
      name: "JSON Tool",
      description: "A simple JSON formatting tool",
      image: "src/assets/tool_images/json-formatter.png"
    },
    {
      name: "PDF Merger",
      description: "Merge multiple PDF files into one",
      image: "src/assets/tool_images/pdf-merger.png"
    }

  ]
  const filteredTools = searchTerm.trim() === ""
    ? [] // Return an empty array if there is no search term
    : tools.filter((tool) => {
      const searchWords = searchTerm.toLowerCase().trim().split(/\s+/);
      return searchWords.every(word =>
        tool.name.toLowerCase().includes(word)
      );
    });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-center mb-8 text-s sm:text-2xl md:text-3xl font-bold">
        Choose one of our tools to start with
      </h2>

      {/* Responsive Grid: 1 column on mobile, 2 on tablet, 4 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tools.map((tool, index) => (
          <Link to={`/${tool.name.toLowerCase().replace(/\s+/g, '-')}`} className="block h-full" key={index}>
            <ToolsCards
              toolName={tool.name}
              toolDescription={tool.description}
              image={tool.image}
            />
          </Link>
        ))}
      </div>


      {/* search */}
      <div className='mt-8 border border-gray-300 rounded-md p-2 flex gap-2 items-center bg-white shadow-sm'>
        {/* flex-grow (or flex-1) makes the input fill all available space */}
        <input
          type="text"
          className="w-full sm:flex-[4] p-2 outline-none text-[#516078] placeholder:text-gray-400"
          placeholder="Search for tools..." onChange={handleSearchChange}
        />

        {/* flex-1 makes the button take up the remaining 1 part of the 5 total parts */}
        <button className="w-full sm:flex-1 bg-[#516078] text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-all font-medium" onClick={handleSearchSubmit}>
          Search
        </button>

      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {filteredTools.map((tool, index) => (
          <Link to={`/${tool.name.toLowerCase().replace(/\s+/g, '-')}`} className="block h-full" key={index}>
            <ToolsCards
              toolName={tool.name}
              toolDescription={tool.description}
              image={tool.image}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home
