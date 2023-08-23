import { clusterApiUrl, Connection, PublicKey, Keypair, Transaction} from "@solana/web3.js";
import { Buffer } from "buffer";
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { confirmTransactionsFromFrontend } from './shyft';

export async function signAndConfirmTransactions(network, transactions, callback) {
    const phantom = new PhantomWalletAdapter();
    await phantom.connect();
    const rpcUrl = clusterApiUrl(network);
    const connection = new Connection(rpcUrl, "confirmed");
    const ret = await confirmTransactionsFromFrontend(connection, transactions, phantom);

    console.log("Finalizing Transaction");
    connection.onSignature(ret[0], callback, 'finalized')
    return ret;

}
// export async function signTransaction(encodedTransaction, fromPrivateKey) {
//     console.log(fromPrivateKey);
//     try {    
//       const connection = new Connection(clusterApiUrl("devnet"), 'confirmed');
//       const feePayer = Keypair.fromSecretKey(Buffer.from(fromPrivateKey, 'hex'));
//       const recoveredTransaction = Transaction.from(Buffer.from(encodedTransaction, 'base64'));
//       recoveredTransaction.partialSign(feePayer);
//       const txnSignature = await connection.sendRawTransaction(
//         recoveredTransaction.serialize(),
//       );
//       return txnSignature;
//     } catch (error) {
//       console.log(error);    
//     }
//   }