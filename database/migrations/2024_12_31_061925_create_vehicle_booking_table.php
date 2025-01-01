<?php

use App\Enums\VehicleBookingStatusEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vehicle_bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vehicle_id')->constrained();
            $table->foreignId('requested_by')->constrained('users');
            $table->foreignId('driver_id')->constrained('users');
            $table->dateTime('start_datetime');
            $table->dateTime('end_datetime');
            $table->string('purpose');
            $table->text('destination');
            $table->integer('passenger_count')->nullable();
            $table->enum('status', array_map(fn($status) => $status->value, VehicleBookingStatusEnum::cases()));
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicle_bookings');
    }
};
