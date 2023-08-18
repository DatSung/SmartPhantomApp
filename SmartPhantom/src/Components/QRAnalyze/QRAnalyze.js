import React, { useState, useEffect } from 'react';
import QrScanner from 'react-qr-scanner';

const QRAnalyze = () => {
    const [value, setValue] = useState();
  
    const handleScan = (value) => {
      if (value) {
        setValue(value);
      }
    };
  
    const handleError = (err) => {
      console.error(err);
    };

    const handleQrFile = (e) => {
        const file = e.target.files[0]
    }
  
    return (
      <div>
        <input type="file" placeholder='your QR' onChange={handleQrFile}></input>
        {value ? (<div>{value}</div>) : (
          <QrScanner
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '300x' }}
          />
        )}
      </div>
    );
  };
  
  export default QRAnalyze;