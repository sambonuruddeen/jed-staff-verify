<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\StaffController;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

// Route::get('/', [StaffController::class, 'index'])->name('staff.index');

Route::get('/', function () {
    //return Inertia::render('welcome');
    return Inertia::render('home', [
        'title' => 'Welcome to JED Staff Verification Portal',
        'description' => 'This is the home page of our application built with Laravel and Inertia.js.',
    ]);
})->name('home');

Route::get('/api/staff/verify', [StaffController::class, 'verify'])->name('staff.verify');


Route::middleware(['auth', 'verified'])->group(function () {
    
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

     // Gett All Staff Members
    Route::get('/api/staff', [StaffController::class, 'listStaff'])->name('staff.list');

    // ID Cards Dashboard Route
    Route::get('id_cards', function () {
        return Inertia::render('id_cards');
    })->name('id_cards');

    // Route to generate QR codes for staff ID cards
    Route::get('/qr-code/{staff_id}', function ($staff_id) {
        // dd($staff_id);
        $appUrl = config('app.url'); // Get your application's base URL from .env APP_URL
        $verificationUrl = "{$appUrl}/?staff_id={$staff_id}"; // Construct the URL with the staff_id query parameter

        return QrCode::size(300)->generate($verificationUrl); // Generate and return the QR code image
    })->name('generate.qr');

    // Route to generate ID cards for all staff members
    Route::get('/api/staff/id_cards', [StaffController::class, 'generateIdCards'])->name('staff.generate_id_cards');
    
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
