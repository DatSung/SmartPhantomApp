import React, { useState } from "react";
import { useEffect } from "react";
import ConnectWallet from "./Components/ConnectWallet/ConnectWallet.js";
import QRCodeGenerate from "./Components/QRCodeGenerate/QRCodeGenerate.js";
// import QRAnalyze from "./Components/QRAnalyze/QRAnalyze.js";
import "./App.css";

const App = () => {
  const [option, setOption] = useState('generate')

  const handleNav = (e) => {
    setOption(e.target.value)
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

          <div className="connect-Wallet-Button">
            <ConnectWallet />
          </div>

        </div>

      </header>

      <div>
        {
          (option === "generate") &&
          <QRCodeGenerate />
        }
        {/* {
          (option === "analyze") &&
          <QRAnalyze />
        } */}
      </div>
  
       



    </div>
  );
};

export default App;
