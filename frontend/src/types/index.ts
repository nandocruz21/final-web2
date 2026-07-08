export interface Santri {
  id_santri: string;
  nama_lengkap: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  alamat: string;
  nama_ortu: string;
  no_wa_ortu: string;
  capaian_hafalan: string;
  catatan_pengajar: string;
  kehadiran: 'hadir' | 'izin' | 'sakit' | 'alpha';
  foto: string;
}

export interface Informasi {
  id_info: string;
  judul_info: string;
  isi_info: string;
  tanggal_posting: string;
  kategori: string;
}

export interface Galeri {
  id_galeri: string;
  nama_file: string;
  keterangan: string;
  tanggal_upload: string;
}

export interface Testimoni {
  id_testi: string;
  nama_wali: string;
  kelas_santri: string;
  inisial: string;
  rating: number;
  isi_testimoni: string;
}

export interface Pengaturan {
  nama_tpq: string;
  jadwal_seninkamis: string;
  jadwal_jumat: string;
  jadwal_sabtu: string;
  jadwal_minggu: string;
  link_maps: string;
}

export interface RiwayatProgres {
  id_riwayat: string;
  id_santri: string;
  tanggal_riwayat: string;
  capaian_lama: string;
  capaian_baru: string;
  catatan_lama: string;
  catatan_baru: string;
}
