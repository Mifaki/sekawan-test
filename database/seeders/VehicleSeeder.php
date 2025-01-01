<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Vehicle;
use App\Models\VehicleBooking;
use App\Models\VehicleFuelHistory;
use App\Models\VehicleMaintenance;
use Illuminate\Database\Seeder;
use App\Enums\VehicleTypeEnum;
use App\Enums\VehicleOwnershipEnum;
use App\Enums\VehicleBookingStatusEnum;
use App\Enums\VehicleMaintenanceStatusEnum;

class VehicleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 10; $i++) {
            $vehicle = Vehicle::create([
                'registration_number' => strtoupper($faker->bothify('??###')),
                'vehicle_type' => $faker->randomElement(VehicleTypeEnum::cases())->value,
                'ownership_type' => $faker->randomElement(VehicleOwnershipEnum::cases())->value,
                'brand' => $faker->company,
                'model' => $faker->word,
                'manufacturing_year' => $faker->numberBetween(2000, 2023),
                'chassis_number' => strtoupper($faker->bothify('CHASIS-######')),
                'engine_number' => strtoupper($faker->bothify('ENGINE-######')),
                'registration_expiry' => $faker->dateTimeBetween('now', '+3 years')->format('Y-m-d'),
                'is_active' => $faker->boolean,
            ]);

            for ($j = 0; $j < rand(1, 5); $j++) {
                VehicleBooking::create([
                    'vehicle_id' => $vehicle->id,
                    'requested_by' => User::inRandomOrder()->first()->id,
                    'driver_id' => User::inRandomOrder()->first()->id,
                    'start_datetime' => $faker->dateTimeBetween('-1 month', 'now'),
                    'end_datetime' => $faker->dateTimeBetween('now', '+1 week'),
                    'purpose' => $faker->sentence,
                    'destination' => $faker->address,
                    'passenger_count' => $faker->numberBetween(1, 5),
                    'status' => $faker->randomElement(VehicleBookingStatusEnum::cases())->value,
                ]);
            }

            for ($k = 0; $k < rand(1, 5); $k++) {
                VehicleMaintenance::create([
                    'vehicle_id' => $vehicle->id,
                    'scheduled_date' => $faker->dateTimeBetween('-1 month', '+2 months')->format('Y-m-d'),
                    'maintenance_type' => $faker->randomElement(['Oil Change', 'Tire Rotation', 'Brake Check']),
                    'description' => $faker->sentence,
                    'status' => $faker->randomElement(VehicleMaintenanceStatusEnum::cases())->value,
                ]);
            }

            for ($l = 0; $l < 3; $l++) {
                VehicleFuelHistory::create([
                    'vehicle_id' => $vehicle->id,
                    'driver_id' => User::inRandomOrder()->first()->id,
                    'amount_liters' => $faker->randomFloat(2, 10, 100),
                    'cost' => $faker->randomFloat(2, 50000, 200000),
                    'refuel_date' => $faker->dateTimeBetween('-2 months', 'now'),
                    'notes' => $faker->optional()->sentence,
                ]);
            }
        }
    }
}
