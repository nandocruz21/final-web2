<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgressHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id', 'capaian_hafalan', 'catatan_pengajar', 'kehadiran', 'tanggal_riwayat',
    ];

    public function santri()
    {
        return $this->belongsTo(Student::class, 'student_id');
    }
}
