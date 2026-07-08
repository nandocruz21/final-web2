<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('testimoni', function (Blueprint $table) {
            $table->id('id_testi');
            $table->string('nama_wali');
            $table->string('kelas_santri')->nullable();
            $table->string('inisial', 2);
            $table->tinyInteger('rating')->default(5);
            $table->text('isi_testimoni');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('testimoni');
    }
};
