<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Information extends Model
{
    use HasFactory;

    protected $fillable = [
        'kategori', 'judul_info', 'isi_info', 'tanggal_posting',
    ];

    protected $attributes = [
        'kategori' => 'PENGUMUMAN',
    ];
}
