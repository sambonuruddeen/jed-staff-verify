
import { useState } from 'react';
import { Camera, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Scanner } from '@yudiel/react-qr-scanner';
import { readBarcodes } from 'zxing-wasm/reader';
import type { IDetectedBarcode } from '@yudiel/react-qr-scanner/dist/types';

interface QRScannerProps {
  onScan: (staffId: string) => void;
  loading: boolean;
}

export const QRScanner = ({ onScan, loading }: QRScannerProps) => {
  const [scanMethod, setScanMethod] = useState<'camera' | 'upload'>('camera');

  const currentYear = new Date().getFullYear();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const results = await readBarcodes(file, { formats: ['QRCode'] });
        if (results && results.length > 0) {
          onScan(results[0].text); // zxing-wasm returns 'text' for the decoded value
        }
      } catch (error) {
        console.error('Error decoding QR code from image:', error);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setScanMethod('camera')}
          className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors ${
            scanMethod === 'camera'
              ? 'bg-blue-100 text-blue-700 border border-blue-300'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Camera className="w-4 h-4 inline mr-1" />
          Camera
        </button>
        <button
          onClick={() => setScanMethod('upload')}
          className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors ${
            scanMethod === 'upload'
              ? 'bg-blue-100 text-blue-700 border border-blue-300'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Upload className="w-4 h-4 inline mr-1" />
          Upload
        </button>
      </div>

      {scanMethod === 'camera' ? (
        <div className="space-y-4 relative">
          {/* The Scanner component will render the camera feed */}
          <Scanner
            onScan={(result: IDetectedBarcode[]) => {
              if (result && result.length > 0) {
                onScan(result[0].rawValue); // Use rawValue from @yudiel/react-qr-scanner
              }
            }}
            onError={(error) => {
              console.error('QR Scanner Error:', error);
            }}
            constraints={{ audio: false, video: { facingMode: 'environment' } }} // Prefer back camera
            formats={['qr_code']} // Only scan QR codes
            paused={loading} // Pause scanning when lookup is in progress
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 mb-4">Upload QR code image</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="qr-upload"
              disabled={loading}
            />
            <label
              htmlFor="qr-upload"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer disabled:opacity-50"
            >
              Choose File
            </label>
          </div>
        </div>
      )}

      <div className="text-xs text-gray-500 text-center">
        <p>&copy; {currentYear} Jos Electricity Distribution PLC.</p>
        <p>All rights reserved.</p>
      </div>
    </div>
  );
};