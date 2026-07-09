<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    public function index()
    {
        $galeri = Gallery::orderByDesc('id_galeri')->get();
        return view('admin.galeri.index', compact('galeri'));
    }

    public function store(Request $request)
    {
        if (!$request->hasFile('foto')) {
            return back()->with('msg', 'Pilih gambar terlebih dahulu!')->with('msg_type', 'error');
        }

        $foto      = $request->file('foto');
        $ekstensi  = strtolower($foto->getClientOriginalExtension());

        if (!in_array($ekstensi, ['jpg', 'jpeg', 'png'])) {
            return back()->with('msg', 'Format file harus JPG, JPEG, atau PNG!')->with('msg_type', 'error');
        }
        if ($foto->getSize() > 10000000) {
            return back()->with('msg', 'Ukuran file terlalu besar (Maks 10MB)!')->with('msg_type', 'error');
        }

        $namaFile = uniqid() . '.' . $ekstensi;
        $foto->move(public_path('img'), $namaFile);

        Gallery::create([
            'nama_file'  => $namaFile,
            'keterangan' => $request->input('keterangan'),
        ]);

        return back()->with('msg', 'Foto berhasil diterbitkan!')->with('msg_type', 'success');
    }

    public function destroy($id)
    {
        $galeri = Gallery::findOrFail($id);
        $path   = public_path('img/' . $galeri->nama_file);

        if (file_exists($path)) {
            unlink($path);
        }

        $galeri->delete();
        return back()->with('msg', 'Foto berhasil dihapus!')->with('msg_type', 'success');
    }
}
