<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('vehicles', function (Blueprint $table) {
            $table->softDeletes();
        });

        Schema::table('vehicle_bookings', function (Blueprint $table) {
            $table->softDeletes();
        });

        Schema::table('vehicle_maintenances', function (Blueprint $table) {
            $table->softDeletes();
        });

        Schema::table('vehicle_fuel_histories', function (Blueprint $table) {
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */

    public function down()
    {
        Schema::table('vehicles', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('vehicle_bookings', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('vehicle_maintenances', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('vehicle_fuel_histories', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
