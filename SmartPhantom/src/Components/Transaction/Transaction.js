import React, { useState } from "react";

const TransferToken = () => {
  const [response, setResponse] = useState(null);

  const handleTransfer = async () => {
    const url = "https://api.shyft.to/sol/v1/wallet/send_sol";
    const headers = {
      "Content-Type": "application/json",
      "x-api-key": 'pixsiRaAQH5riAVC',
    };
    
    const payload = {
      network: "devnet",
      from_address: "FPbUm1gvV84BAretoxcNr4ByiPdf1muhZ1m4SQTPm9NG",
      to_address: "2fmz8SuNVyxEP6QwKQs6LNaT2ATszySPEJdhUDesxktc",
      amount: 0.2,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });
      
      const result = await response.text();
      setResponse(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <button onClick={handleTransfer}>Transfer Token</button>
      {response && <p>Response: {response.result}</p>}
    </div>
  );
};

export default TransferToken;
