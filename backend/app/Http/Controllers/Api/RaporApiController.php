<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProgressHistory;
use App\Http\Requests\StoreRaporRequest;
use App\Http\Requests\UpdateRaporRequest;
use App\Http\Resources\RaporResource;
use Illuminate\Http\Request;

class RaporApiController extends Controller
{
    public function index(Request $request)
    {
        $query = ProgressHistory::with('santri')->orderByDesc('created_at');

        if ($request->has('date') && $request->date != '') {
            $query->whereDate('created_at', $request->date);
        }

        if ($request->has('search') && $request->search != '') {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('capaian_hafalan', 'like', "%{$search}%")
                  ->orWhereHas('santri', function($sq) use ($search) {
                      $sq->where('nama_lengkap', 'like', "%{$search}%");
                  });
            });
        }

        $paginator = $query->paginate(10);

        // Menggunakan Resource Collection untuk response seragam
        $resourceCollection = RaporResource::collection($paginator->getCollection());
        $paginator->setCollection($resourceCollection->collection);

        return response()->json([
            'status' => 'success',
            'data' => $paginator
        ]);
    }

    public function store(StoreRaporRequest $request)
    {
        // Validasi sudah ditangani oleh StoreRaporRequest, controller lebih bersih
        $data = $request->validated();

        $history = ProgressHistory::create([
            'student_id' => $data['student_id'],
            'capaian_hafalan' => $data['capaian_hafalan'],
            'catatan_pengajar' => $data['catatan_pengajar'] ?? null,
            'kehadiran' => $data['kehadiran'],
            'tanggal_riwayat' => now()->toDateString()
        ]);

        $student = \App\Models\Student::find($data['student_id']);
        if ($student) {
            $student->update([
                'capaian_hafalan' => $data['capaian_hafalan'],
                'catatan_pengajar' => $data['catatan_pengajar'] ?? null,
                'kehadiran' => $data['kehadiran'],
            ]);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Rapor berhasil ditambahkan',
            'data' => new RaporResource($history)
        ], 201);
    }

    public function update(UpdateRaporRequest $request, $id)
    {
        // Validasi sudah ditangani oleh UpdateRaporRequest
        $data = $request->validated();

        $history = ProgressHistory::findOrFail($id);
        $history->update([
            'capaian_hafalan' => $data['capaian_hafalan'],
            'catatan_pengajar' => $data['catatan_pengajar'] ?? null,
            'kehadiran' => $data['kehadiran'],
        ]);

        $student = \App\Models\Student::find($history->student_id);
        if ($student) {
            $student->update([
                'capaian_hafalan' => $data['capaian_hafalan'],
                'catatan_pengajar' => $data['catatan_pengajar'] ?? null,
                'kehadiran' => $data['kehadiran'],
            ]);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Rapor berhasil diperbarui',
            'data' => new RaporResource($history)
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
