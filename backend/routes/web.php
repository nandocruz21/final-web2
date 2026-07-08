<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\SantriController;
use App\Http\Controllers\TestimoniController;
use App\Http\Controllers\RiwayatController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\InformasiController;
use App\Http\Controllers\GaleriController;
use App\Http\Controllers\JadwalController;
use App\Http\Controllers\AdminTestimoniController;

// ============================
// PUBLIC ROUTES
// ============================

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/cek-rapor', [SantriController::class, 'cekRapor'])->name('cek.rapor');
Route::get('/testimoni', [TestimoniController::class, 'index'])->name('testimoni');
Route::post('/ulasan/simpan', [TestimoniController::class, 'store'])->name('ulasan.store');

// API endpoint riwayat (untuk AJAX di halaman cek rapor)
Route::get('/api/riwayat/{id}', [RiwayatController::class, 'show'])->name('api.riwayat');

// ============================
// ADMIN AUTH ROUTES
// ============================

Route::get('/admin/login', [AuthController::class, 'showLogin'])->name('admin.login');
Route::post('/admin/login', [AuthController::class, 'login'])->name('admin.login.post');
Route::post('/admin/logout', [AuthController::class, 'logout'])->name('admin.logout');

// ============================
// ADMIN PROTECTED ROUTES
// ============================

Route::prefix('admin')->middleware('admin.auth')->group(function () {

    // Dashboard
    Route::get('/', function () {
        $totalSantri     = \App\Models\Santri::count();
        $resultAktifitas = \Illuminate\Support\Facades\DB::select("
            SELECT waktu_update, CONCAT('Pembaruan data santri atas nama <strong>', nama_lengkap, '</strong>.') AS teks FROM santri WHERE waktu_update IS NOT NULL
            UNION
            SELECT waktu_update, CONCAT('Pembaruan papan informasi: <strong>', judul_info, '</strong>.') AS teks FROM informasi WHERE waktu_update IS NOT NULL
            UNION
            SELECT waktu_update, 'Pembaruan data <strong>Jadwal &amp; Lokasi (Peta) TPQ</strong>.' AS teks FROM pengaturan WHERE waktu_update IS NOT NULL
            UNION
            SELECT waktu_update, 'Penambahan / pembaruan <strong>gambar</strong>.' AS teks FROM galeri WHERE waktu_update IS NOT NULL
            ORDER BY waktu_update DESC
            LIMIT 3
        ");
        return view('admin.dashboard', compact('totalSantri', 'resultAktifitas'));
    })->name('admin.dashboard');

    // Santri
    Route::get('/santri', [SantriController::class, 'index'])->name('admin.santri');
    Route::post('/santri', [SantriController::class, 'store'])->name('admin.santri.store');
    Route::post('/santri/update-status', [SantriController::class, 'updateStatus'])->name('admin.santri.status');
    Route::get('/santri/{id}/hapus', [SantriController::class, 'destroy'])->name('admin.santri.destroy');

    // Informasi
    Route::get('/informasi', [InformasiController::class, 'index'])->name('admin.informasi');
    Route::post('/informasi', [InformasiController::class, 'store'])->name('admin.informasi.store');
    Route::get('/informasi/{id}/hapus', [InformasiController::class, 'destroy'])->name('admin.informasi.destroy');

    // Galeri
    Route::get('/galeri', [GaleriController::class, 'index'])->name('admin.galeri');
    Route::post('/galeri', [GaleriController::class, 'store'])->name('admin.galeri.store');
    Route::get('/galeri/{id}/hapus', [GaleriController::class, 'destroy'])->name('admin.galeri.destroy');

    // Jadwal & Lokasi
    Route::get('/jadwal', [JadwalController::class, 'index'])->name('admin.jadwal');
    Route::post('/jadwal', [JadwalController::class, 'update'])->name('admin.jadwal.update');

    // Testimoni
    Route::get('/testimoni', [AdminTestimoniController::class, 'index'])->name('admin.testimoni');
    Route::post('/testimoni', [AdminTestimoniController::class, 'store'])->name('admin.testimoni.store');
    Route::get('/testimoni/{id}/hapus', [AdminTestimoniController::class, 'destroy'])->name('admin.testimoni.destroy');
});
