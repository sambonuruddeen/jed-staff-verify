<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StaffTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('users')->insert(
            [
            'uuid' => Str::random(10),
            'staff_id' => Str::random(10).'@example.com',
            'name' => Hash::make('password'),
            'gender' => Hash::make('password'),
            'job_role' => Hash::make('password'),
            'location' => Hash::make('password'),
            'state' => Hash::make('password'),
            'employment_status' => Hash::make('password'),
            'photo' => '',
            'signature' => '',
        ]
    );
         
    }
}
