<?php

namespace Database\Seeders;

use App\Enums\RolesEnum;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@admin.com',
            'password' => Hash::make('admin123'),
        ]);
        $admin->assignRole(RolesEnum::ADMIN->value);

        $manager1 = User::create([
            'name' => 'Manager User 1',
            'email' => 'manager_1@manager.com',
            'password' => Hash::make('admin123'),
        ]);
        $manager1->assignRole(RolesEnum::MANAGER->value);

        $manager2 = User::create([
            'name' => 'Manager User 2',
            'email' => 'manager_2@manager.com',
            'password' => Hash::make('admin123'),
        ]);
        $manager2->assignRole(RolesEnum::MANAGER->value);
    }
}
