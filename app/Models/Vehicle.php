<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Vehicle extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'registration_number',
        'vehicle_type',
        'ownership_type',
        'brand',
        'model',
        'manufacturing_year',
        'chassis_number',
        'engine_number',
        'registration_expiry',
        'is_active'
    ];

    public function maintenances()
    {
        return $this->hasMany(VehicleMaintenance::class);
    }

    public function bookings()
    {
        return $this->hasMany(VehicleBooking::class);
    }

    public function fuelHistories()
    {
        return $this->hasMany(VehicleFuelHistory::class);
    }
}
