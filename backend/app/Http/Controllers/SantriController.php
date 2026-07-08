<?php

namespace App\Http\Controllers;

use App\Models\Santri;
use App\Models\Pengaturan;
use App\Models\RiwayatProgres;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SantriController extends Controller
{
    // ===== FRONTEND =====

    public function cekRapor()
    {
        $santri     = Santri::orderBy('nama_lengkap')->get();
        $pengaturan = Pengaturan::first();
        $namaTpq    = $pengaturan->nama_tpq ?? 'MSANTRI';

        return view('home.cek_rapor', compact('santri', 'namaTpq'));
    }

    // ===== ADMIN =====

    public function index()
    {
        $santri = Santri::orderByDesc('id_santri')->get();
        return view('admin.santri.index', compact('santri'));
    }

    public function store(Request $request)
    {
        $id = $request->input('id_santri');

        $data = [
            'nama_lengkap'     => $request->input('nama') ?: '-',
            'tempat_lahir'     => $request->input('tempat_lahir') ?: '-',
            'tanggal_lahir'    => $request->input('tanggal_lahir') ?: null,
            'alamat'           => $request->input('alamat') ?: '-',
            'nama_ortu'        => $request->input('nama_ortu') ?: '-',
            'no_wa_ortu'       => $request->input('no_wa_ortu') ?: '-',
            'capaian_hafalan'  => $request->input('capaian'),
            'catatan_pengajar' => $request->input('catatan') ?: '- Belum ada catatan -',
        ];

        // Handle foto upload
        if ($request->hasFile('foto') && $request->file('foto')->isValid()) {
            $foto     = $request->file('foto');
            $ekstensi = strtolower($foto->getClientOriginalExtension());

            if (!in_array($ekstensi, ['png', 'jpg', 'jpeg'])) {
                return back()->with('alert_type', 'error')->with('alert_message', 'Ekstensi file tidak diperbolehkan (Hanya JPG/PNG).');
            }
            if ($foto->getSize() > 2048000) {
                return back()->with('alert_type', 'error')->with('alert_message', 'Ukuran file terlalu besar (Maks 2MB).');
            }

            $namaFile = 'santri_' . time() . '_' . rand(100, 999) . '.' . $ekstensi;
            $foto->move(public_path('uploads'), $namaFile);
            $data['foto'] = $namaFile;
        }

        if (empty($id)) {
            // INSERT
            if (empty($data['foto'])) $data['foto'] = 'default.png';
            $data['kehadiran'] = 'hadir';
            $santri = Santri::create($data);

            // Riwayat awal
            RiwayatProgres::create([
                'id_santri'        => $santri->id_santri,
                'capaian_hafalan'  => $data['capaian_hafalan'],
                'catatan_pengajar' => $data['catatan_pengajar'],
                'kehadiran'        => 'hadir',
            ]);

            return redirect()->route('admin.santri')->with('alert_type', 'success')->with('alert_message', 'Data santri berhasil ditambahkan!');
        } else {
            // UPDATE - cek perubahan untuk riwayat
            $santri = Santri::findOrFail($id);
            $buatRiwayat = ($santri->capaian_hafalan !== $data['capaian_hafalan'] || $santri->catatan_pengajar !== $data['catatan_pengajar']);

            $santri->update($data);

            if ($buatRiwayat) {
                RiwayatProgres::create([
                    'id_santri'        => $santri->id_santri,
                    'capaian_hafalan'  => $data['capaian_hafalan'],
                    'catatan_pengajar' => $data['catatan_pengajar'],
                    'kehadiran'        => $santri->kehadiran,
                ]);
            }

            return redirect()->route('admin.santri')->with('alert_type', 'success')->with('alert_message', 'Data santri berhasil diperbarui!');
        }
    }

    public function updateStatus(Request $request)
    {
        $id     = $request->input('id');
        $status = $request->input('status');

        $santri = Santri::findOrFail($id);
        $santri->update(['kehadiran' => $status]);

        // Rekam riwayat
        RiwayatProgres::create([
            'id_santri'        => $santri->id_santri,
            'capaian_hafalan'  => $santri->capaian_hafalan,
            'catatan_pengajar' => $santri->catatan_pengajar,
            'kehadiran'        => $status,
        ]);

        // Kirim WA jika hadir (opsional - uncomment jika Fonnte API tersedia)
        // if ($status === 'hadir' && !empty($santri->no_wa_ortu) && $santri->no_wa_ortu !== '-') {
        //     // implementasi kirim WA di sini
        // }

        return response()->json(['status' => 'ok']);
    }

    public function destroy($id)
    {
        $santri = Santri::findOrFail($id);
        $santri->delete();
        return redirect()->route('admin.santri')->with('alert_type', 'success')->with('alert_message', 'Data santri berhasil dihapus!');
    }
}
