<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class VehicleFuelHistory extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'vehicle_id',
        'driver_id',
        'amount_liters',
        'cost',
        'refuel_date',
        'notes'
    ];

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'driver_id');
    }
}
