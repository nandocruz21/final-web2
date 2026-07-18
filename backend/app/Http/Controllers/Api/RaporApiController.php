<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProgressHistory;
use Illuminate\Http\Request;

class RaporApiController extends Controller
{
    public function index()
    {
        // Ambil semua riwayat hafalan beserta data santri terkait, urutkan dari yang terbaru
        $histories = ProgressHistory::with('santri')
            ->orderByDesc('created_at')
            ->get()
            ->map(function ($history) {
                return [
                    'id' => $history->id,
                    'student_id' => $history->student_id,
                    'nama_santri' => $history->santri ? $history->santri->nama_lengkap : 'Unknown',
                    'capaian_hafalan' => $history->capaian_hafalan,
                    'catatan_pengajar' => $history->catatan_pengajar,
                    'kehadiran' => $history->kehadiran,
                    'tanggal' => $history->created_at->format('d M Y H:i'),
                ];
            });

        return response()->json([
            'status' => 'success',
            'data' => $histories
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'student_id' => 'required|exists:students,id',
            'capaian_hafalan' => 'required|string',
            'catatan_pengajar' => 'nullable|string',
            'kehadiran' => 'required|in:hadir,izin,sakit,alpha'
        ]);

        // Buat riwayat rapor baru
        $history = ProgressHistory::create([
            'student_id' => $request->student_id,
            'capaian_hafalan' => $request->capaian_hafalan,
            'catatan_pengajar' => $request->catatan_pengajar,
            'kehadiran' => $request->kehadiran,
            'tanggal_riwayat' => now()->toDateString()
        ]);

        // Update data santri terakhir
        $student = \App\Models\Student::find($request->student_id);
        $student->update([
            'capaian_hafalan' => $request->capaian_hafalan,
            'catatan_pengajar' => $request->catatan_pengajar,
            'kehadiran' => $request->kehadiran,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Rapor berhasil ditambahkan',
            'data' => $history
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'capaian_hafalan' => 'required|string',
            'catatan_pengajar' => 'nullable|string',
            'kehadiran' => 'required|in:hadir,izin,sakit,alpha'
        ]);

        $history = ProgressHistory::findOrFail($id);
        $history->update([
            'capaian_hafalan' => $request->capaian_hafalan,
            'catatan_pengajar' => $request->catatan_pengajar,
            'kehadiran' => $request->kehadiran,
        ]);

        // Opsional: Update data santri juga
        $student = \App\Models\Student::find($history->student_id);
        $student->update([
            'capaian_hafalan' => $request->capaian_hafalan,
            'catatan_pengajar' => $request->catatan_pengajar,
            'kehadiran' => $request->kehadiran,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Rapor berhasil diperbarui',
            'data' => $history
        ]);
    }

    public function destroy($id)
    {
        $history = ProgressHistory::findOrFail($id);
        $history->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Rapor berhasil dihapus'
        ]);
    }
}
