import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

import axios from 'axios';
import { QRScanner } from '@/components/QRScanner';
import { ManualInput }  from '@/components/ManualInput';
import { StaffDetails } from '@/components/StaffDetails';
import { Header } from '@/components/Header';

export interface StaffData {
  id: number;
  name: string;
  staff_id: string;
  gender: 'Male' | 'Female';
  job_role: string;
  location: string;
  state: string;
  employment_status: 'Active' | 'Inactive' | 'Suspended';
  photo: string | null;
  signature: string | null;
}

const Home = () => {
    const [staffData, setStaffData] = useState<StaffData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [scanMode, setScanMode] = useState<'qr' | 'manual'>('qr');
//   const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
 
// Effect to check for staff_id in URL on component mount
    useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const staffIdFromUrl = urlParams.get('staff_id');
    if (staffIdFromUrl && !staffData && !loading) { // Only trigger if no staff data is loaded and not already loading
        handleStaffLookup(staffIdFromUrl);
        // Optionally, clear the staff_id from the URL to prevent re-triggering on refresh
        // window.history.replaceState({}, document.title, window.location.pathname);
    }
    }, [staffData, loading]); // Depend on staffData and loading to avoid unnecessary re-runs


    const handleStaffLookup = async (staffId: string) => {
        setLoading(true);
        setError(null);
    
        try {
            // Using axios for requests, which typically handles CSRF tokens automatically
            // if configured in resources/js/bootstrap.js or app.js
            const response = await axios.get('/api/staff/verify', { params: {staff_id: staffId} });
            
            setStaffData(response.data); // axios puts response data directly in .data
        } catch (err: any) { // Use 'any' to handle various error types from axios
            if (axios.isAxiosError(err) && err.response) {
                if (err.response.status === 419) {
                    setError('Session expired or CSRF token mismatch. Please refresh the page and try again.');
                } else if (err.response.status === 404) {
                    setError('Staff ID not found.');
                } else {
                    setError('Failed to verify staff ID. Please try again.');
                }
                console.error('Staff lookup error:', err.response.data || err.response.statusText);
            } else {
                setError('An unexpected error occurred. Please try again.');
                console.error('Staff lookup error:', err);
            }
            
        // } catch (err) {
        //     setError('Staff ID not found. Please try again.');
        //     // console.error('Staff lookup error:', err);
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