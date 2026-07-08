<!doctype html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Semua Ulasan - TPQ {{ $pengaturan->nama_tpq ?? '' }}</title>
    <link rel="icon" type="image/png" href="{{ asset('img/lg.jpeg') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
    <link rel="stylesheet" href="{{ asset('css/style.css') }}" />
    <style>
      body { background-color: #f8fafc; }
      .btn-back-home { color:#10b981;text-decoration:none;font-weight:600;font-size:15px;display:flex;align-items:center;gap:8px;padding:10px 20px;border-radius:12px;background:#ecfdf5;transition:all 0.3s;white-space:nowrap; }
      .btn-back-home:hover { background:#d1fae5; }
      .page-header { text-align:center;padding:60px 20px 20px; }
      .page-header h1 { font-size:32px;color:#1e293b;margin-bottom:10px; }
      .page-header p { color:#64748b; }
    </style>
  </head>
  <body>
    <header style="position:relative;padding:0;background:transparent;width:100%;box-shadow:none;">
      <nav style="display:flex;justify-content:space-between;align-items:center;width:100%;background:#ffffff;padding:15px 5%;box-shadow:0 4px 15px rgba(0,0,0,0.03);border-radius:0 0 20px 20px;">
        <div class="logo" style="color:#1e293b;display:flex;align-items:center;gap:10px;font-weight:700;font-size:22px;">
          <img src="{{ asset('img/logo.png') }}" alt="logo" width="40px">
          MSANTRI
        </div>
        <a href="{{ route('home') }}" class="btn-back-home"><i class="fa-solid fa-arrow-left"></i> <span>Kembali ke Beranda</span></a>
      </nav>
    </header>

    <div class="page-header">
      <h1>Semua Ulasan Wali Santri</h1>
      <p>Terima kasih atas kepercayaan Anda kepada TPQ {{ $pengaturan->nama_tpq ?? '' }}.</p>
    </div>

    <section class="testimoni" id="testimoni" style="padding-top:20px;background:transparent;min-height:60vh;">
      <div class="testimoni-container">
        @forelse($testimoni as $row)
          <div class="testi-modern-card animate__animated animate__fadeInUp">
            <div class="testi-modern-header">
              <div class="testi-user">
                <div class="testi-avatar">{{ strtoupper($row->inisial) }}</div>
                <div class="testi-info">
                  <h4>{{ $row->nama_wali }}</h4>
                  <span>Wali Santri</span>
                </div>
              </div>
              <div class="testi-quote-icon"><i class="fa-solid fa-quote-right"></i></div>
            </div>
            <div class="testi-modern-stars">
              @for($i = 1; $i <= $row->rating; $i++)
                <i class="fa-solid fa-star"></i>
              @endfor
            </div>
            <div class="testi-modern-body"><p>"{{ $row->isi_testimoni }}"</p></div>
          </div>
        @empty
          <p style="color:#64748b;font-style:italic;width:100%;text-align:center;">Belum ada testimoni.</p>
        @endforelse
      </div>
    </section>
  </body>
</html>
