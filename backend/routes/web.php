<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\InformationController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\AdminTestimonialController;

// ============================
// PUBLIC ROUTES
// ============================

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/cek-rapor', [StudentController::class, 'cekRapor'])->name('cek.rapor');
Route::get('/testimoni', [TestimonialController::class, 'index'])->name('testimoni');
Route::post('/ulasan/simpan', [TestimonialController::class, 'store'])->name('ulasan.store');


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
        $totalSantri     = \App\Models\Student::count();
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
    Route::get('/santri', [StudentController::class, 'index'])->name('admin.santri');
    Route::post('/santri', [StudentController::class, 'store'])->name('admin.santri.store');
    Route::post('/santri/update-status', [StudentController::class, 'updateStatus'])->name('admin.santri.status');
    Route::get('/santri/{id}/hapus', [StudentController::class, 'destroy'])->name('admin.santri.destroy');

    // Informasi
    Route::get('/informasi', [InformationController::class, 'index'])->name('admin.informasi');
    Route::post('/informasi', [InformationController::class, 'store'])->name('admin.informasi.store');
    Route::get('/informasi/{id}/hapus', [InformationController::class, 'destroy'])->name('admin.informasi.destroy');

    // Galeri
    Route::get('/galeri', [GalleryController::class, 'index'])->name('admin.galeri');
    Route::post('/galeri', [GalleryController::class, 'store'])->name('admin.galeri.store');
    Route::get('/galeri/{id}/hapus', [GalleryController::class, 'destroy'])->name('admin.galeri.destroy');

    // Jadwal & Lokasi
    Route::get('/jadwal', [ScheduleController::class, 'index'])->name('admin.jadwal');
    Route::post('/jadwal', [ScheduleController::class, 'update'])->name('admin.jadwal.update');

    // Testimoni
    Route::get('/testimoni', [AdminTestimonialController::class, 'index'])->name('admin.testimoni');
    Route::post('/testimoni', [AdminTestimonialController::class, 'store'])->name('admin.testimoni.store');
    Route::get('/testimoni/{id}/hapus', [AdminTestimonialController::class, 'destroy'])->name('admin.testimoni.destroy');
});
