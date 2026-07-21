<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\StudentService;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Http\Resources\SantriResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class StudentApiController extends Controller
{
    protected StudentService $studentService;

    public function __construct(StudentService $studentService)
    {
        $this->studentService = $studentService;
    }

    public function index()
    {
        $santri = $this->studentService->all();

        return response()->json([
            'status' => 'success',
            'data' => SantriResource::collection($santri)
        ]);
    }

    public function show($id)
    {
        try {
            $student = $this->studentService->find($id);
            return response()->json([
                'status' => 'success',
                'data' => new SantriResource($student)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Santri tidak ditemukan'
            ], 404);
        }
    }

    public function store(StoreStudentRequest $request)
    {
        try {
            $foto = $request->hasFile('foto') ? $request->file('foto') : null;
            $student = $this->studentService->create($request->validated(), $foto);

            return response()->json([
                'status' => 'success',
                'message' => 'Data santri berhasil ditambahkan',
                'data' => new SantriResource($student)
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function update(UpdateStudentRequest $request, $id)
    {
        try {
            $foto = $request->hasFile('foto') ? $request->file('foto') : null;
            $student = $this->studentService->update($id, $request->validated(), $foto);

            return response()->json([
                'status' => 'success',
                'message' => 'Data santri berhasil diperbarui',
                'data' => new SantriResource($student)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function updateStatus(Request $request, $id)
    {
        try {
            $status = $request->input('status');
            if (!in_array($status, ['hadir', 'sakit', 'izin', 'alpha'])) {
                throw new \Exception("Status kehadiran tidak valid");
            }
            $student = $this->studentService->updateStatus($id, $status);

            // Notifikasi WA via Fonnte hanya saat "Hadir"
            if ($status === 'hadir' && !empty($student->no_wa_ortu)) {
                $fonnteToken = env('FONNTE_TOKEN');
                if ($fonnteToken && $fonnteToken !== 'TOKEN_ANDA_DISINI') {
                    $waktu = now()->format('d-m-Y H:i');
                    $waText = "Assalamualaikum Wr. Wb.\n\nBapak/Ibu Wali dari Ananda *{$student->nama_lengkap}*,\nKami menginformasikan bahwa Ananda telah *HADIR* dan sampai di tempat mengaji pada {$waktu} WITA.\n\nTerima kasih.\nWassalamualaikum Wr. Wb.";
                    
                    try {
                        // Menjalankan request ke Fonnte SETELAH response dikirim ke frontend
                        // Ini akan menghilangkan delay pada tombol kehadiran
                        app()->terminating(function () use ($fonnteToken, $student, $waText) {
                            try {
                                Http::withHeaders([
                                    'Authorization' => $fonnteToken,
                                ])->post('https://api.fonnte.com/send', [
                                    'target' => $student->no_wa_ortu,
                                    'message' => $waText,
                                    'countryCode' => '62',
                                ]);
                            } catch (\Exception $e) {
                                \Log::error('Fonnte send error in background: ' . $e->getMessage());
                            }
                        });
                    } catch (\Exception $e) {
                        \Log::error('Fonnte setup error: ' . $e->getMessage());
                    }
                }
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Status kehadiran berhasil diperbarui',
                'data' => new SantriResource($student)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $this->studentService->delete($id);
            return response()->json([
                'status' => 'success',
                'message' => 'Data santri berhasil dihapus'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function downloadPdf($id)
    {
        try {
            $student = $this->studentService->find($id);
            // Retrieve latest progress histories for this student, e.g. last 7 records
            $histories = \App\Models\ProgressHistory::where('student_id', $id)
                                ->orderByDesc('created_at')
                                ->take(7)
                                ->get();
            
            $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('pdf.laporan_santri', [
                'student' => $student,
                'histories' => $histories
            ]);

            return $pdf->download('laporan_santri_'.$student->nama_lengkap.'.pdf');
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal mengunduh PDF: ' . $e->getMessage()
            ], 500);
        }
    }
}
