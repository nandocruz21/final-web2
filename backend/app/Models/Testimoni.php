<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimoni extends Model
{
    protected $table = 'testimoni';
    protected $primaryKey = 'id_testi';
    public $timestamps = false;

    protected $fillable = [
        'nama_wali', 'kelas_santri', 'inisial', 'rating', 'isi_testimoni',
    ];
}
