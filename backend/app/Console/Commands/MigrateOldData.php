<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Models\Student;

class MigrateOldData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'migrate:old-data';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Copy data from old db_msantri to new msantri_final';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Mulai menyalin data santri dari db_msantri...');

        try {
            // Ambil semua data dari database lama
            // Note: DB::connection() by default uses the current DB connection. 
            // We can query another database on the same server using `database.table` syntax in raw query or query builder.
            $oldSantri = DB::table('db_msantri.santri')->get();

            $count = 0;
            foreach ($oldSantri as $santri) {
                // Periksa apakah sudah ada (hindari duplikasi jika di-run berulang kali)
                if (!Student::where('nama_lengkap', $santri->nama_lengkap)->exists()) {
                    Student::create([
                        'nama_lengkap' => $santri->nama_lengkap,
                        'tempat_lahir' => $santri->tempat_lahir,
                        'tanggal_lahir' => $santri->tanggal_lahir,
                        'alamat' => $santri->alamat,
                        'nama_ortu' => $santri->nama_ortu,
                        'no_wa_ortu' => $santri->no_wa_ortu,
                        'capaian_hafalan' => $santri->capaian_hafalan ?? '-',
                        'catatan_pengajar' => $santri->catatan_pengajar ?? '',
                        'kehadiran' => 'hadir', // Default
                        'foto' => $santri->foto ?? 'default.png',
                    ]);
                    $count++;
                }
            }

            $this->info("Selesai! Berhasil menyalin {$count} data santri ke msantri_final.");
        } catch (\Exception $e) {
            $this->error('Gagal menyalin data: ' . $e->getMessage());
        }
    }
}
