import React, { useState } from "react";
import ConnectWallet from "./Components/ConnectWallet/ConnectWallet.js";
import QRCodeGenerate from "./Components/QRCodeGenerate/QRCodeGenerate.js";
import QRCodeAnalyze from "./Components/QRCodeAnalyze/QRCodeAnalyze.js";
import { getUserWalletAddress } from "./Components/ConnectWallet/WalletService.js";
import "./App.css";

const App = () => {
  const [option, setOption] = useState('generate')
  const [flag, setflag] = useState(false)
  const handleNav = (e) => {
    setOption(e.target.value)
  }
  const handleShow = () =>{
    setflag(true)
  } 

  return (

    <div className="container">

      <header className="header">
        <div className="header-wrapper">

          <div className="nav-button-list">
            <button type="button" value="generate" onClick={handleNav}>Generate</button>
            <button type="button" value="analyze" onClick={handleNav}>Analyze</button>
            <button type="button" value="chat" onClick={handleNav}>Chat</button>
          </div>
          <div className="connect-Wallet-Button" onClick={handleShow}>
            <ConnectWallet  />
          </div>
        </div>
      </header>


      {
        flag == true &&
        (<div>
        {
          (option === "generate") &&
          <QRCodeGenerate />
        }
        {
          (option === "analyze") &&
          <QRCodeAnalyze />
        }
      </div>)

      }
      




    </div>
  );
};

export default App;
