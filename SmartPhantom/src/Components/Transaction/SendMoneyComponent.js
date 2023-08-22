import React, { useState } from 'react';
import { getUserWalletAddress } from '../ConnectWallet/WalletService';
import axios from 'axios';

const SendMoneyComponent = () => {
  const [response, setResponse] = useState('');

  const sendMoney = async () => {
    try {
      const response = await axios.post(
        'https://api.shyft.to/sol/v1/wallet/send_sol',
        {
          network: 'devnet',
          from_address: getUserWalletAddress,
          to_address: 'EBCyML6yhE8jRLDKDaFiTwfpdwHNyxrV4xC5aRYZgTrS',
          amount: 0.322
        },
        {
          headers: {
            'x-api-key': 'pixsiRaAQH5riAVC'
          }
        }
      );

      setResponse(JSON.stringify(response.data, null, 2));
    } catch (error) {
      setResponse('An error occurred.');
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={sendMoney}>Gửi tiền từ ví Phantom</button>
      <pre>{response}</pre>
    </div>
  );
};

export default SendMoneyComponent;
