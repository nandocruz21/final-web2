<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Information;
use App\Http\Requests\StoreInformationRequest;
use App\Http\Requests\UpdateInformationRequest;
use App\Http\Resources\InformationResource;
use Illuminate\Http\Request;

class InformationApiController extends Controller
{
    public function index()
    {
        $info = Information::orderByDesc('id')->paginate(10);
        
        $resourceCollection = InformationResource::collection($info->getCollection());
        $info->setCollection($resourceCollection->collection);
        
        return response()->json($info);
    }

    public function store(StoreInformationRequest $request)
    {
        $data = $request->validated();

        $info = Information::create([
            'kategori' => $data['kategori'],
            'judul_info' => $data['judul_info'],
            'isi_info' => $data['isi_info'],
            'is_urgent' => $data['is_urgent'] ?? false,
            'tanggal_posting' => now()->toDateString(),
        ]);

        return response()->json(['success' => true, 'data' => new InformationResource($info)]);
    }

    public function update(UpdateInformationRequest $request, $id)
    {
        $data = $request->validated();

        $info = Information::findOrFail($id);
        $info->update([
            'kategori' => $data['kategori'],
            'judul_info' => $data['judul_info'],
            'isi_info' => $data['isi_info'],
            'is_urgent' => $data['is_urgent'] ?? false,
        ]);

        return response()->json(['success' => true, 'data' => new InformationResource($info)]);
    }

    public function destroy($id)
    {
        $info = Information::findOrFail($id);
        $info->delete();
        
        return response()->json(['success' => true, 'message' => 'Pengumuman dihapus']);
    }
}
