import { useState } from 'react';
import { Card } from '@/components/ui/card';

import { QRScanner } from '@/components/QRScanner';
import { ManualInput }  from '@/components/ManualInput';
import { StaffDetails } from '@/components/StaffDetails';
import { Header } from '@/components/Header';

export interface StaffData {
  id: string;
  name: string;
  staffId: string;
  gender: 'Male' | 'Female';
  job_role: string;
  location: string;
  state: string;
  employment_status: 'Active' | 'Inactive' | 'Suspended';
  photo?: string;
  signature?: string;
}

const Home = () => {
  const [staffData, setStaffData] = useState<StaffData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scanMode, setScanMode] = useState<'qr' | 'manual'>('qr');
//   const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

  const handleStaffLookup = async (staffId: string) => {
        setLoading(true);
        setError(null);
    
        try {
            const response = await fetch('/api/staff/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: JSON.stringify({ staff_id: staffId })
            });
            
            if (!response.ok) {
                throw new Error('Staff ID not found');
            }
            
            const data = await response.json();
            setStaffData(data);
        } catch (err) {
            setError('Staff ID not found. Please try again.');
            // console.error('Staff lookup error:', err);
        } finally {
            setLoading(false);
        }
    };


  const handleReset = () => {
    setStaffData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {!staffData ? (
          <div className="max-w-md mx-auto space-y-6">
            <Card className="p-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-black-800 mb-2">
                  Verify Staff
                </h2>
                <p className="text-gray-600">
                  Scan QR code or enter staff ID manually
                </p>
              </div>
               
               {error && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}

              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setScanMode('qr')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    scanMode === 'qr'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  QR Scanner
                </button>
                <button
                  onClick={() => setScanMode('manual')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    scanMode === 'manual'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Manual Input
                </button>
              </div>

              {scanMode === 'qr' ? (
                <QRScanner onScan={handleStaffLookup} loading={loading} />
              ) : (
                <ManualInput onSubmit={handleStaffLookup} loading={loading} />
              )}

             
            </Card>
          </div>
        ) : (
          <StaffDetails staff={staffData} onReset={handleReset} />
        )}
      </main>
    </div>
  );
}

export default Home;