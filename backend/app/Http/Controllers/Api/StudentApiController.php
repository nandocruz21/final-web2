<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\StudentService;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use Illuminate\Http\Request;

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
            'data' => $santri
        ]);
    }

    public function show($id)
    {
        try {
            $student = $this->studentService->find($id);
            return response()->json([
                'status' => 'success',
                'data' => $student
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
                'data' => $student
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
                'data' => $student
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

            return response()->json([
                'status' => 'success',
                'message' => 'Status kehadiran berhasil diperbarui',
                'data' => $student
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
}
