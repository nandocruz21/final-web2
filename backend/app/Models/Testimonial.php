<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_wali', 'kelas_santri', 'inisial', 'rating', 'isi_testimoni',
    ];
}
