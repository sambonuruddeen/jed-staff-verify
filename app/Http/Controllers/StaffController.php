<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use Illuminate\Http\Request;
use Inertia\Inertia;

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

        return response()->json([
            'id' => $staff->staff_id,
            'name' => $staff->name,
            'gender' => $staff->gender,
            'job_role' => $staff->job_role,
            'location' => $staff->location,
            'state' => $staff->state,
            'employment_status' => $staff->employment_status,
            //'hire_date' => $staff->hire_date,
            'photo' => $staff->photo,
            'signature' => $staff->signature,
        ]);
    }
}
