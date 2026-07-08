<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class AuthApiController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'required'
        ]);

        if ($request->username === 'admin' && $request->password === 'pw') {
            session(['isLoggin' => 'login']);
            return response()->json([
                'success' => true,
                'message' => 'Login berhasil',
                'user' => ['name' => 'Administrator']
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Username atau password salah'
        ], 401);
    }

    public function check()
    {
        if (session('isLoggin') === 'login') {
            return response()->json(['authenticated' => true, 'user' => ['name' => 'Administrator']]);
        }
        return response()->json(['authenticated' => false], 401);
    }

    public function logout(Request $request)
    {
        $request->session()->forget('isLoggin');
        return response()->json(['success' => true, 'message' => 'Logout berhasil']);
    }
}
