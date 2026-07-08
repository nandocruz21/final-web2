@extends('layouts.app')

@section('title', 'MSANTRI - TPQ ' . ($pengaturan->nama_tpq ?? ''))

@section('content')
    <!-- NAVIGASI & HERO -->
    <section id="beranda">
      <header>
        <nav>
          <div class="logo">
            <img src="{{ asset('img/logo.png') }}" alt="logo" width="50px">
            MSANTRI
          </div>
          
          <button class="btn-hamburger-user" onclick="toggleNav()">
            <i class="fa-solid fa-bars"></i>
          </button>

          <ul id="navMenu">
            <li><a href="#beranda">Beranda</a></li>
            <li><a href="#sambutan">Sambutan</a></li>
            <li><a href="#tentang">Tentang</a></li>
            <li><a href="#galeri">Galeri</a></li>
            <li><a href="#informasi">Informasi</a></li>
            <li><a href="#jadwal">Jadwal</a></li>
          </ul>
        </nav>
      </header>

      <div class="hero">
        <span class="hero-subtitle">{{ $pengaturan->slogan ?? '' }}</span>
        <h1>
          Tempat Pengajian Qur'an<br />
          <span class="highlight">{{ $pengaturan->nama_tpq ?? 'MSANTRI' }}</span>
        </h1>
        <p>
          Saat ini terdapat <strong>{{ $totalSantri }}</strong> Santri yang terdaftar pada
          tempat pengajian ini.
        </p>
        <div class="cta">
          <a href="{{ route('cek.rapor') }}" class="btn-primary">Cek Progres Santri</a>
          <a href="https://wa.link/0jox26" class="btn-outline">Daftar</a>
        </div>
      </div>
    </section>

    <!-- SAMBUTAN -->
    <section class="sambutan scroll-animasi" id="sambutan">
      <div class="container-sambutan">
        <div class="sambutan-main">
          <h1>SAMBUTAN KEPALA TPQ</h1>
          <p class="sambutan-sbt">TPQ {{ $pengaturan->nama_tpq ?? '' }}</p>
          <div class="text-sambutan">
           <img src="{{ asset('img/profil.jpeg') }}" alt="demn" class="foto-kepala">
            <p><strong>Assalamu'alaikum Warahmatullahi Wabarakatuh</strong></p>
            <p>Segala puji bagi Allah SWT, Tuhan semesta alam. Shalawat dan salam semoga senantiasa menyertai Rasulullah Muhammad SAW, keluarga, serta para sahabatnya.</p>
            <p>Ayah dan Bunda yang kami hormati, mendidik anak-anak menjadi generasi pecinta Al-Qur'an adalah cita-cita kita bersama. Oleh karena itu, TPQ {{ $pengaturan->nama_tpq ?? '' }} terus berkomitmen memberikan dedikasi terbaik untuk membimbing putra-putri tercinta.</p>
            <p>Di era digital ini, kami sangat antusias menghadirkan website resmi TPQ Miftahul Jannah. Kami memahami betapa pentingnya peran orang tua dalam memantau perkembangan belajar anak. Melalui layanan ini, Ayah dan Bunda kini dapat dengan mudah melihat catatan hafalan dan kehadiran Ananda secara real-time dari mana saja.</p>
            <p>Kami berharap fasilitas ini dapat menjadi jembatan komunikasi yang hangat antara TPQ dan rumah. Mari bersama-sama kita wujudkan generasi masa depan yang cerdas dengan cahaya Al-Qur'an. Wassalamu'alaikum Warahmatullahi Wabarakatuh.</p>
          </div>
        </div>
    
        <div class="sambutan-sidebar">
          <h3>MENU</h3>
          <ul>
            <li><a href="#sambutan"><i class="fa-solid fa-angle-right"></i> Sambutan Ketua</a></li>
            <li><a href="#tentang"><i class="fa-solid fa-angle-right"></i> Tentang</a></li>
            <li><a href="#jadwal"><i class="fa-solid fa-angle-right"></i> Waktu & Jadwal</a></li>
            <li><a href="#informasi"><i class="fa-solid fa-angle-right"></i> Papan Informasi</a></li>
            <li><a href="{{ route('cek.rapor') }}"><i class="fa-solid fa-angle-right"></i> Cek Progres Santri</a></li>
          </ul>
        </div>
      </div>
    </section>

    <!-- TENTANG -->
    <section class="kedua" id="tentang">
      <div class="utama1 scroll-animasi">
        <div class="container">
          <div class="grid-item utama">
            <h2 class="section-title">Membangun Generasi <br />Cinta Al-Quran</h2>
            <p class="section-description">Kami berdedikasi untuk menyediakan tempat pendidikan Al-Quran yang nyaman dan bersahabat bagi anak-anak hingga dewasa.</p>
            <p class="section-description">Metode pembelajaran yang kami terapkan dirancang agar santri tidak merasa terbebani, melainkan rindu untuk terus datang mengaji.</p>
          </div>
          <div class="grid-item grid-item-small">
            <h3><div class="info-kedua"><i class="fa-solid fa-user-group"></i></div>Pengajar Sabar</h3>
            <p>Dibimbing langsung oleh ustadz dan ustadzah yang telaten dalam mengajar ngaji.</p>
          </div>
          <div class="grid-item grid-item-small">
            <h3><div class="info-kedua"><i class="fa-solid fa-book-open"></i></div>Metode Terstruktur</h3>
            <p>Menggunakan panduan jilid yang jelas sehingga progres anak mudah dipantau.</p>
          </div>
          <div class="grid-item grid-item-small">
            <h3><div class="info-kedua"><i class="fa-solid fa-star"></i></div>Fasilitas Nyaman</h3>
            <p>Ruang mengaji yang bersih, sirkulasi udara baik, dan lingkungan yang kondusif.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- JADWAL -->
    <section class="keempat" id="jadwal">
      <div class="Utama3">
        <h1>Waktu dan Jadwal Pengajian</h1>
        <p>Kegiatan belajar mengajar dilaksanakan secara rutin sesuai jadwal berikut.</p>
      </div>
      <div class="bungkus-jadwal">
        <div class="bungkus-jadwal-isi">
          <div class="box-jadwal1"><p>HARI MENGAJI</p><h2>Senin - Kamis</h2></div>
          <div class="box-jadwal2">Kegiatan pengajian rutin sore hari sepulang sekolah.</div>
          <div class="box-jadwal3"><span><i class="fa-regular fa-clock"></i> {{ $pengaturan->jadwal_seninkamis ?? '-' }}</span></div>
        </div>
        <div class="bungkus-jadwal-isi libur">
          <div class="box-jadwal1"><p>HARI ISTIRAHAT</p><h2>Jumat</h2></div>
          <div class="box-jadwal2">Kegiatan pengajian TPQ diliburkan. Santri dianjurkan murojaah mandiri.</div>
          <div class="box-jadwal3"><span><i class="fa-solid fa-door-closed"></i> {{ $pengaturan->jadwal_jumat ?? '-' }}</span></div>
        </div>
        <div class="bungkus-jadwal-isi">
          <div class="box-jadwal1"><p>HARI MENGAJI</p><h2>Sabtu</h2></div>
          <div class="box-jadwal2">Kegiatan pengajian reguler berlanjut di waktu sore.</div>
          <div class="box-jadwal3"><span><i class="fa-regular fa-clock"></i> {{ $pengaturan->jadwal_sabtu ?? '-' }}</span></div>
        </div>
        <div class="bungkus-jadwal-isi">
          <div class="box-jadwal1"><p>HARI MENGAJI</p><h2>Minggu</h2></div>
          <div class="box-jadwal2">Pengajian sesi pagi hari agar santri bisa istirahat di siang harinya.</div>
          <div class="box-jadwal3"><span><i class="fa-regular fa-clock"></i> {{ $pengaturan->jadwal_minggu ?? '-' }}</span></div>
        </div>
      </div>
    </section>

    <!-- INFORMASI -->
    <section class="ketiga" id="informasi">
      <div class="Utama2">
        <h1>Papan Informasi</h1>
        <p>Pengumuman dan informasi terbaru di TPQ {{ $pengaturan->nama_tpq ?? '' }}.</p>
      </div>
      <div class="bungkus scroll-animasi">
        @if($info)
          <div class="box">
            <div class="dalam1">
              <div class="info-pengumuman"><i class="fa-solid fa-bullhorn"></i></div>
              <p class="category">{{ $info->kategori }}</p>
              <h3>{{ $info->judul_info }}</h3>
            </div>
            <div class="dalam2">
              <p>{!! nl2br(e($info->isi_info)) !!}</p>
            </div>
            <div style="margin-top: 25px; font-size: 13px; color: #94a3b8; font-weight: 500;">
              <i class="fa-regular fa-calendar-check" style="margin-right: 5px;"></i>
              Diposting pada: {{ \Carbon\Carbon::parse($info->tanggal_posting)->translatedFormat('d M Y') }}
            </div>
          </div>
        @else
          <div class="box" style="border-color: #e2e8f0; box-shadow: none;">
            <div class="dalam1">
              <div class="info-pengumuman" style="background: #e2e8f0; color: #94a3b8; box-shadow: none;"><i class="fa-solid fa-inbox"></i></div>
              <h3 style="color: #94a3b8; margin-top: 20px;">Belum Ada Informasi</h3>
            </div>
            <div class="dalam2">
              <p style="font-size: 16px; color: #94a3b8;">Saat ini belum ada pengumuman baru dari pengelola TPQ.</p>
            </div>
          </div>
        @endif
      </div>
    </section>

    <!-- TESTIMONI -->
    <section class="testimoni scroll-animasi" id="testimoni">
      <div class="Utama2">
        <h1>Apa Kata Mereka?</h1>
        <p>Testimoni dari wali santri yang telah mempercayakan pendidikan Al-Quran putra-putrinya di TPQ {{ $pengaturan->nama_tpq ?? '' }}.</p>
      </div>
      <div class="marquee-container">
        <div class="marquee-content">
          @if($testimoni->count() > 0)
            @foreach($testimoni as $row)
              <div class="testi-modern-card">
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
            @endforeach
            {{-- Duplikat untuk marquee loop --}}
            @foreach($testimoni as $row)
              <div class="testi-modern-card">
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
            @endforeach
          @else
            <p style="color: #64748b; font-style: italic; text-align: center; width: 100%;">Belum ada testimoni.</p>
          @endif
        </div>
      </div>
      <div style="margin-top: 40px; display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
        <a href="{{ route('testimoni') }}" class="btn-ulasan" style="background: #f8fafc; color: #10b981; border: 2px solid #10b981;"><i class="fa-solid fa-list"></i> Lihat Semua Ulasan</a>
        <button class="btn-ulasan" onclick="bukaModalUlasan()" style="border:none; cursor:pointer; font-family: inherit;"><i class="fa-solid fa-pen-nib"></i> Tulis Ulasan Anda</button>
      </div>
    </section>

    <!-- GALERI -->
    <section class="galeri-siswa" id="galeri">
      <div class="judul-galeri">
        <h1>Dokumentasi Kegiatan</h1>
        <p>Potret momen indah para santri saat belajar dan menghafal.</p>
      </div>
      <div class="gambar-utama">
        @forelse($galeri as $g)
          <div class="gambarnya">
            <img src="{{ asset('img/' . $g->nama_file) }}" alt="{{ $g->keterangan }}">
            <p>{{ $g->keterangan }}</p>
          </div>
        @empty
          <p style='width:100%; color:#94a3b8;'>Belum ada foto dokumentasi.</p>
        @endforelse
      </div>
    </section>

    <!-- LOKASI -->
    <section class="kelima scroll-animasi">
      <div class="Utama4"><h1>LOKASI</h1></div>
      <div class="map-wrapper">
        @if($pengaturan && $pengaturan->link_maps)
          <iframe src="{{ $pengaturan->link_maps }}" width="800" height="600" style="border: 0" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        @endif
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer-modern">
      <div class="footer-container">
        <div class="footer-col">
          <h2 class="footer-brand">{{ $pengaturan->nama_tpq ?? '' }}</h2>
          <p class="footer-slogan">"{{ $pengaturan->slogan ?? '' }}"</p>
          <div class="footer-address">
            <h4>Alamat Lengkap</h4>
            <p>Jl. Sultan Hasanuddin, Kel. Letwaru, RT.009 <br />Kec. Kota Masohi, Kabupaten Maluku Tengah <br />Kode Pos 97511</p>
          </div>
        </div>
        <div class="footer-col">
          <h4>Tautan Cepat</h4>
          <ul class="footer-links">
            <li><a href="#beranda">Beranda Utama</a></li>
            <li><a href="{{ route('cek.rapor') }}">Cek Progres Santri</a></li>
            <li><a href="#jadwal">Jadwal Pengajian</a></li>
            <li><a href="#informasi">Papan Informasi</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Kontak &amp; Informasi</h4>
          <p class="footer-contact-text">Hubungi kami via WhatsApp untuk pendaftaran santri baru atau jika ada pertanyaan seputar kegiatan TPQ.</p>
          <div class="footer-socials">
            <a href="https://wa.link/op9mny" title="WhatsApp" target="_blank"><i class="fa-brands fa-whatsapp"></i></a>
            <a href="https://www.instagram.com/syahrularsydd._/" title="Instagram" target="_blank"><i class="fa-brands fa-instagram"></i></a>
            <a href="https://www.facebook.com/jonk.ambonk" title="Facebook" target="_blank"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=syahruddin.arsyad21@gmail.com" title="Gmail" target="_blank"><i class="fa-solid fa-envelope"></i></a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>Copyright &copy; {{ date('Y') }} TPQ {{ $pengaturan->nama_tpq ?? '' }}. All Rights Reserved.</p>
      </div>
    </footer>

    <!-- FLOATING WA -->
    <a href="https://wa.link/0jox26" class="floating-wa" target="_blank" title="Hubungi Kami via WhatsApp">
      <i class="fa-brands fa-whatsapp"></i>
    </a>

    <!-- MODAL ULASAN -->
    <div id="modalUlasan" class="modal-ulasan">
      <div class="modal-ulasan-content modern-modal animate__animated animate__bounceIn">
        <button class="btn-tutup-modal modern-close" onclick="tutupModalUlasan()"><i class="fa-solid fa-xmark"></i></button>
        <div class="modal-modern-header">
          <img src="https://cdn-icons-png.flaticon.com/512/4108/4108047.png" alt="Star" style="width: 50px; margin-bottom: 10px; animation: pulse 2s infinite;">
          <h2>Nilai Kami</h2>
          <p>Ulasan Anda sangat berarti bagi kami.</p>
        </div>
        <div class="modal-ulasan-body">
          <form action="{{ route('ulasan.store') }}" method="POST">
            @csrf
            <div class="grup-input-ulasan" style="text-align: center; margin-bottom: 15px;">
              <div class="star-rating">
                <input type="radio" id="star5" name="rating" value="5" required /><label for="star5" title="5 Bintang"><i class="fa-solid fa-star"></i></label>
                <input type="radio" id="star4" name="rating" value="4" /><label for="star4" title="4 Bintang"><i class="fa-solid fa-star"></i></label>
                <input type="radio" id="star3" name="rating" value="3" /><label for="star3" title="3 Bintang"><i class="fa-solid fa-star"></i></label>
                <input type="radio" id="star2" name="rating" value="2" /><label for="star2" title="2 Bintang"><i class="fa-solid fa-star"></i></label>
                <input type="radio" id="star1" name="rating" value="1" /><label for="star1" title="1 Bintang"><i class="fa-solid fa-star"></i></label>
              </div>
            </div>
            <div class="modern-form-group">
              <label for="namaWali">Nama Anda</label>
              <input type="text" id="namaWali" name="nama_wali" placeholder="Contoh: Bpk Irwan" required>
            </div>
            <div class="modern-form-group">
              <label for="isiTesti">Ceritakan pengalaman Anda...</label>
              <textarea id="isiTesti" name="isi_testimoni" rows="4" placeholder="Tulis ulasan Anda di sini..." required></textarea>
            </div>
            <button type="submit" name="kirim_ulasan" class="btn-kirim-ulasan modern-btn">
              Kirim <i class="fa-solid fa-paper-plane" style="margin-left: 5px;"></i>
            </button>
          </form>
        </div>
      </div>
    </div>

@push('scripts')
<script src="{{ asset('js/script.js') }}"></script>
@endpush
@endsection
