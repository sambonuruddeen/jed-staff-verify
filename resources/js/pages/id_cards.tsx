import { useState, useEffect } from 'react';
import axios from 'axios';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StaffData } from '@/pages/home'; // Import StaffData interface
import { Button } from '@/components/ui/button';
import { QrCodeIcon } from 'lucide-react';

// Extend StaffData if there are other fields from the Staff model you want to display
interface StaffMember extends StaffData {}
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'ID Cards',
        href: '/id_cards',
       
    },
    
];

export default function IdCards() {
    const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const response = await axios.get('/api/staff');
                setStaffMembers(response.data);
            } catch (err) {
                console.error('Failed to fetch staff:', err);
                setError('Failed to load staff data.');
            } finally {
                setLoading(false);
            }
        };
        fetchStaff();
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="ID Cards" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        {/* Summary of ID Cards */}

                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    {/* Link the button to the backend route for generating all ID cards */}
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border flex items-center justify-center p-4">
                        <a href={route('staff.generate_id_cards')} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                            <Button variant="outline" className='bg-blue-500 text-white hover:bg-blue-600 hover:text-white rounded-md p-2 w-full h-full'>Generate All ID Cards</Button>
                        </a>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border"> 
                    {loading && <p className="p-4 text-center">Loading staff data...</p>}
                    {error && <p className="p-4 text-center text-red-500">{error}</p>}
                    {!loading && !error && staffMembers.length === 0 && (
                        <p className="p-4 text-center">No staff members found.</p>
                    )}
                    {!loading && !error && staffMembers.length > 0 && (
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Staff ID</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Gender</TableHead>
                                    <TableHead>Job Role</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Employment Status</TableHead>
                                    <TableHead>QR Code</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {staffMembers.map((staff) => (
                                    <TableRow key={staff.id}> 
                                        <TableCell>{staff.staff_id}</TableCell>
                                        <TableCell>{staff.name}</TableCell>
                                        <TableCell>{staff.gender}</TableCell>
                                        <TableCell>{staff.job_role}</TableCell>
                                        <TableCell>{staff.location}</TableCell>
                                        <TableCell>{staff.employment_status}</TableCell>
                                        <TableCell>
                                            <a href={route('generate.qr', staff.staff_id)} target="_blank" rel="noopener noreferrer">
                                                <Button variant="outline" size="sm">
                                                    <QrCodeIcon className="w-4 h-4 mr-2" /> Generate QR
                                                </Button>
                                            </a>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
