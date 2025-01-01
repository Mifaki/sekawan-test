<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VehicleBookingController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\VehicleFuelHistoryController;
use App\Http\Controllers\VehicleMaintenanceController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::prefix('dashboard')
    ->middleware(['auth', 'verified'])
    ->group(function () {
        Route::get('/', function () {
            return Inertia::render('Dashboard');
        })->name('dashboard');

        Route::resource('user-management', UserController::class);
        Route::resource('vehicle-management', VehicleController::class);
        Route::resource('booking-management', VehicleBookingController::class);
    });

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// API Routes
Route::prefix('api')->middleware('auth')->group(function () {
    // User Routes
    Route::controller(UserController::class)->group(function () {
        Route::patch('users/{id}', 'update')->middleware('permission:edit_users');
    });

    // Vehicle Routes
    Route::controller(VehicleController::class)->group(function () {
        Route::patch('vehicles/{id}', 'update')->middleware('permission:edit_vehicles');
        Route::post('vehicles', 'store')->middleware('permission:create_vehicles');
        Route::delete('vehicles/{id}', 'destroy')->middleware('permission:delete_vehicles');
    });

    // Vehicle Maintenance Routes
    Route::controller(VehicleMaintenanceController::class)->prefix('vehicles/maintenances')->group(function () {
        Route::get('{id}', 'show')->middleware('permission:view_vehicle_maintenances');
        Route::post('/', 'store')->middleware('permission:create_vehicle_maintenances');
        Route::delete('{id}', 'destroy')->middleware('permission:delete_vehicle_maintenances');
    });

    // Vehicle Fuel History Routes
    Route::controller(VehicleFuelHistoryController::class)->prefix('vehicles/fuels')->group(function () {
        Route::get('{id}', 'show')->middleware('permission:view_vehicle_fuel_histories');
        Route::post('/', 'store')->middleware('permission:create_vehicle_fuel_histories');
        Route::delete('{id}', 'destroy')->middleware('permission:delete_vehicle_fuel_histories');
    });

    // Vehicle Booking Routes
    Route::controller(VehicleBookingController::class)->prefix('vehicles/bookings')->group(function () {
        Route::post('/', 'store')->middleware('permission:create_bookings');
        Route::patch('{id}', 'update')->middleware('permission:edit_bookings');
    });
});

require __DIR__ . '/auth.php';
