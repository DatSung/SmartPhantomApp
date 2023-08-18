import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import QrReader from 'react-qr-reader';

const QRCodeAnalyzer = () => {
  const [qrData, setQrData] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleScan = (data) => {
    if (data) {
      setQrData(data);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const onDrop = (acceptedFiles) => {
    const imageFile = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageDataURL = event.target.result;
      setQrData('');
      setUploadedImage(imageDataURL);
    };
    reader.readAsDataURL(imageFile);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop,
  });

  return (
    <div>
      <h2>QR Code Analyzer</h2>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag and drop an image here, or click to select an image.</p>
      </div>
      {uploadedImage && (
        <div className="uploaded-image">
          <img src={uploadedImage} alt="Uploaded QR Code" />
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100%' }}
          />
          {qrData && <p>QR Code Data: {qrData}</p>}
        </div>
      )}
    </div>
  );
};

export default QRCodeAnalyzer;
