<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('riwayat_progres', function (Blueprint $table) {
            $table->id('id_riwayat');
            $table->unsignedBigInteger('id_santri');
            $table->string('capaian_hafalan');
            $table->text('catatan_pengajar')->nullable();
            $table->enum('kehadiran', ['hadir', 'izin', 'sakit', 'alpha'])->default('hadir');
            $table->timestamp('tanggal_riwayat')->useCurrent();
            $table->foreign('id_santri')->references('id_santri')->on('santri')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('riwayat_progres');
    }
};
