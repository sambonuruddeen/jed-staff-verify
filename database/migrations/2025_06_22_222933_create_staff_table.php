<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('staff', function (Blueprint $table) {
            $table->id();
            $table->string('uuid')->unique();
            $table->string('staff_id')->unique();
            $table->string('name');
            $table->enum('gender', ['Male', 'Female']);
            $table->string('job_role');
            $table->string('location');
            $table->string('state');
            $table->enum('employment_status', ['Active', 'Inactive', 'Suspended']);
            // $table->date('hire_date');
            $table->string('photo')->nullable();
            $table->string('signature')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('staff');
    }
};
