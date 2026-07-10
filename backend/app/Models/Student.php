<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_lengkap', 'tempat_lahir', 'tanggal_lahir', 'alamat',
        'nama_ortu', 'no_wa_ortu', 'capaian_hafalan', 'catatan_pengajar',
        'kehadiran', 'foto',
    ];

    protected $attributes = [
        'kehadiran' => 'hadir',
        'foto' => 'default.png',
        'catatan_pengajar' => '- Belum ada catatan -',
    ];

    public function riwayat()
    {
        return $this->hasMany(ProgressHistory::class);
    }
}
