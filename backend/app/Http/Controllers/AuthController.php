<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function showLogin()
    {
        if (session('isLoggin') === 'login') {
            return redirect()->route('admin.dashboard');
        }
        return view('admin.login');
    }

    public function login(Request $request)
    {
        $username = $request->input('username');
        $password = $request->input('password');

        if ($username === 'admin' && $password === 'pw') {
            session(['isLoggin' => 'login']);
            return redirect()->route('admin.dashboard');
        }

        return back()->with('error', 'Aduh! Username atau password salah, Brader!');
    }

    public function logout(Request $request)
    {
        $request->session()->forget('isLoggin');
        return redirect()->route('admin.login');
    }
}
