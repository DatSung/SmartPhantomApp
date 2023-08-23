import { useState } from "react";
import axios from "axios";
import { signAndConfirmTransactions } from "./common";
import { getUserWalletAddress } from "../ConnectWallet/WalletService";
import { getTargetWalletAddress } from "../ConnectWallet/WalletService";


const ListTransfer = () => {
  const [network, setNetwork] = useState("devnet");
  const [address, setAddress] = useState(getUserWalletAddress);
  const [sendAddr, setSendAddr] = useState(getTargetWalletAddress);
  const [transferArr, setTransferArr] = useState([]);



  const xKey = "0jNKUabsERYbIDh2"; //Enter Your X-API-KEY here

  let url = 'https://api.shyft.to/sol/v1/wallet/send_sol';
  var transactions;


  const callback = (signature, result) => {
    console.log("Signature ", signature);
    console.log("result ", result);
  };

  const sendSol = () => {

    axios({
      // Endpoint to list
      url: url,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": xKey,
      },
      data: {
        "network": network,
        "from_address": address,
        "to_address": sendAddr,
        "amount": 0.3
      },
    })
      // Handle the response from backend here
      .then(async (res) => {
        console.log(res.data);
        if (res.data.success == true) {
          transactions = res.data.result.encoded_transaction;
          console.log(transactions)
          const ret_result = await signAndConfirmTransactions(
            network,
            transactions,
            callback
          );
          
        }
      })
      // Catch errors if any
      .catch((err) => {
        console.warn(err);
      });

  };

  return (
    <div>
      <div className="container border border-2 border-primary p-3 mt-5">
        <div className="row pt-2">
          <div className="col-sm-5">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your Wallet Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="row pt-2">
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Receiver Wallet Address"
              value={sendAddr}
              onChange={(e) => setSendAddr(e.target.value)}
            />
          </div>
          <div className="col-sm-2">
            <button className="btn btn-info w-100" onClick={sendSol}>
              Send_sol
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListTransfer;