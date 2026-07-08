<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthApiController;
use App\Http\Controllers\Api\PublicApiController;

Route::get('/home', [PublicApiController::class, 'home']);
Route::get('/cek-rapor', [PublicApiController::class, 'cekRapor']);
Route::get('/riwayat/{id}', [PublicApiController::class, 'riwayat']);
Route::post('/testimoni', [PublicApiController::class, 'submitTestimoni']);
Route::get('/testimoni', [PublicApiController::class, 'allTestimoni']);

Route::post('/login', [AuthApiController::class, 'login']);
Route::get('/auth/check', [AuthApiController::class, 'check']);
Route::post('/logout', [AuthApiController::class, 'logout']);

// Untuk Admin kita bisa buat group dengan route Auth
// Karena ini SPA berbasis cookie (same domain / localhost), session middleware jalan secara default di group web, tapi kita taruh di api. 
// Untuk itu, kita perlu pastikan di bootstrap/app.php middleware 'web' memuat endpoint api, ATAU kita daftarkan StartSession middleware ke grup 'api'.
