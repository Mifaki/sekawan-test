<?php

namespace App\Http\Controllers;

use App\Exports\UsersExport;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\UserUpdateRequest;
use Inertia\Inertia;
use Maatwebsite\Excel\Excel;

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
        try {
            DB::beginTransaction();

            $user = User::findOrFail($id);
            $user->update($request->only(['name', 'email']));

            if ($request->filled('role')) {
                $user->syncRoles([$request->input('role')]);
            }

            DB::commit();

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
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Failed to update user. Please try again.',
                'status' => 500
            ], 500);
        }
    }

    public function export()
    {
        return app(abstract: Excel::class)->download(
            new UsersExport,
            'users-' . now()->format('Y-m-d') . '.xlsx'
        );
    }
}
