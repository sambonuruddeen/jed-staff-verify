
import { Building2 } from 'lucide-react';
import AppLogo from '@/components/app-logo';

export const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
            <AppLogo />
          <div>
            <h1 className="text-xl font-bold text-gray-800">
                Staff Verification Portal
              
            </h1>
            <p className="text-sm text-gray-600">Jos Electricity Distribution Company</p>
          </div>
        </div>
      </div>
    </header>
  );
};