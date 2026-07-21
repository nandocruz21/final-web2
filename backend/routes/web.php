<?php

use Illuminate\Support\Facades\Route;

// ============================
// WEB ROUTES (Non-API)
// ============================

Route::get('/', function () {
    return view('welcome');
});
