import React, { useState } from 'react';

function Transaction() {
  const [encodedTransaction, setEncodedTransaction] = useState('');
  const [decodedTransaction, setDecodedTransaction] = useState('');
  
  const handleDecode = async () => {
    try {
      const response = await fetch(`https://shyft-insider.vercel.app/api/decode-transaction?encodedTransaction=${encodedTransaction}`);
      const data = await response.json();
      setDecodedTransaction(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error:', error);
      setDecodedTransaction('Error decoding transaction.');
    }
  };

  return (
    <div className="App">
      <h2>Transaction Decoder</h2>
      <textarea
        rows="5"
        placeholder="Paste encoded transaction here..."
        value={encodedTransaction}
        onChange={(e) => setEncodedTransaction(e.target.value)}
      />
      <button onClick={handleDecode}>Decode</button>
      
      <div>
        <h3>Decoded Transaction:</h3>
        <pre>{decodedTransaction}</pre>
      </div>
    </div>
  );
}

export default Transaction
