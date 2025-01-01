<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class VehicleBooking extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'vehicle_id',
        'driver_id',
        'requested_by',
        'start_datetime',
        'end_datetime',
        'purpose',
        'destination',
        'passenger_count',
        'first_reviewer',
        'second_reviewer'
    ];

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class, 'vehicle_id');
    }

    public function firstReviewer()
    {
        return $this->belongsTo(User::class, 'first_reviewer');
    }

    public function secondReviewer()
    {
        return $this->belongsTo(User::class, 'second_reviewer');
    }

    public function requester()
    {
        return $this->belongsTo(User::class, 'requested_by');
    }

    public function rejecter()
    {
        return $this->belongsTo(User::class, 'rejected_by');
    }

    public function driver()
    {
        return $this->belongsTo(User::class, 'driver_id');
    }
}
