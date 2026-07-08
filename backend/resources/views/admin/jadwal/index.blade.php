@extends('layouts.admin')

@section('title', 'Jadwal & Lokasi - MSANTRI')
@section('nav_jadwal', 'active')

@push('styles')
<link rel="stylesheet" href="{{ asset('css/admin_jadwal.css') }}" />
@endpush

@section('content')
  <div class="header-content">
    <h1>Jadwal &amp; Lokasi TPQ</h1>
    <p>Atur waktu kegiatan belajar mengajar dan perbarui titik lokasi Google Maps.</p>
  </div>

  @if(session('success'))
    <div style="background:#d1fae5;border:1px solid #6ee7b7;color:#065f46;padding:12px 15px;border-radius:8px;margin-bottom:15px;font-size:14px;">
      <i class="fa-solid fa-check-circle"></i> {{ session('success') }}
    </div>
  @endif

  <div class="dashboard">
    <div class="baris-flex">
      <!-- Form Jadwal -->
      <div class="card card-kiri">
        <div class="kepala-kotak">
          <h3 class="judul-kotak"><i class="fa-regular fa-clock" style="color:#10b981;margin-right:10px;"></i> Waktu Pengajian</h3>
        </div>
        
        <form action="{{ route('admin.jadwal.update') }}" method="POST">
          @csrf
          <input type="hidden" name="jenis_form" value="jadwal">

          <div class="grid-form">
            <div class="grup-form">
              <label>Senin - Kamis (Hari Kerja)</label>
              <input type="text" name="seninkamis" value="{{ $pengaturan->jadwal_seninkamis ?? '' }}" required />
            </div>
            <div class="grup-form">
              <label>Jumat (Hari Istirahat)</label>
              <input type="text" name="jumat" value="{{ $pengaturan->jadwal_jumat ?? '' }}" style="color:#ef4444;font-weight:bold;" required />
            </div>
            <div class="grup-form">
              <label>Sabtu (Akhir Pekan)</label>
              <input type="text" name="sabtu" value="{{ $pengaturan->jadwal_sabtu ?? '' }}" required />
            </div>
            <div class="grup-form">
              <label>Minggu (Akhir Pekan)</label>
              <input type="text" name="minggu" value="{{ $pengaturan->jadwal_minggu ?? '' }}" required />
            </div>
          </div>
          
          <div class="footer-form">
            <button type="submit" class="tombol-simpan">
              <i class="fa-solid fa-floppy-disk"></i> Simpan Jadwal
            </button>
          </div>
        </form>
      </div>

      <!-- Form Peta -->
      <div class="card card-kanan">
        <div class="kepala-kotak">
          <h3 class="judul-kotak"><i class="fa-solid fa-map-location-dot" style="color:#10b981;margin-right:10px;"></i> Peta Lokasi</h3>
        </div>
        
        <form action="{{ route('admin.jadwal.update') }}" method="POST">
          @csrf
          <input type="hidden" name="jenis_form" value="peta">

          <div class="grup-form">
            <label>Link Embed (src) Google Maps</label>
            <p class="teks-bantuan">*Salin link dari atribut <code>src="..."</code> pada kode embed Google Maps dan tempel di bawah ini.</p>
            <textarea name="link_maps" rows="3" required>{{ $pengaturan->link_maps ?? '' }}</textarea>
          </div>

          <div class="kotak-peta">
            @if(!empty($pengaturan->link_maps))
              <iframe src="{{ $pengaturan->link_maps }}" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            @else
              <p style="color:#94a3b8;font-size:14px;">Belum ada peta yang disematkan.</p>
            @endif
          </div>
          
          <div class="footer-form">
            <button type="submit" class="tombol-simpan tombol-penuh">
              <i class="fa-solid fa-map-pin"></i> Perbarui Peta
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
@endsection
