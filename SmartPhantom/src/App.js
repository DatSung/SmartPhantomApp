import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ConnectWallet from "./Components/ConnectWallet/ConnectWallet.js";
import QRCodeGenerate from "./Components/QRCodeGenerate/QRCodeGenerate.js";
import QRCodeAnalyze from "./Components/QRCodeAnalyze/QRCodeAnalyze.js";
import Transaction from "./Components/Transaction/Transaction.js";
import SendMoneyComponent from "./Components/Transaction/SendMoneyComponent.js";
import ListAll from "./Components/ListAll/ListAll.js";
import Details from "./Components/ListAll/Detail.js";
import "./App.css";

const App = () => {
  const [option, setOption] = useState('generate')

  const handleNav = (e) => {
    setOption(e.target.value)
  }




  return (

    <div className="container">

      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<ListAll />} />
            <Route exact path="/view-details" element={<Details />} />
          </Routes>
        </Router>
      </div>

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
        {
          (option === "analyze") &&
          <QRCodeAnalyze />
        }
        {
          (option === "chat") &&

          <Transaction />

        }
      </div>





    </div>
  );
};

export default App;
