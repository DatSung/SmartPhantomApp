import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";

function QRCodeAnalyze() {

    const [scanResult, setScanResult] = useState(null);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 30,
        })

        scanner.render(success, error);

        function success(result) {
            scanner.clear();
            setScanResult(result);
        }

        function error(err) {
            console.warn(err);
        }
    }, []);

    return (
        <div className="QRCodeAnalyze">
            <h1>QR CODE SCANNING</h1>
            { scanResult
            ? <div>{scanResult}</div>
            : <div ></div>

            }
            <div id="reader"></div>
        </div>
    )
}

export default QRCodeAnalyze;