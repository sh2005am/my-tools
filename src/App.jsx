import React from 'react'
import { Routes, Route, Link} from 'react-router-dom'
import Home from './pages/Home'
import JsonTool from './pages/JsonTool'
import QRgenrator from './pages/QRgenrator'
import BarcodeGen from './pages/BarcodeGen'
import PdfMerger from './pages/PdfMerger'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Navbar from './components/Navbar'


function App() {
  return (
    <div className="flex flex-col min-h-screen">
      
      <Header />
      <Navbar />

      {/* 2. Wrap Routes in a main tag with flex-grow */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/json-tool" element={<JsonTool />} />
          <Route path="/qr-generator" element={<QRgenrator />} />
          <Route path="/barcode-generator" element={<BarcodeGen />} />
          <Route path="/pdf-merger" element={<PdfMerger />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
