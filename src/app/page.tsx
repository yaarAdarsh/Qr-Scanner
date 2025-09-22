'use client'

import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';
import { useState } from 'react';

export default function Home() {
  const [result, setResult] = useState<string>('');
  const [scanning, setScanning] = useState(false);
  const [scanner, setScanner] = useState<Html5QrcodeScanner | null>(null);

  const startScanning = () => {
    if (scanning) return;

    const newScanner = new Html5QrcodeScanner(
      'reader',
      {
        qrbox: { width: 250, height: 250 },
        fps: 5,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
      },
      false
    );

    newScanner.render(
      (decodedText) => {
        newScanner.clear();
        setResult(decodedText);
        setScanning(false);
      },
      (errorMessage) => {
        console.warn(errorMessage);
      }
    );

    setScanner(newScanner);
    setScanning(true);
  };

  const stopScanning = () => {
    if (scanner) {
      scanner.clear().then(() => {
        setScanning(false);
        setScanner(null);
      }).catch(err => {
        console.error('Failed to clear scanner', err);
      });
    }
  };

  return (
    <div>
      <h1>QR Code Scanner</h1>
      <button onClick={startScanning} disabled={scanning}>
        {scanning ? 'Scanning...' : 'Start Scan'}
      </button>
      {scanning && (
        <button onClick={stopScanning}>Stop Scan</button>
      )}
      <div id="reader" style={{ width: '300px', marginTop: '20px' }}></div>
      <p>Result: {result}</p>
    </div>
  );
}
