<?php

namespace App\Exports;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class UsersExport implements FromQuery, WithHeadings, WithMapping, WithStyles, ShouldAutoSize
{
    /**
     * Query the data for export.
     *
     * @return Builder
     */
    public function query(): Builder
    {
        return User::query();
    }

    /**
     * Define the headings for the exported data.
     *
     * @return array
     */
    public function headings(): array
    {
        return [
            'ID',
            'Name',
            'Email',
            'Role',
        ];
    }

    /**
     * Map the data for each user row.
     *
     * @param \App\Models\User $user
     * @return array
     */
    public function map($user): array
    {
        return [
            (string) $user->id,
            $user->name,
            $user->email,
            $user->getRoleNames()->first() ?? 'Not Assigned',
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
        ];
    }
}
