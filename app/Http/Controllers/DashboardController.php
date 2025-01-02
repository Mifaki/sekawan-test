<?php

namespace App\Http\Controllers;

use App\Exports\CombinedExport;
use App\Models\User;
use App\Models\Vehicle;
use App\Models\VehicleBooking;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Enums\VehicleBookingStatusEnum;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Maatwebsite\Excel\Excel;

class DashboardController extends Controller
{
    public function index()
    {
        $startDate = Carbon::now()->subMonths(5)->startOfMonth();
        $endDate = Carbon::now()->endOfMonth();

        $bookings = VehicleBooking::select([
            DB::raw(value: 'DATE_FORMAT(created_at, "%Y-%m") as month'),
            DB::raw('COUNT(CASE WHEN status = "rejected" THEN 1 END) as rejected'),
            DB::raw('COUNT(CASE WHEN status = "pending" THEN 1 END) as pending'),
            DB::raw('COUNT(CASE WHEN status = "approved_l1" THEN 1 END) as approved_l1'),
            DB::raw('COUNT(CASE WHEN status = "completed" THEN 1 END) as completed')
        ])
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->map(function ($item) {
                return [
                    'month' => Carbon::createFromFormat('Y-m', $item->month)->format('M Y'),
                    'rejected' => (int) $item->rejected,
                    'pending' => (int) $item->pending,
                    'approved_l1' => (int) $item->approved_l1,
                    'completed' => (int) $item->completed
                ];
            })
            ->values()
            ->toArray();

        $chartData = collect([]);
        for ($i = 0; $i < 6; $i++) {
            $currentDate = Carbon::now()->subMonths(5 - $i);
            $monthKey = $currentDate->format('M Y');

            $existingData = collect($bookings)->firstWhere('month', $monthKey);

            if ($existingData) {
                $chartData->push($existingData);
            } else {
                $chartData->push([
                    'month' => $monthKey,
                    'rejected' => 0,
                    'pending' => 0,
                    'approved_l1' => 0,
                    'completed' => 0
                ]);
            }
        }

        $statistics = [
            'total_users' => User::role('manager')->count(),
            'total_admins' => User::role('admin')->count(),
            'total_vehicles' => Vehicle::count(),
            'total_bookings' => VehicleBooking::count(),
        ];

        return Inertia::render('Dashboard/Dashboard', [
            'statistics' => $statistics,
            'chartData'=> $chartData
        ]);
    }

    public function export()
    {
        return app(abstract: Excel::class)->download(
            new CombinedExport,
            'sekawan-test-' . now()->format('Y-m-d') . '.xlsx'
        );
    }
}
