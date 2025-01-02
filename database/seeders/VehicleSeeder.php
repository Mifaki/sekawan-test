<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Vehicle;
use App\Models\VehicleBooking;
use App\Models\VehicleFuelHistory;
use App\Models\VehicleMaintenance;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use App\Enums\VehicleTypeEnum;
use App\Enums\VehicleOwnershipEnum;
use App\Enums\VehicleBookingStatusEnum;
use App\Enums\VehicleMaintenanceStatusEnum;

class VehicleSeeder extends Seeder
{
    public function run(): void
    {
        $faker = \Faker\Factory::create();

        $users = User::all();

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

            for ($j = 0; $j < rand(10, 30); $j++) {
                $status = $faker->randomElement(VehicleBookingStatusEnum::cases())->value;

                $requestedDate = $faker->dateTimeBetween('-6 months', 'now');
                $startDate = Carbon::instance($requestedDate)->addDays(rand(0, 5));
                $endDate = $startDate->copy()->addDays(rand(1, 7));

                $reviewers = $users->random(2);

                $bookingData = [
                    'vehicle_id' => $vehicle->id,
                    'requested_by' => $users->random()->id,
                    'driver_id' => $users->random()->id,
                    'start_datetime' => $startDate,
                    'end_datetime' => $endDate,
                    'purpose' => $faker->sentence,
                    'destination' => $faker->address,
                    'passenger_count' => $faker->numberBetween(1, 5),
                    'status' => $status,
                    'first_reviewer' => $reviewers[0]->id,
                    'second_reviewer' => $reviewers[1]->id,
                    'created_at' => $requestedDate,
                    'first_approval_at' => null,
                    'second_approval_at' => null,
                    'rejected_by' => null,
                    'rejected_at' => null,
                    'rejection_reason' => null,
                ];

                switch ($status) {
                    case VehicleBookingStatusEnum::APPROVEDL1->value:
                        $bookingData['first_approval_at'] = Carbon::instance($requestedDate)->addHours(rand(1, 24));
                        break;

                    case VehicleBookingStatusEnum::COMPLETED->value:
                        $firstApprovalDate = Carbon::instance($requestedDate)->addHours(rand(1, 24));
                        $bookingData['first_approval_at'] = $firstApprovalDate;
                        $bookingData['second_approval_at'] = $firstApprovalDate->copy()->addHours(rand(1, 24));
                        break;

                    case VehicleBookingStatusEnum::REJECTED->value:
                        $bookingData['rejected_by'] = $users->random()->id;
                        $bookingData['rejected_at'] = Carbon::instance($requestedDate)->addHours(rand(1, 24));
                        $bookingData['rejection_reason'] = $faker->sentence;
                        break;
                }

                VehicleBooking::create($bookingData);
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
                    'driver_id' => $users->random()->id,
                    'amount_liters' => $faker->randomFloat(2, 10, 100),
                    'cost' => $faker->randomFloat(2, 50000, 200000),
                    'refuel_date' => $faker->dateTimeBetween('-2 months', 'now'),
                    'notes' => $faker->optional()->sentence,
                ]);
            }
        }
    }
}
