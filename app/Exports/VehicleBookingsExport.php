<?php

namespace App\Exports;

use App\Models\VehicleBooking;
use Illuminate\Database\Eloquent\Builder;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class VehicleBookingsExport implements FromQuery, WithHeadings, WithMapping, WithStyles, ShouldAutoSize
{
    public function query(): Builder
    {
        return VehicleBooking::query()
            ->with([
                'vehicle:id,registration_number',
                'requester:id,name',
                'driver:id,name',
                'firstReviewer:id,name',
                'secondReviewer:id,name',
                'rejecter:id,name'
            ]);
    }

    public function headings(): array
    {
        return [
            'ID',
            'Vehicle Registration',
            'Driver',
            'Requester',
            'Start Date/Time',
            'End Date/Time',
            'Purpose',
            'Destination',
            'Passenger Count',
            'Status',
            'First Reviewer',
            'First Approval Date',
            'Second Reviewer',
            'Second Approval Date',
            'Rejected By',
            'Rejection Date',
            'Rejection Reason'
        ];
    }

    public function map($row): array
    {
        return [
            $row->id,
            $row->vehicle?->registration_number,
            $row->driver?->name,
            $row->requester?->name,
            $row->start_datetime,
            $row->end_datetime,
            $row->purpose,
            $row->destination,
            $row->passenger_count,
            $row->status,
            $row->firstReviewer?->name,
            $row->first_approval_at,
            $row->secondReviewer?->name,
            $row->second_approval_at,
            $row->rejecter?->name,
            $row->rejected_at,
            $row->rejection_reason
        ];
    }

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
        ];
    }
}
