<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Information;
use App\Models\Setting;
use App\Models\Gallery;
use App\Models\Testimonial;

class HomeController extends Controller
{
    public function index()
    {
        $totalSantri = Student::count();
        $info        = Information::orderByDesc('tanggal_posting')->orderByDesc('id_info')->first();
        $pengaturan  = Setting::first();
        $galeri      = Gallery::orderByDesc('id_galeri')->get();
        $testimoni   = Testimonial::orderByDesc('id_testi')->take(5)->get();

        return view('home.index', compact('totalSantri', 'info', 'pengaturan', 'galeri', 'testimoni'));
    }
}
