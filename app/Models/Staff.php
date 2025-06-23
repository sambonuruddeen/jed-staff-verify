<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    //
    protected $table = 'staff';
    protected $fillable = [
        'uuid',
        'staff_id',
        'name',
        'gender',
        'job_role',
        'location',
        'state',
        'employment_status',
        //hire_date',
        'photo',
        'signature',
    ];

    // protected $casts = [
    //     'hire_date' => 'date',
    // ];
}
