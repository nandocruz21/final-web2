<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('nama_tpq')->default('Miftahul Jannah');
            $table->string('slogan')->nullable();
            $table->string('jadwal_seninkamis')->nullable();
            $table->string('jadwal_jumat')->nullable();
            $table->string('jadwal_sabtu')->nullable();
            $table->string('jadwal_minggu')->nullable();
            $table->text('link_maps')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
