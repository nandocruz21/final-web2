<?php

namespace App\Http\Controllers;

use App\Models\Testimoni;
use App\Models\Pengaturan;
use Illuminate\Http\Request;

class TestimoniController extends Controller
{
    // Halaman publik semua testimoni
    public function index()
    {
        $testimoni  = Testimoni::orderByDesc('id_testi')->get();
        $pengaturan = Pengaturan::first();
        return view('home.testimoni', compact('testimoni', 'pengaturan'));
    }

    // Simpan ulasan dari form modal di beranda (publik)
    public function store(Request $request)
    {
        $nama    = trim($request->input('nama_wali'));
        $inisial = strtoupper(substr($nama, 0, 1));
        $rating  = (int) $request->input('rating');
        $isi     = $request->input('isi_testimoni');

        Testimoni::create([
            'nama_wali'    => $nama,
            'kelas_santri' => 'Wali Santri',
            'inisial'      => $inisial,
            'rating'       => $rating,
            'isi_testimoni' => $isi,
        ]);

        return redirect()->route('home')->with('ulasan_sukses', 'Terima kasih! Ulasan Anda berhasil dikirim.');
    }
}
