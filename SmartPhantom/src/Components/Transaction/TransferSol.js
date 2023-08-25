
import { LAMPORTS_PER_SOL, Connection, Transaction, PublicKey, SystemProgram } from "@solana/web3.js"
import { useState } from 'react';
import { getUserWalletAddress } from '../ConnectWallet/WalletService';
import { getSendingSol } from '../ConnectWallet/WalletService';



const TransferSol = () => {

  const [ReceiverWallet, setReceiverWallet] = useState(getUserWalletAddress);
  const [lamports, setLamports] = useState(getSendingSol);
  const [wallet, setWallet] = useState(getUserWalletAddress);

  async function connectWallet() {
    try {
      const resp = await window.solana.connect();
      setWallet(resp);
      
    }
    catch (err) {
    }
    window.solana.on("connect", () => console.log("Connected"))

  }
  
  async function signInTransactionAndSendMoney(lamports) {
    
    lamports = lamports * LAMPORTS_PER_SOL;
    try {
      const network = "https://api.devnet.solana.com";
      const connection = await new Connection(network);

      const destPubkeyStr = ReceiverWallet;

      console.log("starting sendMoney");
      const destPubkey = await new PublicKey(destPubkeyStr);
      const walletAccountInfo = await connection.getAccountInfo(
        wallet?.publicKey
      );
      console.log("wallet data size", walletAccountInfo?.data.length);

      const receiverAccountInfo = await connection.getAccountInfo(destPubkey);
      console.log("receiver data size", receiverAccountInfo?.data.length);

      const instruction = SystemProgram.transfer({
        fromPubkey: wallet?.publicKey,
        toPubkey: destPubkey,
        lamports, // about half a SOL
      });
      let trans = await setWalletTransaction(instruction, connection);

      let signature = await signAndSendTransaction(trans, connection);
      let result = await connection.confirmTransaction(signature, "singleGossip");
      console.log("money sent", result);
      alert("money sent")
    } catch (e) {
      console.warn("Failed", e);
    }

  }

  async function signAndSendTransaction(transaction, connection) {
    // Sign transaction, broadcast, and confirm
    const { signature } = await window.solana.signAndSendTransaction(transaction);
    await connection.confirmTransaction(signature);


    //let signedTrans = await wallet.signTransaction(transaction);
    console.log("sign transaction");
    //let signature = await connection.sendRawTransaction(signedTrans.serialize());
    console.log("send raw transaction");
    return signature;
  }

  async function setWalletTransaction(instruction, connection) {

    const transaction = new Transaction();
    transaction.add(instruction);
    transaction.feePayer = wallet?.publicKey;
    let hash = await connection.getRecentBlockhash();
    console.log("blockhash", hash);
    transaction.recentBlockhash = hash.blockhash;
    return transaction;
  }

  function sendLamports() {
    console.log("sending: " + lamports)
    signInTransactionAndSendMoney(lamports)
  }






  return (
    <div className="App">
      <br/>
      <br/>
      {/* <button onClick={connectWallet}>connect wallet</button>
      <input onChange={e => setReceiverWallet(e.target.value)} className="receiver" placeholder="receiver address" type='text' />
      <input onChange={e => setLamports(e.target.value)} type='number' placeholder='amount to transfer' > */}
      {/* </input> */}
      <button onClick={sendLamports}>Send Sol</button>


    </div>
  );
}

export default TransferSol;