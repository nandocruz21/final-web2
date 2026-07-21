<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthApiController;
use App\Http\Controllers\Api\PublicApiController;

Route::get('/home', [PublicApiController::class, 'home']);
Route::get('/cek-rapor', [PublicApiController::class, 'cekRapor']);
Route::get('/riwayat/{id}', [PublicApiController::class, 'riwayat']);
Route::get('/cetak-rapor/{id}', [\App\Http\Controllers\Api\StudentApiController::class, 'downloadPdf']);
Route::post('/testimoni', [PublicApiController::class, 'submitTestimoni']);
Route::get('/testimoni', [PublicApiController::class, 'allTestimoni']);
Route::get('/pengumuman', [PublicApiController::class, 'pengumuman']);
Route::post('/hubungi', [PublicApiController::class, 'submitMessage']);

Route::post('/login', [AuthApiController::class, 'login']);
Route::post('/login/google', [\App\Http\Controllers\Api\GoogleAuthController::class, 'login']);

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/check', [AuthApiController::class, 'check']);
    Route::post('/logout', [AuthApiController::class, 'logout']);

    // Admin Routes
    Route::prefix('admin')->group(function () {
        Route::get('/dashboard', [\App\Http\Controllers\Api\DashboardApiController::class, 'index']);
        Route::put('/profil', [AuthApiController::class, 'updateProfile']);
        Route::post('/profil/foto', [AuthApiController::class, 'updateFoto']);
        
        // Standar CRUD menggunakan apiResource
        Route::apiResource('rapor', \App\Http\Controllers\Api\RaporApiController::class);
        Route::apiResource('santri', \App\Http\Controllers\Api\StudentApiController::class);
        Route::apiResource('informasi', \App\Http\Controllers\Api\InformationApiController::class);
        Route::apiResource('pesan', \App\Http\Controllers\Api\MessageApiController::class)->except(['store', 'update', 'show']);
        Route::post('/pesan/{id}/baca', [\App\Http\Controllers\Api\MessageApiController::class, 'markAsRead']);

        // Route Khusus (Custom)
        Route::get('/santri/{id}/report-pdf', [\App\Http\Controllers\Api\StudentApiController::class, 'downloadPdf']);
        Route::post('/santri/{id}/foto', [\App\Http\Controllers\Api\StudentApiController::class, 'updateFoto']);
        Route::post('/santri/{id}/status', [\App\Http\Controllers\Api\StudentApiController::class, 'updateStatus']);
    });
});
