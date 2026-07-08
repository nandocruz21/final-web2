@extends('layouts.admin')

@section('title', 'Testimoni - MSANTRI')
@section('nav_testimoni', 'active')

@push('styles')
<link rel="stylesheet" href="{{ asset('css/admin_info.css') }}" />
@endpush

@section('content')
  <div class="header-content">
    <h1>Kelola Testimoni</h1>
    <p>Tambahkan ulasan dari orang tua santri agar tampil di halaman depan.</p>
  </div>

  <div class="dashboard">
    <div class="baris-flex">
      <!-- Form Input -->
      <div class="card card-kiri">
        <div class="kepala-kotak">
          <h3 class="judul-kotak">Tambah Testimoni</h3>
        </div>

        @if(session('success'))
          <div style="background:#d1fae5;border:1px solid #6ee7b7;color:#065f46;padding:12px;border-radius:8px;margin-bottom:15px;font-size:14px;">
            {{ session('success') }}
          </div>
        @endif

        <form action="{{ route('admin.testimoni.store') }}" method="POST">
          @csrf
          <div class="grup-form">
            <label>Nama Wali Santri</label>
            <input type="text" name="nama_wali" placeholder="Contoh: Bunda Aisyah" required />
          </div>
          <div class="grup-form">
            <label>Inisial Avatar</label>
            <input type="text" name="inisial" placeholder="Contoh: B" maxlength="2" required />
          </div>
          <div class="grup-form">
            <label>Rating (Bintang)</label>
            <select name="rating" required style="width:100%;padding:10px;border:1px solid #cbd5e1;border-radius:8px;">
              <option value="5">5 Bintang</option>
              <option value="4">4 Bintang</option>
              <option value="3">3 Bintang</option>
            </select>
          </div>
          <div class="grup-form" style="margin-top:15px;">
            <label>Isi Ulasan</label>
            <textarea rows="4" name="isi_testimoni" placeholder="Tuliskan ulasan..." required></textarea>
          </div>
          <button type="submit" class="tombol-tambah">
            <i class="fa-solid fa-paper-plane"></i> Simpan Testimoni
          </button>
        </form>
      </div>

      <!-- Daftar Testimoni -->
      <div class="kolom-kanan">
        <div class="daftar-kartu">
          @forelse($testimoni as $data)
            <div class="kartu-info" style="border-left:4px solid #10b981;">
              <div class="tanggal-posting">
                <i class="fa-solid fa-star" style="color:#fbbf24;margin-right:5px"></i>
                Rating: {{ $data->rating }}
              </div>

              <div class="aksi-pojok">
                <a href="{{ route('admin.testimoni.destroy', $data->id_testi) }}" class="btn-aksi btn-hapus" title="Hapus"
                   onclick="return confirm('Yakin ingin menghapus testimoni ini?')" style="display:flex;text-decoration:none;">
                  <i class="fa-solid fa-trash"></i>
                </a>
              </div>

              <div class="ikon-kartu" style="background:#10b981;color:white;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:1.2rem;">{{ strtoupper($data->inisial) }}</div>
              <p class="teks-kategori">Wali Santri</p>
              <h4 class="teks-judul">{{ $data->nama_wali }}</h4>
              <p class="teks-deskripsi">"{{ $data->isi_testimoni }}"</p>
            </div>
          @empty
            <div class="kartu-info" style="border-color:#e2e8f0;background:#ffffff;box-shadow:none;">
              <p class="teks-deskripsi" style="text-align:center;color:#94a3b8;">Belum ada testimoni.</p>
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
