<?php

namespace App\Exports;

use App\Models\Vehicle;
use Illuminate\Database\Eloquent\Builder;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class VehiclesExport implements FromQuery, WithHeadings, WithMapping, WithStyles, ShouldAutoSize
{
    /**
     * Query the data for export.
     *
     * @return Builder
     */
    public function query(): Builder
    {
        return Vehicle::query()->with(['maintenances', 'fuelHistories']);
    }

    /**
     * Define the headings for the exported data.
     *
     * @return array
     */
    public function headings(): array
    {
        return [
            'Vehicle ID',
            'Registration Number',
            'Type',
            'Ownership',
            'Brand',
            'Model',
            'Year',
            'Chassis Number',
            'Engine Number',
            'Registration Expiry',
            'Active Status',
            'Fuel Histories',
            'Maintenance Records',
        ];
    }

    /**
     * Map the data for each vehicle row.
     *
     * @param \App\Models\Vehicle $vehicle
     * @return array
     */
    public function map($vehicle): array
    {
        $fuelHistories = $vehicle->fuelHistories->map(function ($fuel) {
            return sprintf(
                'Driver: %s, Amount: %s L, Cost: %s, Date: %s, Notes: %s',
                $fuel->user->name ?? 'Unknown',
                $fuel->amount_liters,
                number_format($fuel->cost, 2),
                $fuel->refuel_date,
                $fuel->notes ?? 'N/A'
            );
        })->implode("\n");

        $maintenanceRecords = $vehicle->maintenances->map(function ($maintenance) {
            return sprintf(
                'Date: %s, Type: %s, Status: %s, Description: %s',
                $maintenance->scheduled_date->format('Y-m-d'),
                $maintenance->maintenance_type,
                $maintenance->status,
                $maintenance->description
            );
        })->implode("\n");

        return [
            $vehicle->id,
            $vehicle->registration_number,
            $vehicle->vehicle_type,
            $vehicle->ownership_type,
            $vehicle->brand,
            $vehicle->model,
            $vehicle->manufacturing_year,
            $vehicle->chassis_number,
            $vehicle->engine_number,
            $vehicle->registration_expiry->format('Y-m-d'),
            $vehicle->is_active ? 'Active' : 'Inactive',
            $fuelHistories,
            $maintenanceRecords,
        ];
    }

    /**
     * Apply styles to the exported sheet.
     *
     * @param Worksheet $sheet
     * @return array
     */
    public function styles(Worksheet $sheet)
    {
        return [
            1 => [
                'font' => ['bold' => true],
                'fill' => [
                    'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                    'startColor' => ['rgb' => 'E2E8F0']
                ]
            ],
            'B' => ['alignment' => ['wrapText' => true]],
        ];
    }
}
