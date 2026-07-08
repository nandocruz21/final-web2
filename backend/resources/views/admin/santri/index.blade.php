@extends('layouts.admin')

@section('title', 'Progres Santri - MSANTRI')
@section('nav_santri', 'active')

@push('styles')
<link rel="stylesheet" href="{{ asset('css/admin_santri.css') }}" />
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<style>
  .modal-overlay { display: none; }
  .modal-overlay.show { display: flex !important; }
  .foto-profil-santri { width:100px;height:100px;border-radius:50%;object-fit:cover;border:3px solid #10b981;margin:0 auto 15px auto;display:block;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1); }
</style>
@endpush

@section('content')
  <div class="header-content">
    <h1>Data &amp; Progres Santri</h1>
    <p>Kelola capaian hafalan dan berikan catatan khusus untuk wali santri di rumah.</p>
  </div>

  <div class="dashboard">
    <div class="card card-full">
      <div class="kepala-kotak">
        <div class="cari-grup">
          <i class="fa-solid fa-search"></i>
          <input type="text" id="inputCari" onkeyup="cariSantri()" placeholder="Ketik nama santri..." />
        </div>
        <button class="tombol-tambah" onclick="bukaModalTambah()">
          <i class="fa-solid fa-plus"></i> Tambah Data Santri
        </button>
      </div>

      <div class="tabel-responsif">
        <table id="tabelSantri">
          <thead>
            <tr>
              <th style="width:5%">No</th>
              <th style="width:25%">Nama Lengkap</th>
              <th style="width:20%">Capaian Terakhir</th>
              <th style="width:20%">Catatan Pengajar</th>
              <th style="width:10%">Kehadiran</th>
              <th style="text-align:center;width:20%">Aksi</th>
            </tr>
          </thead>
          <tbody>
            @forelse($santri as $i => $data)
              @php
                $fotoDb   = $data->foto ?: 'default.png';
                $pathFoto = asset('uploads/' . $fotoDb);
              @endphp
              <tr>
                <td><strong style="color:#0f172a">{{ $i + 1 }}</strong></td>
                <td>
                  <div style="display:flex;align-items:center;gap:10px;">
                    <img src="{{ $pathFoto }}" alt="Foto" style="width:35px;height:35px;border-radius:50%;object-fit:cover;">
                    <strong style="color:#0f172a">{{ $data->nama_lengkap }}</strong>
                  </div>
                </td>
                <td>{{ $data->capaian_hafalan }}</td>
                <td class="catatan-teks">
                  @if(!empty($data->catatan_pengajar) && $data->catatan_pengajar != '- Belum ada catatan -')
                    <i class="fa-regular fa-comment-dots" style="color:#10b981;margin-right:5px"></i>{{ $data->catatan_pengajar }}
                  @else
                    <em style="color:#94a3b8;">- Belum ada catatan -</em>
                  @endif
                </td>
                <td>
                  <div class="select-wrapper">
                    <select class="status-select status-{{ $data->kehadiran }}"
                            data-id="{{ $data->id_santri }}"
                            onchange="ubahStatus(this)">
                      <option value="hadir" {{ $data->kehadiran == 'hadir' ? 'selected' : '' }}>HADIR</option>
                      <option value="izin"  {{ $data->kehadiran == 'izin'  ? 'selected' : '' }}>IZIN</option>
                      <option value="sakit" {{ $data->kehadiran == 'sakit' ? 'selected' : '' }}>SAKIT</option>
                      <option value="alpha" {{ $data->kehadiran == 'alpha' ? 'selected' : '' }}>ALPHA</option>
                    </select>
                  </div>
                </td>
                <td align="center">
                  <div class="grup-aksi">
                    <button type="button" class="aksi-info" title="Lihat Biodata Lengkap"
                            data-nama="{{ $data->nama_lengkap }}"
                            data-tempat="{{ $data->tempat_lahir }}"
                            data-tgl="{{ $data->tanggal_lahir }}"
                            data-alamat="{{ $data->alamat }}"
                            data-ortu="{{ $data->nama_ortu }}"
                            data-wa="{{ $data->no_wa_ortu }}"
                            data-foto="{{ $pathFoto }}"
                            onclick="lihatBiodata(this)">
                      <i class="fa-solid fa-address-card"></i>
                    </button>
                    <button type="button" class="aksi-edit" title="Edit Data"
                            data-id="{{ $data->id_santri }}"
                            data-nama="{{ $data->nama_lengkap }}"
                            data-tempat="{{ $data->tempat_lahir }}"
                            data-tgl="{{ $data->tanggal_lahir }}"
                            data-alamat="{{ $data->alamat }}"
                            data-ortu="{{ $data->nama_ortu }}"
                            data-wa="{{ $data->no_wa_ortu }}"
                            data-capaian="{{ $data->capaian_hafalan }}"
                            data-catatan="{{ $data->catatan_pengajar }}"
                            onclick="bukaModalEdit(this)">
                      <i class="fa-solid fa-pen"></i>
                    </button>
                    <a href="{{ route('admin.santri.destroy', $data->id_santri) }}" class="aksi-hapus" title="Hapus Data"
                       onclick="return confirm('Apakah Anda yakin ingin menghapus data {{ addslashes($data->nama_lengkap) }}?')" style="display:flex;">
                      <i class="fa-solid fa-trash"></i>
                    </a>
                  </div>
                </td>
              </tr>
            @empty
              <tr>
                <td colspan="6" style="text-align:center;padding:30px;color:#94a3b8;">Data santri belum tersedia.</td>
              </tr>
            @endforelse
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- MODAL BIODATA -->
  <div id="modalBiodata" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h2 style="font-family:'Amiri',serif;font-size:24px;color:#0f172a;">Biodata Santri</h2>
        <button class="close-btn" onclick="tutupModalBiodata()"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <img id="viewFoto" src="{{ asset('uploads/default.png') }}" alt="Foto Santri" class="foto-profil-santri">
      <div style="background:#f8fafc;padding:15px;border-radius:12px;margin-bottom:12px;border:1px solid #f1f5f9;">
        <label style="display:block;color:#94a3b8;font-size:11px;text-transform:uppercase;font-weight:700;margin-bottom:5px;">Nama Lengkap</label>
        <p id="viewNama" style="font-size:15px;font-weight:600;color:#1e293b;">-</p>
      </div>
      <div style="background:#f8fafc;padding:15px;border-radius:12px;margin-bottom:12px;border:1px solid #f1f5f9;">
        <label style="display:block;color:#94a3b8;font-size:11px;text-transform:uppercase;font-weight:700;margin-bottom:5px;">Tempat, Tanggal Lahir</label>
        <p id="viewLahir" style="font-size:15px;font-weight:600;color:#1e293b;">-</p>
      </div>
      <div style="background:#f8fafc;padding:15px;border-radius:12px;margin-bottom:12px;border:1px solid #f1f5f9;">
        <label style="display:block;color:#94a3b8;font-size:11px;text-transform:uppercase;font-weight:700;margin-bottom:5px;">Alamat Lengkap</label>
        <p id="viewAlamat" style="font-size:15px;font-weight:600;color:#1e293b;">-</p>
      </div>
      <div style="background:#f8fafc;padding:15px;border-radius:12px;margin-bottom:12px;border:1px solid #f1f5f9;">
        <label style="display:block;color:#94a3b8;font-size:11px;text-transform:uppercase;font-weight:700;margin-bottom:5px;">Nama Orang Tua / Wali</label>
        <p id="viewOrtu" style="font-size:15px;font-weight:600;color:#1e293b;">-</p>
      </div>
      <div style="background:#f8fafc;padding:15px;border-radius:12px;margin-bottom:12px;border:1px solid #f1f5f9;">
        <label style="display:block;color:#94a3b8;font-size:11px;text-transform:uppercase;font-weight:700;margin-bottom:5px;">No. WhatsApp Orang Tua</label>
        <p id="viewWaOrtu" style="font-size:15px;font-weight:600;color:#000000;">-</p>
      </div>
    </div>
  </div>
  
  <!-- MODAL TAMBAH/EDIT SANTRI -->
  <div id="modalTambahSantri" class="modal-overlay">
    <div class="modal-content" style="max-height:90vh;overflow-y:auto;">
      <div class="modal-header">
        <h2 id="judulModal">Tambah Santri Baru</h2>
        <button class="close-btn" onclick="tutupModalForm()"><i class="fa-solid fa-xmark"></i></button>
      </div>
      
      <form action="{{ route('admin.santri.store') }}" method="POST" enctype="multipart/form-data">
        @csrf
        <input type="hidden" name="id_santri" id="inputIdSantri">
        
        <div class="grup-form-modal">
          <label>Foto Profil (Opsional)</label>
          <input type="file" name="foto" id="inputFoto" accept="image/png,image/jpeg,image/jpg" style="padding:10px;border:1px solid #ccc;width:100%;border-radius:8px;">
          <small style="color:#64748b;">Abaikan jika tidak ingin mengubah foto. Maks 2MB.</small>
        </div>

        <div class="grup-form-modal">
          <label>Nama Lengkap</label>
          <input type="text" name="nama" id="inputNama" placeholder="Masukkan nama santri..." required>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;">
          <div class="grup-form-modal">
            <label>Tempat Lahir</label>
            <input type="text" name="tempat_lahir" id="inputTempatLahir" placeholder="Contoh: Masohi">
          </div>
          <div class="grup-form-modal">
            <label>Tanggal Lahir</label>
            <input type="date" name="tanggal_lahir" id="inputTanggalLahir">
          </div>
        </div>

        <div class="grup-form-modal">
          <label>Alamat Lengkap</label>
          <textarea name="alamat" id="inputAlamat" rows="2" placeholder="Masukkan alamat lengkap..."></textarea>
        </div>
        
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;">
          <div class="grup-form-modal">
            <label>Nama Orang Tua / Wali</label>
            <input type="text" name="nama_ortu" id="inputNamaOrtu" placeholder="Masukkan nama orang tua...">
          </div>
          <div class="grup-form-modal">
            <label>No. WhatsApp Orang Tua</label>
            <input type="text" name="no_wa_ortu" id="inputWaOrtu" placeholder="Contoh: 081234567890">
          </div>
        </div>

        <div class="grup-form-modal">
          <label>Capaian Hafalan / Jilid</label>
          <input type="text" name="capaian" id="inputCapaian" placeholder="Contoh: Jilid 3 - Hal 15" required>
        </div>
        <div class="grup-form-modal">
          <label>Catatan Pengajar (Opsional)</label>
          <textarea name="catatan" id="inputCatatan" rows="3" placeholder="Tambahkan pesan untuk wali santri di rumah..."></textarea>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn-batal" onclick="tutupModalForm()">Batal</button>
          <button type="submit" class="btn-simpan"><i class="fa-solid fa-floppy-disk"></i> <span id="teksTombol">Simpan Data</span></button>
        </div>
      </form>
    </div>
  </div>

@push('scripts')
<script>
  // Update status via AJAX
  function ubahStatus(el) {
    const id     = el.dataset.id;
    const status = el.value;
    const csrf   = '{{ csrf_token() }}';

    fetch('{{ route('admin.santri.status') }}', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrf },
      body: JSON.stringify({ id, status })
    }).then(r => r.json()).then(() => {
      el.className = 'status-select status-' + status;
    });
  }
</script>
<script src="{{ asset('js/admin-santri.js') }}"></script>
@if(session('alert_type') == 'success')
<script>
  document.addEventListener('DOMContentLoaded', function() {
    Swal.fire({ title:'Berhasil!', text:'{{ session('alert_message') }}', icon:'success', confirmButtonText:'OK', timer:3000 });
  });
</script>
@endif
@endpush
@endsection
