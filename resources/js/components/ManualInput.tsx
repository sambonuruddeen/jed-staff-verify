
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface ManualInputProps {
  onSubmit: (staffId: string) => void;
  loading: boolean;
}

export const ManualInput = ({ onSubmit, loading }: ManualInputProps) => {
  const [staffId, setStaffId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (staffId.trim()) {
      onSubmit(staffId.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="staffId" className="block text-sm font-medium text-gray-700">
          Staff ID
        </label>
        <Input
          id="staffId"
          type="text"
          placeholder="Enter staff ID (e.g., 0101)"
          value={staffId}
          onChange={(e) => setStaffId(e.target.value)}
          disabled={loading}
          className="w-full"
        />
      </div>
      
      <Button 
        type="submit" 
        disabled={!staffId.trim() || loading}
        className="w-full"
      >
        <Search className="w-4 h-4 mr-2" />
        {loading ? 'Verifying...' : 'Verify Staff'}
      </Button>
    </form>
  );
};