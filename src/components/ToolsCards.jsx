import React from 'react'

function ToolsCards(props) {
    const { toolName, toolDescription, image } = props
  return (
   <div className="flex flex-col h-full rounded-xl border border-gray-200 bg-gray-600 overflow-hidden hover:shadow-md transition-shadow">
      
      {/* Image Container */}
      <div className="w-full aspect-video overflow-hidden">
        <img 
          src={image}
          className="w-full h-full object-cover" 
          alt={toolName} 
        />
      </div>

      {/* Content Area - flex-grow ensures this area fills the card */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-black">
          {toolName}
        </h3>
        <p className="text-sm text-black-600 leading-relaxed">
          {toolDescription}
        </p>
      </div>

    </div>
  )
}

export default ToolsCards
