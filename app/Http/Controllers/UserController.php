<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\UserUpdateRequest;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all()->map(function ($user) {
            return [
                'id' => (string) $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->getRoleNames() ?? 'Not Assigned'
            ];
        });

        return Inertia::render('User/UserManagement', [
            'users' => $users
        ]);
    }

    public function update(UserUpdateRequest $request, $id)
    {
        $user = User::findOrFail($id);

        $user->update($request->only(['name', 'email']));

        if ($request->filled('role')) {
            $user->syncRoles([$request->input('role')]);
        }

        return response()->json([
            'message' => 'User updated successfully.',
            'user' => [
                'id' => (string) $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->getRoleNames()->first() ?? 'Not Assigned',
            ],
            'status' => 200
        ]);
    }
}
