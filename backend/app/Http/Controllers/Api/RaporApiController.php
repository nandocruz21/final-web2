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
}
