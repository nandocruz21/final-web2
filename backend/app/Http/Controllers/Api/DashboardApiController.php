<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\ProgressHistory;
use Illuminate\Http\Request;

class DashboardApiController extends Controller
{
    public function index()
    {
        // Total Santri
        $totalSantri = Student::count();

        // Hadir Hari Ini (berdasarkan status kehadiran terakhir di tabel santri)
        $hadirHariIni = Student::where('kehadiran', 'hadir')->count();

        // Alpa Hari Ini (berdasarkan status kehadiran terakhir di tabel santri)
        $alpaHariIni = Student::where('kehadiran', 'alpha')->count();

        // Pembaruan Hafalan Terbaru (5 data terakhir)
        $recentUpdates = ProgressHistory::with('santri')
                            ->orderByDesc('created_at')
                            ->take(5)
                            ->get()
                            ->map(function ($history) {
                                return [
                                    'id' => $history->id,
                                    'nama_santri' => $history->santri ? $history->santri->nama_lengkap : 'Unknown',
                                    'capaian_hafalan' => $history->capaian_hafalan,
                                    'kehadiran' => $history->kehadiran,
                                    'waktu' => $history->created_at->diffForHumans(),
                                ];
                            });

        return response()->json([
            'status' => 'success',
            'data' => [
                'total_santri' => $totalSantri,
                'hadir_hari_ini' => $hadirHariIni,
                'alpa_hari_ini' => $alpaHariIni,
                'recent_updates' => $recentUpdates,
            ]
        ]);
    }
}
