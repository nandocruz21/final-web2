<?php

namespace App\Http\Controllers;

use App\Models\RiwayatProgres;

class RiwayatController extends Controller
{
    public function show($id)
    {
        $riwayat = RiwayatProgres::where('id_santri', $id)
            ->orderByDesc('tanggal_riwayat')
            ->get();

        return response()->json($riwayat);
    }
}
