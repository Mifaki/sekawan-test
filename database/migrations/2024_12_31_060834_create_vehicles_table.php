<?php

use App\Enums\VehicleOwnershipEnum;
use App\Enums\VehicleTypeEnum;
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
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->string('registration_number')->unique();
            $table->enum('vehicle_type', array_map(fn($type) => $type->value, VehicleTypeEnum::cases()));
            $table->enum('ownership_type', array_map(fn($ownership) => $ownership->value, VehicleOwnershipEnum::cases()));
            $table->string('brand');
            $table->string('model');
            $table->integer('manufacturing_year');
            $table->string('chassis_number');
            $table->string('engine_number');
            $table->date('registration_expiry');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
