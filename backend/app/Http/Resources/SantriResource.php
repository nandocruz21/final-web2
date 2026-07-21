<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SantriResource extends JsonResource
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
            'nis' => $this->nis,
            'nama_lengkap' => $this->nama_lengkap,
            'nama_panggilan' => $this->nama_panggilan,
            'tempat_lahir' => $this->tempat_lahir,
            'tanggal_lahir' => $this->tanggal_lahir,
            'jenis_kelamin' => $this->jenis_kelamin,
            'nama_ortu' => $this->nama_ortu,
            'no_wa_ortu' => $this->no_wa_ortu,
            'alamat' => $this->alamat,
            'status_aktif' => $this->status_aktif,
            'capaian_hafalan' => $this->capaian_hafalan,
            'kehadiran' => $this->kehadiran,
            'catatan_pengajar' => $this->catatan_pengajar,
            'foto' => $this->foto,
            'foto_path' => $this->foto_path ? asset('storage/' . $this->foto_path) : null,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
