import { confirmTransactionFromFrontend } from "./signer";
//bỏ
const sign = async () => {
    const phantom = new PhantomWalletAdapter();//wallet object
    await phantom.connect();
    const rpcUrl = clusterApiUrl(network);
    const connection = new Connection(rpcUrl, "confirmed"); //connection
    var encodedTransaction;

    axios({
        // Endpoint to get NFTs
        url: `https://api.shyft.to/sol/v1/wallet/send_sol`,
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
            "x-api-key": x - Api - Key,
        },

        data: {
            network: "devnet",
            from_address: "FPbUm1gvV84BAretoxcNr4ByiPdf1muhZ1m4SQTPm9NG",
            to_address: "EBCyML6yhE8jRLDKDaFiTwfpdwHNyxrV4xC5aRYZgTrS",
            amount: 0.2,
        }

    })
        // Handle the response from backend here
        .then(async (res) => {
            encodedTransaction = res.data.result.encoded_transaction;
            //encoded transaction received in response

        })
        // Catch errors if any
        .catch((err) => {
            console.warn(err);
        });

    confirmTransactionFromFrontend(connection, encodedTransaction, phantom);

}

export default sign;