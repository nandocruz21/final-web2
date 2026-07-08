@extends('layouts.admin')

@section('title', 'Galeri - MSANTRI Admin')
@section('nav_galeri', 'active')

@push('styles')
<link rel="stylesheet" href="{{ asset('css/admin_galeri.css') }}" />
@endpush

@section('content')
  <div class="header-content">
    <h1>Galeri Dokumentasi</h1>
    <p>Unggah momen kegiatan santri untuk ditampilkan di halaman utama.</p>
  </div>

  @if(session('msg'))
    <div class="alert alert-{{ session('msg_type') }}">{{ session('msg') }}</div>
  @endif

  <div class="baris-flex">
    <!-- Form Unggah -->
    <div class="card card-kiri">
      <h3 style="margin-bottom:20px;font-family:Amiri;font-size:24px;color:#1e293b;">Unggah Foto</h3>
      <form action="{{ route('admin.galeri.store') }}" method="POST" enctype="multipart/form-data">
        @csrf
        <div class="grup-form">
          <label>Pilih File Foto</label>
          <input type="file" name="foto" required>
        </div>
        <div class="grup-form">
          <label>Keterangan / Judul Foto</label>
          <textarea name="keterangan" rows="3" placeholder="Contoh: Belajar Tajwid Bersama" required></textarea>
        </div>
        <button type="submit" class="btn-submit">
          <i class="fa-solid fa-paper-plane"></i> Terbitkan Foto
        </button>
      </form>
    </div>

    <!-- Daftar Galeri -->
    <div class="kolom-kanan">
      <div class="grid-galeri">
        @forelse($galeri as $row)
          <div class="kartu-galeri">
            <a href="{{ route('admin.galeri.destroy', $row->id_galeri) }}" class="btn-hapus-foto"
               onclick="return confirm('Hapus foto ini dari galeri?')">
              <i class="fa-solid fa-trash-can"></i>
            </a>
            <div class="img-container">
              <img src="{{ asset('img/' . $row->nama_file) }}" alt="Dokumentasi">
            </div>
            <div class="info-galeri">
              <p>{{ $row->keterangan }}</p>
              <small style="color:#94a3b8;font-size:10px;">{{ \Carbon\Carbon::parse($row->tanggal_upload)->format('d/m/Y') }}</small>
            </div>
          </div>
        @empty
          <div style="grid-column:1/-1;text-align:center;padding:50px;background:#fff;border-radius:20px;color:#94a3b8;border:1px dashed #cbd5e1;">
            <i class="fa-regular fa-images" style="font-size:40px;margin-bottom:10px;"></i>
            <p>Belum ada koleksi foto dokumentasi.</p>
          </div>
        @endforelse
      </div>
    </div>
  </div>
@endsection
