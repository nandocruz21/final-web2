<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Galeri extends Model
{
    protected $table = 'galeri';
    protected $primaryKey = 'id_galeri';
    public $timestamps = false;

    protected $fillable = [
        'nama_file', 'keterangan', 'tanggal_upload', 'waktu_update',
    ];
}
