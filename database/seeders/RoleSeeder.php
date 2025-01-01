<?php

namespace Database\Seeders;

use App\Enums\RolesEnum;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        Permission::create(['name' => 'edit_users']);
        Permission::create(['name' => 'view_users']);
        Permission::create(['name' => 'view_vehicles']);
        Permission::create(['name' => 'create_vehicles']);
        Permission::create(['name' => 'edit_vehicles']);
        Permission::create(['name' => 'delete_vehicles']);
        Permission::create(['name' => 'view_vehicle_maintenances']);
        Permission::create(['name' => 'create_vehicle_maintenances']);
        Permission::create(['name' => 'delete_vehicle_maintenances']);
        Permission::create(['name' => 'view_vehicle_fuel_histories']);
        Permission::create(['name' => 'create_vehicle_fuel_histories']);
        Permission::create(['name' => 'delete_vehicle_fuel_histories']);


        $adminRole = Role::create(['name' => RolesEnum::ADMIN->value]);
        $adminRole->givePermissionTo(Permission::all());

        $managerRole = Role::create(['name' => RolesEnum::MANAGER->value]);
        $managerRole->givePermissionTo([
            'view_users',
            'view_vehicles',
            'view_vehicle_maintenances',
            'create_vehicle_maintenances',
            'delete_vehicle_maintenances',
            'view_vehicle_fuel_histories',
            'create_vehicle_fuel_histories',
            'delete_vehicle_fuel_histories'
        ]);
    }
}
