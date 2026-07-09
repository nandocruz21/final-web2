<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('santri', function (Blueprint $table) {
            $table->id('id_santri');
            $table->string('nama_lengkap');
            $table->string('tempat_lahir')->default('-');
            $table->date('tanggal_lahir')->nullable();
            $table->text('alamat')->default('-');
            $table->string('nama_ortu')->default('-');
            $table->string('no_wa_ortu')->default('-');
            $table->string('capaian_hafalan')->default('Iqra/Juz Amma');
            $table->text('catatan_pengajar')->default('- Belum ada catatan -');
            $table->enum('kehadiran', ['hadir', 'izin', 'sakit', 'alpha'])->default('hadir');
            $table->string('foto')->default('default.png');
            $table->timestamp('waktu_update')->nullable()->useCurrent()->useCurrentOnUpdate();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('santri');
    }
};
