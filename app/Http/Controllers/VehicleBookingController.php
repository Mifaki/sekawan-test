<?php

namespace App\Http\Controllers;

use App\Enums\VehicleBookingStatusEnum;
use App\Exports\VehicleBookingsExport;
use App\Http\Requests\VehicleBookingStoreRequest;
use App\Http\Requests\VehicleBookingUpdateRequest;
use App\Models\User;
use App\Models\Vehicle;
use App\Models\VehicleBooking;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Maatwebsite\Excel\Excel;

class VehicleBookingController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $bookings = VehicleBooking::query()
            ->when(!$user->hasRole('admin'), function ($query) use ($user) {
                $query->where(function ($q) use ($user) {
                    $q->where('requested_by', $user->id)
                        ->orWhere('driver_id', $user->id)
                        ->orWhere(function ($q) use ($user) {
                            $q->where('first_reviewer', $user->id)
                                ->where('status', VehicleBookingStatusEnum::PENDING->value);
                        })
                        ->orWhere(function ($q) use ($user) {
                            $q->where('second_reviewer', $user->id)
                                ->where('status', VehicleBookingStatusEnum::APPROVEDL1->value);
                        });
                });
            })
            ->with([
                'vehicle:id,registration_number',
                'requester:id,name',
                'driver:id,name',
                'firstReviewer:id,name',
                'secondReviewer:id,name',
                'rejecter:id,name'
            ])
            ->get()
            ->map(function ($booking) use ($user) {
                $userRoles = [];

                if ($booking->requested_by == $user->id) {
                    $userRoles[] = 'Requester';
                }
                if ($booking->driver_id == $user->id) {
                    $userRoles[] = 'Driver';
                }
                if ($booking->first_reviewer == $user->id) {
                    $userRoles[] = 'First Reviewer';
                }
                if ($booking->second_reviewer == $user->id) {
                    $userRoles[] = 'Second Reviewer';
                }

                return [
                    'id' => (string) $booking->id,
                    'vehicle_id' => (string) $booking->vehicle_id,
                    'requested_by' => (string) $booking->requested_by,
                    'driver_id' => (string) $booking->driver_id,
                    'start_datetime' => $booking->start_datetime,
                    'end_datetime' => $booking->end_datetime,
                    'purpose' => $booking->purpose,
                    'destination' => $booking->destination,
                    'passenger_count' => (int) $booking->passenger_count,
                    'status' => $booking->status,
                    'requester_name' => $booking->requester?->name,
                    'driver_name' => $booking->driver?->name,
                    'vehicle_registration_number' => $booking->vehicle?->registration_number,
                    'first_reviewer' => $booking->first_reviewer,
                    'first_reviewer_name' => $booking->firstReviewer?->name,
                    'first_approval_at' => $booking->first_approval_at,
                    'second_reviewer' => $booking->second_reviewer,
                    'second_reviewer_name' => $booking->secondReviewer?->name,
                    'second_approval_at' => $booking->second_approval_at,
                    'rejected_by' => $booking->rejected_by,
                    'rejected_at' => $booking->rejected_at,
                    'rejection_reason' => $booking->rejection_reason,
                    'rejecter_name' => $booking->rejecter?->name,
                    'relation' => $userRoles,
                ];
            });

        $vehicles = Vehicle::query()
            ->select('id', 'registration_number', 'vehicle_type')
            ->get()
            ->map(function ($vehicle) {
                return [
                    'id' => (string) $vehicle->id,
                    'registration_number' => $vehicle->registration_number,
                    'vehicle_type' => $vehicle->vehicle_type,
                ];
            });

        $users = User::query()
            ->select('id', 'name')
            ->get()
            ->map(function ($user) {
                return [
                    'id' => (string) $user->id,
                    'name' => $user->name,
                ];
            });

        return Inertia::render('Booking/BookingManagement', [
            'bookings' => $bookings,
            'vehicles' => $vehicles,
            'users' => $users,
        ]);
    }

    public function store(VehicleBookingStoreRequest $request): JsonResponse
    {
        try {
            $conflictingBooking = VehicleBooking::query()
                ->where('vehicle_id', $request->vehicle_id)
                ->where(function ($query) use ($request) {
                    $query->whereBetween('start_datetime', [$request->start_datetime, $request->end_datetime])
                        ->orWhereBetween('end_datetime', [$request->start_datetime, $request->end_datetime])
                        ->orWhere(function ($q) use ($request) {
                            $q->where('start_datetime', '<=', $request->start_datetime)
                                ->where('end_datetime', '>=', $request->end_datetime);
                        });
                })
                ->whereNotIn('status', [
                    VehicleBookingStatusEnum::REJECTED->value,
                ])
                ->exists();

            if ($conflictingBooking) {
                return response()->json([
                    'message' => 'Vehicle is already booked for the selected time period.',
                    'status' => 422
                ], 422);
            }

            DB::beginTransaction();

            $booking = VehicleBooking::create([
                'vehicle_id' => $request->vehicle_id,
                'requested_by' => Auth::id(),
                'driver_id' => $request->driver_id,
                'start_datetime' => $request->start_datetime,
                'end_datetime' => $request->end_datetime,
                'purpose' => $request->purpose,
                'destination' => $request->destination,
                'passenger_count' => $request->passenger_count,
                'status' => VehicleBookingStatusEnum::PENDING->value,
                'first_reviewer' => $request->first_reviewer,
                'second_reviewer' => $request->second_reviewer,
            ]);

            $booking->load([
                'vehicle:id,registration_number',
                'requester:id,name',
                'driver:id,name',
                'firstReviewer:id,name',
                'secondReviewer:id,name'
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Booking created successfully.',
                'booking' => [
                    'id' => (string) $booking->id,
                    'vehicle_id' => (string) $booking->vehicle_id,
                    'requested_by' => (string) $booking->requested_by,
                    'driver_id' => (string) $booking->driver_id,
                    'start_datetime' => $booking->start_datetime,
                    'end_datetime' => $booking->end_datetime,
                    'purpose' => $booking->purpose,
                    'destination' => $booking->destination,
                    'passenger_count' => (int) $booking->passenger_count,
                    'status' => $booking->status,
                    'requester_name' => $booking->requester?->name,
                    'driver_name' => $booking->driver?->name,
                    'vehicle_registration_number' => $booking->vehicle?->registration_number,
                    'first_reviewer' => $booking->first_reviewer,
                    'first_reviewer_name' => $booking->firstReviewer?->name,
                    'second_reviewer' => $booking->second_reviewer,
                    'second_reviewer_name' => $booking->secondReviewer?->name,
                ],
                'status' => 201
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Failed to create booking. Please try again.',
                'status' => 500,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(VehicleBookingUpdateRequest $request, $id): JsonResponse
    {
        try {
            $user = auth()->user();
            $vehicleBooking = VehicleBooking::findOrFail($id);

            $isFirstReviewer = $vehicleBooking->first_reviewer === $user->id;
            $isSecondReviewer = $vehicleBooking->second_reviewer === $user->id;

            if (!$isFirstReviewer && !$isSecondReviewer) {
                return response()->json([
                    'message' => 'You are not authorized to review this booking.',
                    'status' => 403
                ], 403);
            }

            DB::beginTransaction();

            if ($request->action === 'APPROVED') {
                if ($isFirstReviewer && $vehicleBooking->status === VehicleBookingStatusEnum::PENDING->value) {
                    $vehicleBooking->status =  VehicleBookingStatusEnum::APPROVEDL1->value;
                    $vehicleBooking->first_approval_at = now();
                } elseif ($isSecondReviewer && $vehicleBooking->status ===  VehicleBookingStatusEnum::APPROVEDL1->value) {
                    $vehicleBooking->status = 'APPROVED';
                    $vehicleBooking->second_approval_at = now();
                } else {
                    return response()->json([
                        'message' => 'Invalid approval sequence.',
                        'status' => 422
                    ], 422);
                }
            } else {
                $vehicleBooking->status = VehicleBookingStatusEnum::REJECTED->value;
                $vehicleBooking->rejected_by = $user->id;
                $vehicleBooking->rejected_at = now();
                $vehicleBooking->rejection_reason = $request->rejection_reason;
            }

            $vehicleBooking->save();

            $vehicleBooking->load([
                'vehicle:id,registration_number',
                'requester:id,name',
                'driver:id,name',
                'firstReviewer:id,name',
                'secondReviewer:id,name',
                'rejecter:id,name'
            ]);

            DB::commit();

            return response()->json([
                'message' => $request->action === 'APPROVED' ? 'Booking approved successfully.' : 'Booking rejected successfully.',
                'booking' => [
                    'id' => (string) $vehicleBooking->id,
                    'vehicle_id' => (string) $vehicleBooking->vehicle_id,
                    'requested_by' => (string) $vehicleBooking->requested_by,
                    'driver_id' => (string) $vehicleBooking->driver_id,
                    'start_datetime' => $vehicleBooking->start_datetime,
                    'end_datetime' => $vehicleBooking->end_datetime,
                    'purpose' => $vehicleBooking->purpose,
                    'destination' => $vehicleBooking->destination,
                    'passenger_count' => (int) $vehicleBooking->passenger_count,
                    'status' => $vehicleBooking->status,
                    'requester_name' => $vehicleBooking->requester?->name,
                    'driver_name' => $vehicleBooking->driver?->name,
                    'vehicle_registration_number' => $vehicleBooking->vehicle?->registration_number,
                    'first_reviewer' => $vehicleBooking->first_reviewer,
                    'first_reviewer_name' => $vehicleBooking->firstReviewer?->name,
                    'first_approval_at' => $vehicleBooking->first_approval_at,
                    'second_reviewer' => $vehicleBooking->second_reviewer,
                    'second_reviewer_name' => $vehicleBooking->secondReviewer?->name,
                    'second_approval_at' => $vehicleBooking->second_approval_at,
                    'rejected_by' => $vehicleBooking->rejected_by,
                    'rejected_at' => $vehicleBooking->rejected_at,
                    'rejection_reason' => $vehicleBooking->rejection_reason,
                    'rejecter_name' => $vehicleBooking->rejecter?->name,
                ],
                'status' => 200
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Failed to update booking. Please try again.',
                'status' => 500,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function export()
    {
        return app(Excel::class)->download(
            new VehicleBookingsExport,
            'vehicle-bookings-' . now()->format('Y-m-d') . '.xlsx'
        );
    }

}
