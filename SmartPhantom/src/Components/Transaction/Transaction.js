import React from "react";

const SendSOL = ({ network, fromAddress, toAddress, amount }) => {
  const sendSOL = () => {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "pixsiRaAQH5riAVC");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      network,
      from_address: fromAddress,
      to_address: toAddress,
      amount,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://api.shyft.to/sol/v1/wallet/send_sol", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <button onClick={sendSOL}>Send SOL</button>
  );
};

export default SendSOL;
