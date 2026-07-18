<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Information;
use Illuminate\Http\Request;

class InformationApiController extends Controller
{
    public function index()
    {
        $info = Information::orderByDesc('id')->paginate(10);
        return response()->json($info);
    }

    public function store(Request $request)
    {
        $request->validate([
            'kategori' => 'required|string',
            'judul_info' => 'required|string|max:255',
            'isi_info' => 'required|string',
            'is_urgent' => 'nullable|boolean',
        ]);

        $info = Information::create([
            'kategori' => $request->kategori,
            'judul_info' => $request->judul_info,
            'isi_info' => $request->isi_info,
            'is_urgent' => $request->is_urgent ?? false,
            'tanggal_posting' => now()->toDateString(),
        ]);

        return response()->json(['success' => true, 'data' => $info]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'kategori' => 'required|string',
            'judul_info' => 'required|string|max:255',
            'isi_info' => 'required|string',
            'is_urgent' => 'nullable|boolean',
        ]);

        $info = Information::findOrFail($id);
        $info->update([
            'kategori' => $request->kategori,
            'judul_info' => $request->judul_info,
            'isi_info' => $request->isi_info,
            'is_urgent' => $request->is_urgent ?? false,
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
