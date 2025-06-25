<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use SimpleSoftwareIO\QrCode\Facades\QrCode;


class StaffController extends Controller
{
    public function index()
    {
        return Inertia::render('home');
    }

    public function verify(Request $request)
    {
        
        $request->validate([
            'staff_id' => 'required|string'
        ]);

        $staff = Staff::where('staff_id', $request->staff_id)->first();

        if (!$staff) {
            return response()->json([
                'error' => 'Staff ID not found'
            ], 404);
        }
        
        // Construct filenames based on a convention (e.g., p<staff_id>.png)
        $photoFilename = 'p' . $staff->staff_id . '.png';
        $signatureFilename = 's' . $staff->staff_id . '.png';

        $photoPath = 'Passports/' . $photoFilename;
        $signaturePath = 'Signatures/' . $signatureFilename;

        $photoUrl = Storage::disk('public')->exists($photoPath)
            ? Storage::disk('public')->url($photoPath)
            : null;

        $signatureUrl = Storage::disk('public')->exists($signaturePath)
            ? Storage::disk('public')->url($signaturePath)
            : null;

        

        return response()->json([
            'id' => $staff->id,
            'staff_id' => $staff->staff_id, 
            'name' => $staff->name,
            'gender' => $staff->gender,
            'job_role' => $staff->job_role,
            'location' => $staff->location,
            'state' => $staff->state,
            'employment_status' => $staff->employment_status,
            //'hire_date' => $staff->hire_date,
            'photo' => $photoUrl,
            'signature' => $signatureUrl,
        ]);
    }

    public function generateIdCards(Request $request)
    {
        $batch = 2; // Default to batch 1 if not provided
        $batchSize = 50;
        $offset = ($batch - 1) * $batchSize;

        $outputDir = storage_path('app/public/id_cards');
        if (!file_exists($outputDir)) {
            mkdir($outputDir, 0755, true);
        }

        $staffMembers = Staff::offset($offset)->limit($batchSize)->get();

        foreach ($staffMembers as $staff) {
            $verificationUrl = url('http://verify.jedplc.com?staff_id=' . $staff->staff_id);
            $qrCodeImage = QrCode::format('png')->size(200)->generate($verificationUrl);
            $fileName = $staff->staff_id . '.png';
            $filePath = $outputDir . DIRECTORY_SEPARATOR . $fileName;
            file_put_contents($filePath, $qrCodeImage);
        }

        return response()->json([
            'message' => "Batch $batch generated successfully.",
            'count' => $staffMembers->count(),
        ]);
    }

    // public function generateIdCards()
    // {
    //     $outputDir = storage_path('app/public/id_cards');
    //     if (!file_exists($outputDir)) {
    //         mkdir($outputDir, 0755, true);
    //     }

    //     // Process staff in batches to avoid timeout
    //     Staff::chunk(50, function ($staffMembers) use ($outputDir) {
    //         foreach ($staffMembers as $staff) {
    //             // $verificationUrl = route('home', ['staff_id' => $staff->staff_id], true); // Use absolute URL
    //             $verificationUrl = url('http://verify.jedplc.com?staff_id=' . $staff->staff_id);
                
    //             $qrCodeImage = base64_encode(QrCode::format('png')->size(200)->generate($verificationUrl));
    //             $fileName = $staff->staff_id . '.png';
    //             $filePath = $outputDir . DIRECTORY_SEPARATOR . $fileName;
    //             file_put_contents($filePath, base64_decode($qrCodeImage));
                
    //         }
    //     });
        

        


    //     // Pass $idCards to a Blade view that's rendered to PDF
    //     //return view('id_cards.template', compact('idCards'));
    // }

    public function listStaff()
    {
        $staff = Staff::all(); // Fetch all staff members
        return response()->json($staff);
    }

}
