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
Route::post('/login/google', [\App\Http\Controllers\Api\GoogleAuthController::class, 'login']);

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/check', [AuthApiController::class, 'check']);
    Route::post('/logout', [AuthApiController::class, 'logout']);

    // Admin Routes
    Route::prefix('admin')->group(function () {
        Route::get('/dashboard', [\App\Http\Controllers\Api\DashboardApiController::class, 'index']);
        Route::get('/rapor', [\App\Http\Controllers\Api\RaporApiController::class, 'index']);
        
        Route::get('/santri', [\App\Http\Controllers\Api\StudentApiController::class, 'index']);
        Route::get('/santri/{id}', [\App\Http\Controllers\Api\StudentApiController::class, 'show']);
        Route::post('/santri', [\App\Http\Controllers\Api\StudentApiController::class, 'store']);
        Route::put('/santri/{id}', [\App\Http\Controllers\Api\StudentApiController::class, 'update']);
        Route::delete('/santri/{id}', [\App\Http\Controllers\Api\StudentApiController::class, 'destroy']);
        Route::post('/santri/{id}/status', [\App\Http\Controllers\Api\StudentApiController::class, 'updateStatus']);
        Route::get('/santri/{id}/report-pdf', [\App\Http\Controllers\Api\StudentApiController::class, 'downloadPdf']);
    });
});
