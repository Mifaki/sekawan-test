<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use App\Models\VehicleMaintenance;
use App\Http\Requests\VehicleMaintenanceStoreRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class VehicleMaintenanceController extends Controller
{
    public function show($vehicleId): JsonResponse
    {
        try {
            $maintenances = Vehicle::findOrFail($vehicleId)
                ->maintenances()
                ->orderBy('scheduled_date', 'desc')
                ->get()
                ->map(function ($maintenance) {
                    return [
                        'id' => $maintenance->id,
                        'vehicle_id' => $maintenance->vehicle_id,
                        'scheduled_date' => $maintenance->scheduled_date,
                        'maintenance_type' => $maintenance->maintenance_type,
                        'description' => $maintenance->description,
                        'status' => $maintenance->status,
                    ];
                });

            return response()->json([
                'status' => 200,
                'maintenance' => $maintenances,
                'message' => 'Maintenance records retrieved successfully'
            ], 200);

        } catch (ModelNotFoundException $e) {
            return response()->json([
                'status' => 404,
                'message' => 'Vehicle not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function store(VehicleMaintenanceStoreRequest $request): JsonResponse
    {
        try {
            DB::beginTransaction();

            $maintenance = VehicleMaintenance::create($request->validated());

            DB::commit();

            return response()->json([
                'status' => 201,
                'maintenance' => $maintenance,
                'message' => 'Maintenance record created successfully'
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'status' => 500,
                'message' => 'An error occurred while creating the maintenance record'
            ], 500);
        }
    }

    public function destroy($id): JsonResponse
    {
        try {
            $maintenance = VehicleMaintenance::findOrFail($id);

            DB::beginTransaction();

            $maintenance->delete();

            DB::commit();

            return response()->json([
                'status' => 200,
                'message' => 'Maintenance record deleted successfully'
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'status' => 404,
                'message' => 'Maintenance record not found'
            ], 404);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'status' => 500,
                'message' => 'An error occurred while deleting the maintenance record'
            ], 500);
        }
    }
}
