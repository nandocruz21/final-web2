<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProgressHistory extends Model
{
    protected $table = 'riwayat_progres';
    protected $primaryKey = 'id_riwayat';
    public $timestamps = false;

    protected $fillable = [
        'id_santri', 'capaian_hafalan', 'catatan_pengajar', 'kehadiran', 'tanggal_riwayat',
    ];

    public function santri()
    {
        return $this->belongsTo(Student::class, 'id_santri', 'id_santri');
    }
}
