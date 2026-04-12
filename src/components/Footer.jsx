import React from 'react'

function Footer() {
  return (
    <footer className="sticky top-[100vh] w-full bg-gray-50 py-4 px-8 border-t border-gray-200">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <p className="text-gray-400 text-xs italic">Acestuffs.in tools</p>
        <p className="text-gray-600 text-sm">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}

export default Footer
