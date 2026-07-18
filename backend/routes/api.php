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
Route::get('/pengumuman', [PublicApiController::class, 'pengumuman']);

Route::post('/login', [AuthApiController::class, 'login']);
Route::post('/login/google', [\App\Http\Controllers\Api\GoogleAuthController::class, 'login']);

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/check', [AuthApiController::class, 'check']);
    Route::post('/logout', [AuthApiController::class, 'logout']);

    // Admin Routes
    Route::prefix('admin')->group(function () {
        Route::get('/dashboard', [\App\Http\Controllers\Api\DashboardApiController::class, 'index']);
        Route::get('/rapor', [\App\Http\Controllers\Api\RaporApiController::class, 'index']);
        Route::post('/rapor', [\App\Http\Controllers\Api\RaporApiController::class, 'store']);
        Route::put('/rapor/{id}', [\App\Http\Controllers\Api\RaporApiController::class, 'update']);
        Route::delete('/rapor/{id}', [\App\Http\Controllers\Api\RaporApiController::class, 'destroy']);
        
        Route::get('/santri', [\App\Http\Controllers\Api\StudentApiController::class, 'index']);
        Route::post('/santri', [\App\Http\Controllers\Api\StudentApiController::class, 'store']);
        Route::get('/santri/{id}', [\App\Http\Controllers\Api\StudentApiController::class, 'show']);
        Route::put('/santri/{id}', [\App\Http\Controllers\Api\StudentApiController::class, 'update']);
        Route::delete('/santri/{id}', [\App\Http\Controllers\Api\StudentApiController::class, 'destroy']);
        Route::post('/santri/{id}/foto', [\App\Http\Controllers\Api\StudentApiController::class, 'updateFoto']);
        Route::post('/santri/{id}/status', [\App\Http\Controllers\Api\StudentApiController::class, 'updateStatus']);

        // Informasi / Pengumuman
        Route::get('/informasi', [\App\Http\Controllers\Api\InformationApiController::class, 'index']);
        Route::post('/informasi', [\App\Http\Controllers\Api\InformationApiController::class, 'store']);
        Route::put('/informasi/{id}', [\App\Http\Controllers\Api\InformationApiController::class, 'update']);
        Route::delete('/informasi/{id}', [\App\Http\Controllers\Api\InformationApiController::class, 'destroy']);
    });
});
