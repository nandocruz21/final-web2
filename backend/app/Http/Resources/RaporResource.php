<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RaporResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'student_id' => $this->student_id,
            'nama_santri' => $this->santri ? $this->santri->nama_lengkap : 'Unknown',
            'capaian_hafalan' => $this->capaian_hafalan,
            'catatan_pengajar' => $this->catatan_pengajar,
            'kehadiran' => $this->kehadiran,
            'tanggal' => $this->created_at->format('d M Y H:i'),
        ];
    }
}
