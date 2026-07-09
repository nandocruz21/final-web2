<?php

namespace App\Http\Controllers;

use App\Models\ProgressHistory;

class ProgressHistoryController extends Controller
{
    public function show($id)
    {
        $riwayat = ProgressHistory::where('id_santri', $id)
            ->orderByDesc('tanggal_riwayat')
            ->get();

        return response()->json($riwayat);
    }
}
