import React, { useEffect, useState } from 'react';
import {
  clusterApiUrl,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  Connection,
} from '@solana/web3.js';

function TransferComponent() {
  const [encodedTransaction, setEncodedTransaction] = useState('');

  useEffect(() => {
    async function createTransferInstruction() {
      const fromPubKey = new PublicKey('GE4kh5FsCDWeJfqLsKx7zC9ijkqKpCuYQxh8FYBiTJe');
      const toPubKey = new PublicKey('AaYFExyZuMHbJHzjimKyQBAH1yfA9sKTxSzBc6Nr5X4s');
      const lamports = 100000000;

      const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
      const blockhash = (await connection.getLatestBlockhash('finalized')).blockhash;

      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: fromPubKey,
          toPubkey: toPubKey,
          lamports: lamports,
        })
      );
      tx.feePayer = fromPubKey;
      tx.recentBlockhash = blockhash;

      const serializedTransaction = tx.serializeMessage();
      const encodedTx = Buffer.from(serializedTransaction).toString('base64');

      setEncodedTransaction(encodedTx);
    }

    createTransferInstruction();
  }, []);

  return (
    <div>
      <p>Encoded Transaction: {encodedTransaction}</p>
    </div>
  );
}

export default TransferComponent;
