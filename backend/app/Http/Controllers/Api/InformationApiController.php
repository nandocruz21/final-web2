<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Information;
use Illuminate\Http\Request;

class InformationApiController extends Controller
{
    public function index()
    {
        $info = Information::orderByDesc('id')->get();
        return response()->json($info);
    }

    public function store(Request $request)
    {
        $request->validate([
            'kategori' => 'required|string',
            'judul_info' => 'required|string|max:255',
            'isi_info' => 'required|string',
        ]);

        $info = Information::create([
            'kategori' => $request->kategori,
            'judul_info' => $request->judul_info,
            'isi_info' => $request->isi_info,
            'tanggal_posting' => now()->toDateString(),
        ]);

        return response()->json(['success' => true, 'data' => $info]);
    }

    public function destroy($id)
    {
        $info = Information::findOrFail($id);
        $info->delete();
        
        return response()->json(['success' => true, 'message' => 'Pengumuman dihapus']);
    }
}
