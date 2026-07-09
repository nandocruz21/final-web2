<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use Illuminate\Http\Request;

class AdminTestimonialController extends Controller
{
    public function index()
    {
        $testimoni = Testimonial::orderByDesc('id_testi')->get();
        return view('admin.testimoni.index', compact('testimoni'));
    }

    public function store(Request $request)
    {
        Testimonial::create([
            'nama_wali'    => $request->input('nama_wali'),
            'kelas_santri' => 'Wali Santri',
            'inisial'      => strtoupper(substr($request->input('inisial'), 0, 2)),
            'rating'       => (int) $request->input('rating'),
            'isi_testimoni' => $request->input('isi_testimoni'),
        ]);

        return back()->with('success', 'Testimoni berhasil disimpan!');
    }

    public function destroy($id)
    {
        Testimonial::findOrFail($id)->delete();
        return back()->with('success', 'Testimoni berhasil dihapus!');
    }
}
