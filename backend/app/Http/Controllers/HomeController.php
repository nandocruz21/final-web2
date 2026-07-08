<?php

namespace App\Http\Controllers;

use App\Models\Santri;
use App\Models\Informasi;
use App\Models\Pengaturan;
use App\Models\Galeri;
use App\Models\Testimoni;

class HomeController extends Controller
{
    public function index()
    {
        $totalSantri = Santri::count();
        $info        = Informasi::orderByDesc('tanggal_posting')->orderByDesc('id_info')->first();
        $pengaturan  = Pengaturan::first();
        $galeri      = Galeri::orderByDesc('id_galeri')->get();
        $testimoni   = Testimoni::orderByDesc('id_testi')->take(5)->get();

        return view('home.index', compact('totalSantri', 'info', 'pengaturan', 'galeri', 'testimoni'));
    }
}
