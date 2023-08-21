import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode.react";
import { getWalletAddress } from "../ConnectWallet/WalletService";
import './QRCodeGenerate.css'


const QRCodeGenerate = () => {
    const [url, setUrl] = useState(getWalletAddress);
    const [showFlag, setShowFlag] = useState(false);
    const [noSol, setNoSol] = useState(0);
    const [isNumber, setIsNumber] = useState(true);
    const qrRef = useRef();

    const downloadQRCode = () => {
        const canvas = qrRef.current.querySelector('canvas');
        const image = canvas.toDataURL('image/png');

        const anchor = document.createElement('a');
        anchor.href = image;
        anchor.download = 'qr-code.png';

        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    };
    const handleShow = (e) => {
        e.preventDefault();
        if (url) {
            setUrl(url); // Lưu URL cho QR code
            setShowFlag(true);
        }
    };
    useEffect(() => {
        // Kiểm tra xem noSol có phải là số hay không
        if (isNaN(noSol) || noSol < 0) {
            setIsNumber(false);
            setShowFlag(false);
        } else {
            setIsNumber(true);
        }
    }, [noSol]);

    return (
        <div className="app" >
            <h1 className="app-title">QR CODE GENERATE</h1>

            <form className="app-form" onSubmit={handleShow}>
                <input
                    required
                    type="text"
                    placeholder="Enter a valid URL"
                    value={url}
                    name="url"
                    onChange={(e) => setUrl(e.target.value)}
                />
                <br></br>
                <input
                    required
                    type="text"
                    value={noSol}
                    name="sol"
                    onChange={(e) => setNoSol(e.target.value)}
                    className={!isNumber ? "error" : ""}
                />
                <div className="app-alert">
                    {!isNumber && <p className="error-message">SOL has to be a number</p>}
                </div>
                <br></br>
                <div className="app-submit">
                    <button type="submit" disabled={!isNumber}>Generate</button>
                </div>
            </form>
            <div ref={qrRef} className="app-qr">
                {showFlag && (
                    <div className="qr-code">
                        <QRCode
                            size={100}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            value={url + '-' + noSol} // Sử dụng qrUrl thay vì url để hiển thị QR code
                            viewBox="0 0 300 300"

                        />
                    </div>
                )}
                {showFlag && (
                    <div className="download_button">
                        <button onClick={downloadQRCode} disabled={!showFlag}>Download QR Code</button>
                    </div>)
                }


            </div>
        </div>
    );
};
export default QRCodeGenerate;


