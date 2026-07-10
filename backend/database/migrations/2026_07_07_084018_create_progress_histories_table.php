<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('progress_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained()->onDelete('cascade');
            $table->string('capaian_hafalan');
            $table->text('catatan_pengajar')->nullable();
            $table->enum('kehadiran', ['hadir', 'izin', 'sakit', 'alpha'])->default('hadir');
            $table->timestamp('tanggal_riwayat')->useCurrent();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('progress_histories');
    }
};
