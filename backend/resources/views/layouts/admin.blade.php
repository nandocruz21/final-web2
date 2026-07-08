<!doctype html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@yield('title', 'MSANTRI Admin')</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="icon" type="image/png" href="{{ asset('img/lg.jpeg') }}">
    <link rel="stylesheet" href="{{ asset('css/admin.css') }}" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
    @stack('styles')
  </head>
  <body>
    <!-- SIDEBAR -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <img src="{{ asset('img/logo.png') }}" alt="Logo" width="40px"/>
        <p>MSANTRI</p>
        <button class="btn-close-sidebar" onclick="toggleSidebar()">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div class="sidebar-menu">
        <p>Menu Utama</p>
        <a href="{{ route('admin.dashboard') }}" class="ini-nav @yield('nav_dashboard')">
          <i class="fa-solid fa-border-all"></i>
          <span>Dashboard</span>
        </a>
        <a href="{{ route('admin.santri') }}" class="ini-nav @yield('nav_santri')">
          <i class="fa-solid fa-book-open-reader"></i>
          <span>Progres Santri</span>
        </a>
        <a href="{{ route('admin.informasi') }}" class="ini-nav @yield('nav_informasi')">
          <i class="fa-solid fa-bullhorn"></i>
          <span>Informasi</span>
        </a>
        <a href="{{ route('admin.galeri') }}" class="ini-nav @yield('nav_galeri')">
          <i class="fa-regular fa-image"></i>
          <span>Galeri</span>
        </a>
        <a href="{{ route('admin.jadwal') }}" class="ini-nav @yield('nav_jadwal')">
          <i class="fa-regular fa-calendar-check"></i>
          <span>Jadwal &amp; Lokasi</span>
        </a>
        <a href="{{ route('admin.testimoni') }}" class="ini-nav @yield('nav_testimoni')">
          <i class="fa-solid fa-comments"></i>
          <span>Testimoni</span>
        </a>
      </div>

      <div class="sidebar-footer">
        <div class="profile-card">
          <div><img src="{{ asset('img/profil.jpeg') }}" alt="" width="40px" style="border-radius: 50%;"></div>
          <div class="profile-info">
            <h4>Administrator</h4>
          </div>
          <form method="POST" action="{{ route('admin.logout') }}" style="display:inline;">
            @csrf
            <button type="submit" style="background:none;border:none;cursor:pointer;padding:0;">
              <i class="fa-solid fa-power-off btn-logout" title="Logout"></i>
            </button>
          </form>
        </div>
      </div>
    </aside>

    <main class="main-content">
      <!-- MOBILE HEADER -->
      <div class="mobile-header">
        <button class="btn-hamburger" onclick="toggleSidebar()">
          <i class="fa-solid fa-bars"></i>
        </button>
        <div class="mobile-logo">
          <img src="{{ asset('img/logo.png') }}" alt="Logo">
          <span>MSANTRI</span>
        </div>
      </div>

      @yield('content')
    </main>

    <script>
      function toggleSidebar() {
        document.querySelector('.sidebar').classList.toggle('show');
      }

      document.querySelectorAll('.ini-nav').forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 768) {
            document.querySelector('.sidebar').classList.remove('show');
          }
        });
      });

      document.addEventListener('click', function(event) {
        const sidebar   = document.querySelector('.sidebar');
        const hamburger = document.querySelector('.btn-hamburger');
        if (sidebar && hamburger && !sidebar.contains(event.target) && !hamburger.contains(event.target)) {
          if (sidebar.classList.contains('show')) {
            sidebar.classList.remove('show');
          }
        }
      });
    </script>
    @stack('scripts')
  </body>
</html>
