<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use App\Models\VehicleFuelHistory;
use App\Http\Requests\VehicleFuelHistoryStoreRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class VehicleFuelHistoryController extends Controller
{
    public function show($vehicleId): JsonResponse
    {
        try {
            $fuelHistories = Vehicle::findOrFail($vehicleId)
                ->fuelHistories()
                ->with('user:id,name')
                ->orderBy('refuel_date')
                ->get()
                ->map(function ($fuelHistory) {
                    return [
                        'id' => $fuelHistory->id,
                        'vehicle_id' => $fuelHistory->vehicle_id,
                        'driver_name' => $fuelHistory->user->name ?? 'Unknown',
                        'amount_liters' => $fuelHistory->amount_liters,
                        'cost' => $fuelHistory->cost,
                        'refuel_date' => $fuelHistory->refuel_date,
                        'notes' => $fuelHistory->notes,
                    ];
                });

            return response()->json([
                'status' => 200,
                'fuel_histories' => $fuelHistories,
                'message' => 'Fuel histories retrieved successfully',
            ], 200);

        } catch (ModelNotFoundException $e) {
            return response()->json([
                'status' => 404,
                'message' => 'Vehicle not found',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function store(VehicleFuelHistoryStoreRequest $request): JsonResponse
    {
        try {
            DB::beginTransaction();

            $fuelHistory = new VehicleFuelHistory($request->validated());
            $fuelHistory->driver_id = Auth::id();
            $fuelHistory->save();

            DB::commit();

            return response()->json([
                'status' => 201,
                'fuel_history' => [
                    'id' => $fuelHistory->id,
                    'vehicle_id' => $fuelHistory->vehicle_id,
                    'driver_name' => Auth::user()->name,
                    'amount_liters' => $fuelHistory->amount_liters,
                    'cost' => $fuelHistory->cost,
                    'refuel_date' => $fuelHistory->refuel_date,
                    'notes' => $fuelHistory->notes,
                ],
                'message' => 'Fuel history created successfully'
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'status' => 500,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id): JsonResponse
    {
        try {
            $fuelHistory = VehicleFuelHistory::findOrFail($id);

            DB::beginTransaction();

            $fuelHistory->delete();

            DB::commit();

            return response()->json([
                'status' => 200,
                'message' => 'Fuel history deleted successfully'
            ]);

        } catch (ModelNotFoundException $e) {
            return response()->json([
                'status' => 404,
                'message' => 'Fuel history not found'
            ], 404);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'status' => 500,
                'message' => 'An error occurred while deleting the fuel history'
            ], 500);
        }
    }
}
