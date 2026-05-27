import React from 'react'
import { useEffect } from 'react';

function BarcodeGen() {
  useEffect(() => {
    document.title = "Free Barcode Generator Online - acestuffs";
  }, []);
  return (
    <div>
      this is barcode generator page
    </div>
  )
}

export default BarcodeGen
