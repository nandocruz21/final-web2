<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InformationResource extends JsonResource
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
            'kategori' => $this->kategori,
            'judul_info' => $this->judul_info,
            'isi_info' => $this->isi_info,
            'tanggal_posting' => $this->tanggal_posting,
            'is_urgent' => (bool) $this->is_urgent,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
