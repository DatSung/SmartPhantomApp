import React, { useState, useEffect } from 'react';
import './ConnectWallet.css';
import phantomWalletlogo from './img/phantomWalletLogo.jpg';
import { setUserWalletAddress } from './WalletService'; // Import hàm setWalletAddress từ file WalletService.js

const ConnectWallet = () => {
    const [walletAddress, setWalletAddressLocal] = useState(null);

    const connectWallet = async () => {
        try {
            if (window.solana) {
                const solana = window.solana;
                if (solana.isPhantom) {
                    console.log('Phantom wallet found');
                    const res = await solana.connect({ onlyIftrust: true });
                    console.log(res.publicKey.toString());
                    setWalletAddressLocal(res.publicKey.toString()); // Lưu trạng thái local
                    setUserWalletAddress(res.publicKey.toString()); // Lưu trạng thái toàn cục bằng cách gọi hàm setUserWalletAddress
                }
            } else {
                alert('Solana object not found! Get a Phantom Wallet 👻');
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className='connect-Wallet'>
            {walletAddress && (
                <div className='connected'>
                    <img className='phantom-Wallet-Logo' src={phantomWalletlogo} alt='Phantom Wallet Logo' />
                    <span className='phantom-Wallet-Address'>{`${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}`}</span>
                </div>
            )}
            {!walletAddress && (
                <div className='notConnect'>
                    <button onClick={connectWallet}>Connect Wallet</button>
                </div>
            )}
        </div>
    );
};

export default ConnectWallet;
