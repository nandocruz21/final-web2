<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Laporan Kehadiran Mingguan</title>
    <style>
        body { font-family: sans-serif; font-size: 14px; }
        .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #333; padding-bottom: 10px; }
        .header h2 { margin: 0; padding: 0; }
        .student-info { margin-bottom: 20px; }
        .student-info table { width: 100%; }
        .student-info td { padding: 5px 0; }
        .history-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        .history-table th, .history-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        .history-table th { background-color: #f2f2f2; }
        .text-center { text-align: center; }
    </style>
</head>
<body>
    <div class="header">
        <h2>Laporan Kehadiran & Capaian Mingguan</h2>
        <p>Taman Pendidikan Al-Qur'an (TPQ) MSANTRI</p>
    </div>

    <div class="student-info">
        <table>
            <tr>
                <td width="20%"><strong>Nama Santri</strong></td>
                <td width="5%">:</td>
                <td>{{ $student->nama_lengkap }}</td>
            </tr>
            <tr>
                <td><strong>Alamat</strong></td>
                <td>:</td>
                <td>{{ $student->alamat }}</td>
            </tr>
            <tr>
                <td><strong>Tanggal Laporan</strong></td>
                <td>:</td>
                <td>{{ date('d-m-Y') }}</td>
            </tr>
        </table>
    </div>

    <h3>Riwayat Terbaru</h3>
    <table class="history-table">
        <thead>
            <tr>
                <th width="5%" class="text-center">No</th>
                <th width="20%">Tanggal</th>
                <th width="50%">Capaian Hafalan</th>
                <th width="25%">Status Kehadiran</th>
            </tr>
        </thead>
        <tbody>
            @forelse($histories as $index => $history)
            <tr>
                <td class="text-center">{{ $index + 1 }}</td>
                <td>{{ $history->created_at->format('d/m/Y') }}</td>
                <td>{{ $history->capaian_hafalan }}</td>
                <td>{{ ucfirst($history->kehadiran) }}</td>
            </tr>
            @empty
            <tr>
                <td colspan="4" class="text-center">Belum ada data riwayat</td>
            </tr>
            @endforelse
        </tbody>
    </table>
</body>
</html>
