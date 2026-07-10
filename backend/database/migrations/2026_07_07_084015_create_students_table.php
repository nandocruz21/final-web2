<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('nama_lengkap');
            $table->string('tempat_lahir')->default('-');
            $table->date('tanggal_lahir')->nullable();
            $table->text('alamat')->nullable();
            $table->string('nama_ortu')->default('-');
            $table->string('no_wa_ortu')->default('-');
            $table->string('capaian_hafalan')->default('Iqra/Juz Amma');
            $table->text('catatan_pengajar')->nullable();
            $table->enum('kehadiran', ['hadir', 'izin', 'sakit', 'alpha'])->default('hadir');
            $table->string('foto')->default('default.png');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
