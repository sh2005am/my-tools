import React from 'react'

function ToolsCards(props) {
    const { toolName, toolDescription } = props
  return (
   <div className="flex flex-col h-full rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-md transition-shadow">
      
      {/* Image Container */}
      <div className="w-full aspect-video overflow-hidden">
        <img 
          src="https://placehold.co/400" 
          className="w-full h-full object-cover" 
          alt={toolName} 
        />
      </div>

      {/* Content Area - flex-grow ensures this area fills the card */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          {toolName}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {toolDescription}
        </p>
      </div>

    </div>
  )
}

export default ToolsCards
