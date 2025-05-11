<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    // ユーザープロフィール表示
    public function show($id)
    {
        $user = User::with(['posts', 'skills', 'image'])->findOrFail($id);
        return Inertia::render('User/Profile', [
            'user' => $user,
        ]);
    }
}
