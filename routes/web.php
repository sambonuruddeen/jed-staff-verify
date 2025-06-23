<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\StaffController;

// Route::get('/', [StaffController::class, 'index'])->name('staff.index');
Route::post('/api/staff/verify', [StaffController::class, 'verify'])->name('staff.verify');


Route::get('/', function () {
    //return Inertia::render('welcome');
    return Inertia::render('home', [
        'title' => 'Welcome to Our Application',
        'description' => 'This is the home page of our application built with Laravel and Inertia.js.',
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
