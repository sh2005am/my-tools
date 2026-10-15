import React from 'react'
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

function BarcodeGen() {
  useEffect(() => {
    document.title = "Free Barcode Generator Online - acestuffs";
  }, []);
  return (
    <div>
      <Helmet>
        <title>Free Barcode Generator - Create Barcodes Instantly</title>
        <meta name="description" content="Generate standard barcodes for products and inventory instantly. Secure, offline barcode maker with no downloads required." />
        <link rel="canonical" href="https://tools.acestuffs.in/barcode-generator" />
      </Helmet>
      this is barcode generator page
    </div>
  )
}

export default BarcodeGen
