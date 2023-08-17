import React, { useState } from "react";
import { useEffect } from "react";
import QRCode from "qrcode.react";
import './QRCodeGenerate.css'

const QRCodeGenerate = () => {
    const [url, setUrl] = useState("");
    const [showFlag, setShowFlag] = useState(false);
    const [qrUrl, setQrUrl] = useState(""); // Thêm state để lưu URL cho QR code
    const [noSol, setNoSol] = useState(0);
    const [isNumber, setIsNumber] = useState(true);

    const handleShow = (e) => {
        e.preventDefault();
        if (url) {
            setQrUrl(url); // Lưu URL cho QR code
            setShowFlag(true);
        }
    };
    useEffect(() => {
        // Kiểm tra xem noSol có phải là số hay không
        if (noSol !== "" && isNaN(noSol)) {
            setIsNumber(false);
            setShowFlag(false);
        } else {
            setIsNumber(true);
        }
    }, [noSol]);

    return (
        <div className="app">
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
            <div className="app-qr">
                {showFlag && (
                    <div className="qr-code">
                        <QRCode
                            size={100}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            value={qrUrl + '-' + noSol} // Sử dụng qrUrl thay vì url để hiển thị QR code
                            viewBox="0 0 256 256"
                        />
                    </div>
                )}
                {/* //download */}
            </div>
        </div>
    );
};
export default QRCodeGenerate;


