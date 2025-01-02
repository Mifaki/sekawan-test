<?php

namespace App\Http\Controllers;

use App\Exports\VehiclesExport;
use App\Http\Requests\VehicleStoreRequest;
use App\Http\Requests\VehicleUpdateRequest;
use App\Models\Vehicle;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Maatwebsite\Excel\Excel;

class VehicleController extends Controller
{
    public function index()
    {
        $vehicles = Vehicle::all()->map(function ($vehicle) {
            return [
                'id' => (string) $vehicle->id,
                'registration_number' => $vehicle->registration_number,
                'vehicle_type' => $vehicle->vehicle_type,
                'ownership_type' => $vehicle->ownership_type,
                'brand' => $vehicle->brand,
                'model' => $vehicle->model,
                'manufacturing_year' => (string) $vehicle->manufacturing_year,
                'chassis_number' => $vehicle->chassis_number,
                'engine_number' => $vehicle->engine_number,
                'registration_expiry' => $vehicle->registration_expiry,
                'is_active' => (bool) $vehicle->is_active,
            ];
        });

        return Inertia::render('Vehicle/VehicleManagement', [
            'vehicles' => $vehicles
        ]);
    }

    public function update(VehicleUpdateRequest $request, $id)
    {
        try {
            DB::beginTransaction();

            $vehicle = Vehicle::findOrFail($id);
            $vehicle->update($request->validated());

            DB::commit();

            return response()->json([
                'message' => 'Vehicle updated successfully.',
                'vehicle' => [
                    'id' => (string) $vehicle->id,
                    'registration_number' => $vehicle->registration_number,
                    'vehicle_type' => $vehicle->vehicle_type,
                    'ownership_type' => $vehicle->ownership_type,
                    'brand' => $vehicle->brand,
                    'model' => $vehicle->model,
                    'manufacturing_year' => (string) $vehicle->manufacturing_year,
                    'chassis_number' => $vehicle->chassis_number,
                    'engine_number' => $vehicle->engine_number,
                    'registration_expiry' => $vehicle->registration_expiry,
                    'is_active' => (bool) $vehicle->is_active,
                ],
                'status' => 200,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Failed to update vehicle. Please try again.',
                'status' => 500
            ], 500);
        }
    }

    public function store(VehicleStoreRequest $request): JsonResponse
    {
        try {
            DB::beginTransaction();

            $vehicle = Vehicle::create($request->validated());

            DB::commit();

            return response()->json([
                'message' => 'Vehicle created successfully.',
                'vehicle' => [
                    'id' => (string) $vehicle->id,
                    'registration_number' => $vehicle->registration_number,
                    'vehicle_type' => $vehicle->vehicle_type,
                    'ownership_type' => $vehicle->ownership_type,
                    'brand' => $vehicle->brand,
                    'model' => $vehicle->model,
                    'manufacturing_year' => (string) $vehicle->manufacturing_year,
                    'chassis_number' => $vehicle->chassis_number,
                    'engine_number' => $vehicle->engine_number,
                    'registration_expiry' => $vehicle->registration_expiry,
                    'is_active' => (bool) $vehicle->is_active,
                ],
                'status' => 201,
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Failed to create vehicle. Please try again.',
                'status' => 500
            ], 500);
        }
    }

    public function destroy($id): JsonResponse
    {
        try {
            $vehicle = Vehicle::findOrFail($id);

            DB::beginTransaction();

            $vehicle->fuelHistories()->delete();
            $vehicle->bookings()->delete();
            $vehicle->maintenances()->delete();

            $vehicle->delete();

            DB::commit();

            return response()->json([
                'status' => 200,
                'message' => 'Vehicle deleted successfully'
            ]);

        } catch (ModelNotFoundException $e) {
            return response()->json([
                'status' => 404,
                'message' => 'Vehicle not found'
            ], 404);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'status' => 500,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function export()
    {
        return app(abstract: Excel::class)->download(
            new VehiclesExport,
            'vehicles-' . now()->format('Y-m-d') . '.xlsx'
        );
    }
}
