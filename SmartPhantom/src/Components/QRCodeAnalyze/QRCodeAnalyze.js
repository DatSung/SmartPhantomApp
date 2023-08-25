import React, { useState } from 'react';
import jsQR from 'jsqr';
import './QRCodeAnalyze.css'
import TransferSol from '../Transaction/TransferSol';
import { setSendingSol } from '../ConnectWallet/WalletService';
import { setTargetWalletAddress } from '../ConnectWallet/WalletService';

const QRAnalyze = () => {

  const [qrData, setQrData] = useState('');

  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (event) => {
        const imageSrc = event.target.result;

        const img = new Image();
        img.src = imageSrc;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, img.width, img.height);

          const imageData = ctx.getImageData(0, 0, img.width, img.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);

          if (code) {
            setQrData(code.data);
            setSendingSol(code.data)
            setTargetWalletAddress(code.data)
          } else {
            console.error('No QR code found.');
          }
        };
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="QRCodeReader">
      <h1 className='tiltle'>QR CODE READER</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <TransferSol qrCode = {qrData}/>
    </div>
  );
}

export default QRAnalyze;
