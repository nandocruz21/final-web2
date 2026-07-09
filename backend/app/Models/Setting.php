<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $table = 'pengaturan';
    public $timestamps = false;

    protected $fillable = [
        'nama_tpq', 'slogan', 'jadwal_seninkamis', 'jadwal_jumat',
        'jadwal_sabtu', 'jadwal_minggu', 'link_maps', 'waktu_update',
    ];
}
