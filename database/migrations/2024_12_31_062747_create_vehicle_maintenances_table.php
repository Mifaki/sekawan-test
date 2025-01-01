<?php

use App\Enums\VehicleMaintenanceStatusEnum;
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
        Schema::create('vehicle_maintenances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vehicle_id')->constrained();
            $table->date('scheduled_date');
            $table->string('maintenance_type');
            $table->text('description');
            $table->enum('status', array_map(fn($status) => $status->value, VehicleMaintenanceStatusEnum::cases()));
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicle_maintenances');
    }
};
