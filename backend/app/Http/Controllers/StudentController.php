<?php

namespace App\Http\Controllers;

use App\Services\StudentService;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Models\Student;
use App\Models\Setting;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    protected StudentService $studentService;

    public function __construct(StudentService $studentService)
    {
        $this->studentService = $studentService;
    }

    // ===== FRONTEND =====
    public function cekRapor()
    {
        $santri     = $this->studentService->all();
        $pengaturan = Setting::first();
        $namaTpq    = $pengaturan->nama_tpq ?? 'MSANTRI';

        return view('home.cek_rapor', compact('santri', 'namaTpq'));
    }

    // ===== ADMIN =====
    public function index()
    {
        $santri = $this->studentService->all();
        return view('admin.santri.index', compact('santri'));
    }

    public function store(StoreStudentRequest $request)
    {
        try {
            $id = $request->input('id_santri');
            $foto = $request->hasFile('foto') ? $request->file('foto') : null;

            if (empty($id)) {
                $student = $this->studentService->create($request->validated(), $foto);
            } else {
                $student = $this->studentService->update($id, $request->validated(), $foto);
            }

            // Mempertahankan redirect agar flow admin tidak rusak (Tujuannya sama saja)
            return redirect()->route('admin.santri')->with('alert_type', 'success')->with('alert_message', 'Data santri berhasil disimpan!');
        } catch (\Exception $e) {
            return back()->with('alert_type', 'error')->with('alert_message', $e->getMessage());
        }
    }

    public function updateStatus(Request $request)
    {
        try {
            $id     = $request->input('id');
            $status = $request->input('status');

            $student = $this->studentService->updateStatus($id, $status);

            return response()->json([
                'status' => 'success',
                'data' => $student,
                'message' => 'Status berhasil diupdate'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'data' => null,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $this->studentService->delete($id);
            return redirect()->route('admin.santri')->with('alert_type', 'success')->with('alert_message', 'Data santri berhasil dihapus!');
        } catch (\Exception $e) {
            return back()->with('alert_type', 'error')->with('alert_message', $e->getMessage());
        }
    }
}
