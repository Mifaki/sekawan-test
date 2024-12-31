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

        $adminRole = Role::create(['name' => RolesEnum::ADMIN->value]);
        $adminRole->givePermissionTo(Permission::all());

        $managerRole = Role::create(['name' => RolesEnum::MANAGER->value]);
        $managerRole->givePermissionTo(['view_users']);
    }
}
