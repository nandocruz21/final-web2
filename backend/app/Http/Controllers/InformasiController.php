<?php

namespace App\Http\Controllers;

use App\Models\Informasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InformasiController extends Controller
{
    public function index()
    {
        $informasi = Informasi::orderByDesc('tanggal_posting')->orderByDesc('id_info')->get();
        return view('admin.informasi.index', compact('informasi'));
    }

    public function store(Request $request)
    {
        $id    = $request->input('id_info');
        $judul = $request->input('judul');
        $isi   = $request->input('isi');

        if (empty($id)) {
            Informasi::create([
                'kategori'       => 'PENGUMUMAN',
                'judul_info'     => $judul,
                'isi_info'       => $isi,
                'tanggal_posting' => now()->toDateString(),
            ]);
        } else {
            Informasi::where('id_info', $id)->update([
                'judul_info' => $judul,
                'isi_info'   => $isi,
            ]);
        }

        return redirect()->route('admin.informasi');
    }

    public function destroy($id)
    {
        Informasi::findOrFail($id)->delete();
        return redirect()->route('admin.informasi');
    }
}
