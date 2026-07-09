<?php

namespace App\Http\Controllers;

use App\Models\Information;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InformationController extends Controller
{
    public function index()
    {
        $informasi = Information::orderByDesc('tanggal_posting')->orderByDesc('id_info')->get();
        return view('admin.informasi.index', compact('informasi'));
    }

    public function store(Request $request)
    {
        $id    = $request->input('id_info');
        $judul = $request->input('judul');
        $isi   = $request->input('isi');

        if (empty($id)) {
            Information::create([
                'kategori'       => 'PENGUMUMAN',
                'judul_info'     => $judul,
                'isi_info'       => $isi,
                'tanggal_posting' => now()->toDateString(),
            ]);
        } else {
            Information::where('id_info', $id)->update([
                'judul_info' => $judul,
                'isi_info'   => $isi,
            ]);
        }

        return redirect()->route('admin.informasi');
    }

    public function destroy($id)
    {
        Information::findOrFail($id)->delete();
        return redirect()->route('admin.informasi');
    }
}
