<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\Information;
use App\Models\Setting;
use App\Models\Gallery;
use App\Models\Testimonial;
use App\Models\ProgressHistory;
use Illuminate\Http\Request;

class PublicApiController extends Controller
{
    public function home()
    {
        $totalSantri = Student::count();
        $info        = Information::orderByDesc('tanggal_posting')->orderByDesc('id_info')->first();
        $pengaturan  = Setting::first();
        $galeri      = Gallery::orderByDesc('id_galeri')->get();
        $testimoni   = Testimonial::orderByDesc('id_testi')->take(5)->get();

        return response()->json([
            'totalSantri' => $totalSantri,
            'info' => $info,
            'pengaturan' => $pengaturan,
            'galeri' => $galeri,
            'testimoni' => $testimoni
        ]);
    }

    public function cekRapor(Request $request)
    {
        $search = $request->query('q');
        
        $query = Student::orderBy('nama_lengkap');
        if ($search) {
            $query->where('nama_lengkap', 'like', "%{$search}%");
        }
        $santri = $query->get();

        $pengaturan = Setting::first();
        $namaTpq = $pengaturan->nama_tpq ?? 'MSANTRI';

        return response()->json([
            'santri' => $santri,
            'namaTpq' => $namaTpq
        ]);
    }

    public function riwayat($id)
    {
        $riwayat = ProgressHistory::where('id_santri', $id)
            ->orderByDesc('tanggal_riwayat')
            ->get();

        return response()->json($riwayat);
    }

    public function submitTestimoni(Request $request)
    {
        $request->validate([
            'nama_wali' => 'required',
            'rating' => 'required|numeric',
            'isi_testimoni' => 'required'
        ]);

        $nama = trim($request->input('nama_wali'));
        $inisial = strtoupper(substr($nama, 0, 1));

        $testi = Testimonial::create([
            'nama_wali'    => $nama,
            'kelas_santri' => 'Wali Santri',
            'inisial'      => $inisial,
            'rating'       => (int) $request->input('rating'),
            'isi_testimoni' => $request->input('isi_testimoni'),
        ]);

        return response()->json(['success' => true, 'data' => $testi]);
    }

    public function allTestimoni()
    {
        $testimoni = Testimonial::orderByDesc('id_testi')->get();
        return response()->json($testimoni);
    }
}
