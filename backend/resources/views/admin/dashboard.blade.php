@extends('layouts.admin')

@section('title', 'MSANTRI Dashboard')
@section('nav_dashboard', 'active')

@section('content')
  <div class="header-content">
    <h1>Ikhtisar TPQ</h1>
    <p>Ringkasan cepat data operasional Miftahul Jannah hari ini.</p>
  </div>

  <div class="dashboard">
    <!-- Hero Card -->
    <div class="card hero-card">
      <h2>Ahlan Wa Sahlan, Admin!</h2>
      <p>Pantau terus perkembangan hafalan santri agar orang tua di rumah bisa melihat progres anak-anaknya secara langsung melalui website.</p>
      <div>
        <a href="{{ route('home') }}" class="btn-primary" target="_blank">
          <i class="fa-solid fa-globe" style="margin-right: 8px"></i> Lihat Web Publik
        </a>
      </div>
    </div>

    <!-- Stats Card -->
    <div class="card stat-card">
      <div class="stat-icon"><i class="fa-solid fa-users"></i></div>
      <div class="stat-value">{{ $totalSantri }}</div>
      <div class="stat-label">Total Santri</div>
    </div>

    <!-- Aktivitas -->
    <div class="card activity-section" style="grid-column: 1 / -1;">
      <h3 style="margin-bottom: 1.5rem; color: #1e293b; font-size: 30px;">Riwayat Aktifitas</h3>

      @if(count($resultAktifitas) > 0)
        @foreach($resultAktifitas as $row)
          <div class="activity-item">
            <div class="activity-date">
              {{ \Carbon\Carbon::parse($row->waktu_update)->setTimezone('Asia/Makassar')->format('d M Y, H:i') }} WIB
            </div>
            <div class="activity-text">{!! $row->teks !!}</div>
          </div>
        @endforeach
      @else
        <div class="activity-item" style="border: none">
          <div class="activity-text" style="color: #94a3b8;">Belum ada aktifitas yang tercatat di sistem.</div>
        </div>
      @endif
    </div>
  </div>
@endsection
