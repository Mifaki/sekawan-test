<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class CombinedExport implements WithMultipleSheets
{
    public function sheets(): array
    {
        return [
            'Users' => new UsersExport(),
            'Vehicles' => new VehiclesExport(),
            'Vehicle Bookings' => new VehicleBookingsExport(),
        ];
    }
}
