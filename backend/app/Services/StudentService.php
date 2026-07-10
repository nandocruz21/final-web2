<?php

namespace App\Services;

use App\Models\Student;
use App\Models\ProgressHistory;

class StudentService
{
    public function all()
    {
        return Student::orderByDesc('id')->get();
    }

    public function find(int $id)
    {
        return Student::findOrFail($id);
    }

    public function create(array $data, $foto = null)
    {
        if ($foto) {
            $namaFile = 'santri_' . time() . '_' . rand(100, 999) . '.' . $foto->getClientOriginalExtension();
            $foto->move(public_path('uploads'), $namaFile);
            $data['foto'] = $namaFile;
        } else {
            $data['foto'] = 'default.png';
        }

        $data['kehadiran'] = 'hadir';
        $student = Student::create($data);

        // Rekam riwayat awal
        ProgressHistory::create([
            'student_id'       => $student->id,
            'capaian_hafalan'  => $data['capaian_hafalan'] ?? 'Iqra/Juz Amma',
            'catatan_pengajar' => $data['catatan_pengajar'] ?? '- Belum ada catatan -',
            'kehadiran'        => 'hadir',
        ]);

        return $student;
    }

    public function update(int $id, array $data, $foto = null)
    {
        $student = $this->find($id);

        if ($foto) {
            $namaFile = 'santri_' . time() . '_' . rand(100, 999) . '.' . $foto->getClientOriginalExtension();
            $foto->move(public_path('uploads'), $namaFile);
            $data['foto'] = $namaFile;
        }

        $buatRiwayat = false;
        if (isset($data['capaian_hafalan']) && $student->capaian_hafalan !== $data['capaian_hafalan']) {
            $buatRiwayat = true;
        }
        if (isset($data['catatan_pengajar']) && $student->catatan_pengajar !== $data['catatan_pengajar']) {
            $buatRiwayat = true;
        }

        $student->update($data);

        if ($buatRiwayat) {
            ProgressHistory::create([
                'student_id'       => $student->id,
                'capaian_hafalan'  => $student->capaian_hafalan,
                'catatan_pengajar' => $student->catatan_pengajar,
                'kehadiran'        => $student->kehadiran,
            ]);
        }

        return $student;
    }

    public function updateStatus(int $id, string $status)
    {
        $student = $this->find($id);
        $student->update(['kehadiran' => $status]);

        ProgressHistory::create([
            'student_id'       => $student->id,
            'capaian_hafalan'  => $student->capaian_hafalan,
            'catatan_pengajar' => $student->catatan_pengajar,
            'kehadiran'        => $status,
        ]);

        return $student;
    }

    public function delete(int $id)
    {
        $student = $this->find($id);
        $student->delete();
    }
}
