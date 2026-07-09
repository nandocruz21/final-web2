<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Information extends Model
{
    protected $table = 'informasi';
    protected $primaryKey = 'id_info';
    public $timestamps = false;

    protected $fillable = [
        'kategori', 'judul_info', 'isi_info', 'tanggal_posting', 'waktu_update',
    ];

    protected $attributes = [
        'kategori' => 'PENGUMUMAN',
    ];
}
