<!doctype html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cek Progres Santri - MSANTRI</title>
    <link rel="icon" type="image/png" href="{{ asset('img/lg.jpeg') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    <link href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/kdr.css') }}" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js"></script>
  </head>
  <body>

    <header>
      <div class="logo">
        <img src="{{ asset('img/logo.png') }}" alt="logo">
        <span>MSANTRI</span>
      </div>
      <a href="{{ route('home') }}" class="btn-back">
         <span>Kembali ke Beranda</span><i class="fa-solid fa-arrow-right"></i>
      </a>
    </header>

    <div class="search-container">
      <div class="search-header">
        <h1>Pencarian Data Santri</h1>
        <p>Ketik nama lengkap anak Anda untuk memantau catatan perkembangan hafalan dan presensi hari ini secara real-time.</p>
      </div>

      <div class="search-box">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" id="searchInput" placeholder="Ketik nama santri (contoh: Ahmad)..." autocomplete="off" onkeyup="filterSantri()">
      </div>

      <div class="results-area" id="resultsArea">
        
        @if($santri->count() > 0)
          @foreach($santri as $data)
            @php
              $status = $data->kehadiran ?: 'alpha';
              $tglLahir = ($data->tanggal_lahir && $data->tanggal_lahir != '0000-00-00')
                  ? \Carbon\Carbon::parse($data->tanggal_lahir)->translatedFormat('d F Y')
                  : '-';
              $catatan   = $data->catatan_pengajar ?? '';
              $capaian   = $data->capaian_hafalan ?: 'Iqra/Juz Amma';
              $fotoDb    = $data->foto ?: 'default.png';
              $pathFoto  = asset('uploads/' . $fotoDb);
              $waktuTampil = $data->waktu_update
                  ? \Carbon\Carbon::parse($data->waktu_update)->format('d/m/Y, H:i')
                  : 'Belum diupdate';
              $badges = [
                  'hadir' => ['teks' => 'STATUS: HADIR', 'ikon' => 'fa-check',      'kelas' => 'hadir'],
                  'izin'  => ['teks' => 'STATUS: IZIN',  'ikon' => 'fa-envelope',   'kelas' => 'izin'],
                  'sakit' => ['teks' => 'STATUS: SAKIT', 'ikon' => 'fa-bed-pulse',  'kelas' => 'sakit'],
                  'alpha' => ['teks' => 'STATUS: ALPHA', 'ikon' => 'fa-xmark',      'kelas' => 'alpha'],
              ];
              $badge = $badges[$status] ?? $badges['alpha'];
            @endphp

            <div class="student-card santri-item">
              <div class="student-info">
                <div class="student-avatar avatar-{{ $status }}">
                    <img src="{{ $pathFoto }}" alt="Foto {{ $data->nama_lengkap }}">
                </div>
                <div class="student-details">
                  <h3 class="santri-name">{{ $data->nama_lengkap }}</h3>
                  <p><i class="fa-solid fa-location-dot" style="color:#10B981;"></i> TPQ {{ $namaTpq }}</p>
                  @if($catatan !== '' && $catatan !== '- Belum ada catatan -')
                    <div class="catatan-guru">
                      <strong>Catatan Pengajar:</strong> {{ $catatan }}
                    </div>
                  @endif
                </div>
              </div>
              
              <div class="student-progress">
                <div class="progress-label">Capaian Terakhir</div>
                <div class="progress-value">{{ $capaian }}</div>
                <div class="waktu-update" title="Waktu terakhir Ustadz/Ustadzah menyimpan data">
                    <i class="fa-regular fa-clock"></i> Update: {{ $waktuTampil }}
                </div>
                <div class="badge-group">
                    <button class="btn-riwayat" onclick="lihatRiwayat('{{ $data->id_santri }}', '{{ addslashes($data->nama_lengkap) }}', '{{ addslashes($data->tempat_lahir) }}', '{{ $tglLahir }}', '{{ addslashes($data->nama_ortu) }}')">
                        <i class="fa-solid fa-clock-rotate-left"></i> Riwayat
                    </button>
                    <span class="badge {{ $badge['kelas'] }}"><i class="fa-solid {{ $badge['ikon'] }}"></i> {{ $badge['teks'] }}</span>
                </div>
              </div>
            </div>
          @endforeach
        @else
          <div class="empty-state" style="display: block;">
             <i class="fa-solid fa-database"></i>
             <h3>Database Kosong</h3>
             <p>Belum ada data santri di database atau koneksi terputus.</p>
          </div>
        @endif

        <div class="empty-state" id="emptyState" style="display: none;">
          <i class="fa-solid fa-file-circle-xmark"></i>
          <h3>Data Tidak Ditemukan</h3>
          <p>Pastikan ejaan nama sudah benar, atau hubungi pengelola TPQ jika data belum diperbarui.</p>
        </div>

      </div>
    </div>

    <!-- MODAL RIWAYAT -->
    <div id="modalRiwayat" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <div>
            <p>Riwayat Progres Belajar</p>
            <h2 id="judulNamaRiwayat">Nama Santri</h2>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <button class="btn-unduh-pdf" id="btnUnduhPDF" onclick="unduhRaporPDF()">
              <i class="fa-solid fa-file-pdf"></i> Unduh Rapor PDF
            </button>
            <button class="btn-close" onclick="tutupModalRiwayat()"><i class="fa-solid fa-xmark"></i></button>
          </div>
        </div>
        <div class="modal-body" id="tempatRiwayat">
            <p style="text-align: center; color: #94A3B8; margin-top: 20px;">Memuat data riwayat...</p>
        </div>
      </div>
    </div>

    <script>
      let dataSantriAktif = { nama: '', tempatLahir: '', tglLahir: '', namaOrtu: '', riwayat: [] };
      const namaTpq      = {{ Js::from(strtoupper($namaTpq)) }};
      const tanggalCetak = {{ Js::from(now()->translatedFormat('d F Y')) }};
      const logoBase64   = '{{ asset('img/logo.png') }}';

      function filterSantri() {
        let input    = document.getElementById('searchInput').value.toLowerCase();
        let cards    = document.getElementsByClassName('santri-item');
        let empty    = document.getElementById('emptyState');
        let found    = 0;
        if(input === "") {
          for(let i = 0; i < cards.length; i++) cards[i].style.display = "flex";
          empty.style.display = "none";
          return;
        }
        for(let i = 0; i < cards.length; i++) {
          let name = cards[i].querySelector('.santri-name').innerText.toLowerCase();
          if(name.includes(input)) { cards[i].style.display = "flex"; found++; }
          else cards[i].style.display = "none";
        }
        empty.style.display = (found === 0) ? "block" : "none";
      }

      function formatTanggalWeb(tgl) {
        const opsi = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(tgl).toLocaleDateString('id-ID', opsi);
      }

      function formatTanggalPDF(tgl) {
        const d = new Date(tgl);
        const b = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
        return d.getDate() + ' ' + b[d.getMonth()] + ' ' + d.getFullYear();
      }

      function lihatRiwayat(id, nama, tempat, tgl, ortu) {
        dataSantriAktif = { nama, tempatLahir: tempat, tglLahir: tgl, namaOrtu: ortu, riwayat: [] };
        document.getElementById('judulNamaRiwayat').innerText = nama;
        document.getElementById('modalRiwayat').classList.add('show');
        document.getElementById('tempatRiwayat').innerHTML = '<div class="timeline"><p style="text-align:center;color:#94A3B8;margin-top:20px;"><i class="fa-solid fa-circle-notch fa-spin"></i> Memuat data...</p></div>';

        fetch('{{ url('/api/riwayat') }}/' + id)
          .then(r => r.json())
          .then(data => {
            dataSantriAktif.riwayat = data;
            let html = '<div class="timeline">';
            if(data.length === 0) {
              html += '<p style="text-align:center;color:#EF4444;margin-top:20px;"><i class="fa-solid fa-folder-open"></i> Belum ada riwayat tercatat untuk santri ini.</p>';
            } else {
              data.forEach(item => {
                let catatan  = (item.catatan_pengajar && item.catatan_pengajar !== '- Belum ada catatan -') ? item.catatan_pengajar : '-';
                let kelasStatus = 's-' + item.kehadiran;
                html += `<div class="timeline-item"><div class="time-date"><i class="fa-regular fa-clock"></i> ${formatTanggalWeb(item.tanggal_riwayat)} WIB</div><div class="time-box"><span class="status-label ${kelasStatus}">${item.kehadiran.toUpperCase()}</span><h4>${item.capaian_hafalan}</h4><p>${catatan}</p></div></div>`;
              });
            }
            html += '</div>';
            document.getElementById('tempatRiwayat').innerHTML = html;
          })
          .catch(() => {
            document.getElementById('tempatRiwayat').innerHTML = '<p style="text-align:center;color:#EF4444;">Gagal mengambil data jaringan.</p>';
          });
      }

      function tutupModalRiwayat() { document.getElementById('modalRiwayat').classList.remove('show'); }

      window.onclick = function(e) {
        document.querySelectorAll('.modal-overlay').forEach(m => {
          if(e.target === m) m.classList.remove('show');
        });
      };

      function unduhRaporPDF() {
        const btn = document.getElementById('btnUnduhPDF');
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Memproses...';
        btn.disabled  = true;
        try {
          const { jsPDF }    = window.jspdf;
          const doc          = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
          const mL = 15, mR = 15, mA = 15, lK = 210, lI = 180;
          let posY = mA;
          const logoUk = 35, kopTg = 34;
          doc.addImage(logoBase64, 'PNG', mL + 10, posY + (kopTg - logoUk), logoUk, logoUk);
          const tX = lK / 2 + 8, tK = posY + kopTg / 2;
          doc.setFont('times','bold'); doc.setFontSize(20); doc.setTextColor(6,78,59);
          doc.text('TPQ ' + namaTpq, tX, tK - 7, {align:'center'});
          doc.setFont('times','normal'); doc.setFontSize(11); doc.setTextColor(0,0,0);
          doc.text('Pembelajaran Al-Quran dan Ilmu Agama Islam', tX, tK + 1, {align:'center'});
          doc.setFontSize(9); doc.setTextColor(100,100,100);
          doc.text('Cetak Dokumen Otomatis Sistem MSANTRI', tX, tK + 8, {align:'center'});
          posY += kopTg + 3;
          doc.setDrawColor(0,0,0); doc.setLineWidth(0.8);
          doc.line(mL, posY, lK - mR, posY); doc.setLineWidth(0.3);
          doc.line(mL, posY + 1.2, lK - mR, posY + 1.2);
          posY += 9;
          doc.setFont('times','bold'); doc.setFontSize(13); doc.setTextColor(0,0,0);
          const judul = 'LAPORAN HASIL PERKEMBANGAN SANTRI';
          doc.text(judul, lK/2, posY, {align:'center'});
          const jL = doc.getTextWidth(judul);
          doc.line((lK-jL)/2, posY+0.8, (lK+jL)/2, posY+0.8);
          posY += 10;
          doc.setFont('times','normal'); doc.setFontSize(11);
          const kL = 50, kT = 5;
          function baris(label, nilai) {
            doc.setFont('times','bold'); doc.text(label, mL, posY);
            doc.setFont('times','normal'); doc.text(':', mL+kL, posY);
            const nl = doc.splitTextToSize(nilai, lI - kL - kT - 5);
            doc.text(nl, mL+kL+kT, posY); posY += nl.length * 6;
          }
          baris('Nama Lengkap', dataSantriAktif.nama);
          baris('Tempat, Tgl Lahir', dataSantriAktif.tempatLahir + ', ' + dataSantriAktif.tglLahir);
          baris('Nama Orang Tua / Wali', dataSantriAktif.namaOrtu);
          posY += 4;
          const cW = [lI*.07, lI*.18, lI*.14, lI*.27, lI*.34];
          let body = [];
          if(dataSantriAktif.riwayat.length === 0) {
            body.push([{content:'Belum ada data riwayat belajar.',colSpan:5,styles:{halign:'center',fontStyle:'italic',textColor:[150,150,150]}}]);
          } else {
            dataSantriAktif.riwayat.forEach((item,idx) => {
              let catatan = (item.catatan_pengajar && item.catatan_pengajar !== '- Belum ada catatan -') ? item.catatan_pengajar : '-';
              body.push([idx+1, formatTanggalPDF(item.tanggal_riwayat), item.kehadiran.toUpperCase(), item.capaian_hafalan, catatan]);
            });
          }
          doc.autoTable({startY:posY, head:[['No','Tanggal Update','Kehadiran','Capaian Hafalan','Catatan Pengajar']], body,
            margin:{left:mL,right:mR}, tableWidth:lI,
            columnStyles:{0:{cellWidth:cW[0],halign:'center',valign:'middle'},1:{cellWidth:cW[1],halign:'center',valign:'middle'},2:{cellWidth:cW[2],halign:'center',valign:'middle'},3:{cellWidth:cW[3],valign:'middle'},4:{cellWidth:cW[4],valign:'top'}},
            headStyles:{fillColor:[241,245,249],textColor:[0,0,0],fontStyle:'bold',lineWidth:0.3,lineColor:[0,0,0],halign:'center',font:'times',fontSize:10},
            bodyStyles:{font:'times',fontSize:10,textColor:[0,0,0],lineWidth:0.3,lineColor:[0,0,0],minCellHeight:8,valign:'top'},
            alternateRowStyles:{fillColor:[255,255,255]}, rowPageBreak:'avoid', showHead:'everyPage',
            didDrawPage(data) { doc.setFont('times','normal'); doc.setFontSize(9); doc.setTextColor(120,120,120); doc.text('Halaman '+data.pageNumber, lK/2, 297-8, {align:'center'}); }
          });
          let fy = doc.lastAutoTable.finalY + 12;
          if((297 - 20 - fy) < 48) { doc.addPage(); fy = mA + 5; }
          doc.setFont('times','normal'); doc.setFontSize(11); doc.setTextColor(0,0,0);
          const xK = mL, xKn = lK - mR - 60, lB = 60;
          doc.text('Mengetahui,', xK+lB/2, fy, {align:'center'});
          doc.text('Orang Tua / Wali Santri', xK+lB/2, fy+6, {align:'center'});
          doc.line(xK+5, fy+38, xK+lB-5, fy+38);
          doc.text('( '+dataSantriAktif.namaOrtu+' )', xK+lB/2, fy+43, {align:'center'});
          doc.text('Diperiksa pada: '+tanggalCetak, xKn+lB/2, fy, {align:'center'});
          doc.text('Pengajar / Ustadzah', xKn+lB/2, fy+6, {align:'center'});
          doc.line(xKn+5, fy+38, xKn+lB-5, fy+38);
          doc.text('(Nurjannah)', xKn+lB/2, fy+43, {align:'center'});
          doc.save('Rapor_Santri_'+dataSantriAktif.nama.replace(/\s+/g,'_')+'.pdf');
        } catch(err) { alert('Gagal membuat PDF: '+err.message); }
        btn.innerHTML = '<i class="fa-solid fa-file-pdf"></i> Unduh Rapor PDF';
        btn.disabled  = false;
      }
    </script>
  </body>
</html>
