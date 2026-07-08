@extends('layouts.admin')

@section('title', 'Informasi - MSANTRI')
@section('nav_informasi', 'active')

@push('styles')
<link rel="stylesheet" href="{{ asset('css/admin_info.css') }}" />
@endpush

@section('content')
  <div class="header-content">
    <h1>Papan Informasi</h1>
    <p>Buat pengumuman baru dan lihat pratinjaunya tampil di halaman utama.</p>
  </div>

  <div class="dashboard">
    <div class="baris-flex">
      <!-- Form Input -->
      <div class="card card-kiri">
        <div class="kepala-kotak">
          <h3 class="judul-kotak">Posting Baru</h3>
        </div>

        <form action="{{ route('admin.informasi.store') }}" method="POST">
          @csrf
          <input type="hidden" name="id_info" id="inputIdInfo">

          <div class="grup-form">
            <label>Judul Informasi</label>
            <input type="text" name="judul" id="inputJudul" placeholder="Contoh: Libur Sampai Tanggal..." required />
          </div>

          <div class="grup-form">
            <label>Isi Pesan / Keterangan</label>
            <textarea rows="4" name="isi" id="inputIsi" placeholder="Tetap membaca dan menghafal di rumah..." required></textarea>
          </div>

          <button type="submit" class="tombol-tambah" id="btnSimpan">
            <i class="fa-solid fa-paper-plane"></i> Terbitkan Sekarang
          </button>
          
          <button type="button" class="tombol-tambah" id="btnBatalEdit" style="display:none;background:#94a3b8;margin-top:10px;" onclick="batalEdit()">
            <i class="fa-solid fa-xmark"></i> Batal Edit
          </button>
        </form>
      </div>

      <!-- Daftar Pengumuman -->
      <div class="kolom-kanan">
        <div class="daftar-kartu">
          @forelse($informasi as $data)
            <div class="kartu-info">
              <div class="tanggal-posting">
                <i class="fa-regular fa-calendar" style="margin-right:5px"></i>
                {{ \Carbon\Carbon::parse($data->tanggal_posting)->translatedFormat('d M Y') }}
              </div>

              <div class="aksi-pojok">
                <button class="btn-aksi btn-edit" title="Edit Info"
                        onclick="editInfo('{{ $data->id_info }}', '{{ addslashes($data->judul_info) }}', '{{ addslashes($data->isi_info) }}')">
                  <i class="fa-solid fa-pen"></i>
                </button>
                <a href="{{ route('admin.informasi.destroy', $data->id_info) }}" class="btn-aksi btn-hapus" title="Hapus Info"
                   onclick="return confirm('Yakin ingin menghapus pengumuman ini?')" style="display:flex;text-decoration:none;">
                  <i class="fa-solid fa-trash"></i>
                </a>
              </div>

              <div class="ikon-kartu"><i class="fa-solid fa-bullhorn"></i></div>
              <p class="teks-kategori">{{ $data->kategori ?? 'PENGUMUMAN' }}</p>
              <h4 class="teks-judul">{{ $data->judul_info }}</h4>
              <p class="teks-deskripsi">{!! nl2br(e($data->isi_info)) !!}</p>
            </div>
          @empty
            <div class="kartu-info" style="border-color:#e2e8f0;background:#ffffff;box-shadow:none;">
              <p class="teks-deskripsi" style="text-align:center;color:#94a3b8;">Belum ada pengumuman yang diterbitkan.</p>
            </div>
          @endforelse
        </div>
      </div>
    </div>
  </div>

@push('scripts')
<script src="{{ asset('js/admin-info.js') }}"></script>
@endpush
@endsection
