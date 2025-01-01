<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class VehicleBooking extends Model
{
    use SoftDeletes;

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function requester()
    {
        return $this->belongsTo(User::class, 'requested_by');
    }

    public function driver()
    {
        return $this->belongsTo(User::class, 'driver_id');
    }
}
