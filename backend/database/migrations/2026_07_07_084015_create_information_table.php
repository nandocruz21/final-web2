<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('informasi', function (Blueprint $table) {
            $table->id('id_info');
            $table->string('kategori')->default('PENGUMUMAN');
            $table->string('judul_info');
            $table->text('isi_info');
            $table->date('tanggal_posting')->useCurrent();
            $table->timestamp('waktu_update')->nullable()->useCurrent()->useCurrentOnUpdate();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('informasi');
    }
};
