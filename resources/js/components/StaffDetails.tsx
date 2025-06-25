
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Building, User, CheckCircle, XCircle, AlertCircle, ShieldCheck, LocateFixed, Circle, VenusAndMars, SignatureIcon } from 'lucide-react';
import { StaffData } from '@/pages/home';

interface StaffDetailsProps {
  staff: StaffData;
  onReset: () => void;
}

const ImagePlaceholder = () => (
        <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
            <User className="w-10 h-10 text-white/70" />
        </div>
);

const SignaturePlaceholder = () => (
      <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
          <SignatureIcon className="w-10 h-10 text-black/40" />
      </div>
);

export const StaffDetails = ({ staff, onReset }: StaffDetailsProps) => {
  const getStatusColor = (status: StaffData['employment_status']) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Inactive':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Suspended':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: StaffData['employment_status']) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="w-4 h-4" />;
      case 'Inactive':
        return <XCircle className="w-4 h-4" />;
      case 'Suspended':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <XCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Button 
          onClick={onReset} 
          variant="ghost" 
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Search
        </Button>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg pt-6 pb-4 -mt-6">
          <div className="flex items-center gap-4 bg-op">
            {staff.photo ? (
              <img
                        src={staff.photo}
                        alt={`Photo of ${staff.name}`}
                        className="w-30 h-30 rounded-full border-4 border-white/20 object-fill bg-sky-500/50"
                        onError={(e) => {
                            // This handles cases where the URL is present but the image fails to load.
                            // You can replace it with a placeholder image.
                            e.currentTarget.style.display = '<ImagePlaceholder />'; // Hide broken image
                            // Or show a placeholder:
                            // e.currentTarget.src = '/images/placeholder.png';
                            // e.currentTarget.onerror = null; // Prevent infinite loops
                        }}
                    />
                ) : (
                    <ImagePlaceholder />
                )}
            <div>
              <h2 className="text-2xl font-bold">{staff.name}</h2>
              <p className="text-blue-100">Staff ID: {staff.staff_id}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-500" />
                    <div>
                    <p className="text-sm text-gray-500">Job Role</p>
                    <p className="font-medium">{staff.job_role}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <VenusAndMars className="w-5 h-5 text-gray-500" />
                    <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-medium">{staff.gender}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Building className="w-5 h-5 text-gray-500" />
                    <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{staff.location}</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <LocateFixed className="w-5 h-5 text-gray-500" />
                    <div>
                    <p className="text-sm text-gray-500">State/Region</p>
                    <p className="font-medium">{staff.state}</p>
                    </div>
                </div>

                
            </div>

            <div className="flex flex-col items-center justify-center">
                <div className="text-center">
                    <p className="text-sm text-gray-500 mb-2">Employment Status</p>
                    <Badge 
                    className={`px-4 py-2 text-base font-medium flex items-center gap-2 ${getStatusColor(staff.employment_status)}`}
                    >
                    {getStatusIcon(staff.employment_status)}
                    {staff.employment_status}
                    </Badge>
                </div>
                
            </div>
          </div>

          
            <div className="mt-8 p-2 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                    <div>
                    <p className="text-sm font-medium text-gray-700">Verification Status</p>
                    <p className="text-xs text-green-500">
                        Verified
                    </p>
                    </div>
                    {/* <ShieldCheck className="w-8 h-8 text-orange-500" /> */}
                    <div>
                        {staff.signature ? (
                            <img 
                                src={staff.signature} 
                                alt={staff.name}
                                className="w-40 h-20 rounded-md object-fill"
                            />
                            ) : (
                                <SignaturePlaceholder />
                            )}
                    </div>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
};