<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class VehicleMaintenance extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'vehicle_id',
        'scheduled_date',
        'maintenance_type',
        'description',
        'status'
    ];

    protected $casts = [
        'scheduled_date' => 'date',
    ];

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }
}
