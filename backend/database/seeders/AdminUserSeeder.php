<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Check if admin already exists to prevent duplicate entries
        if (!User::where('email', 'admin@msantri.com')->exists()) {
            User::create([
                'name' => 'Administrator',
                'email' => 'admin@msantri.com',
                'password' => Hash::make('pw'), // Simple password for final project
            ]);
        }
    }
}
