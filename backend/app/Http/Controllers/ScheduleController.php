<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    public function index()
    {
        $pengaturan = Setting::first();
        return view('admin.jadwal.index', compact('pengaturan'));
    }

    public function update(Request $request)
    {
        $pengaturan = Setting::first();

        if ($request->input('jenis_form') === 'jadwal') {
            $pengaturan->update([
                'jadwal_seninkamis' => $request->input('seninkamis'),
                'jadwal_jumat'      => $request->input('jumat'),
                'jadwal_sabtu'      => $request->input('sabtu'),
                'jadwal_minggu'     => $request->input('minggu'),
            ]);
        } else {
            $pengaturan->update([
                'link_maps' => $request->input('link_maps'),
            ]);
        }

        return back()->with('success', 'Data berhasil diperbarui!');
    }
}
