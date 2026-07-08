<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Login - MSANTRI</title>
    <link rel="icon" type="image/png" href="{{ asset('img/lg.jpeg') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
    <link rel="stylesheet" href="{{ asset('css/login.css') }}" />
  </head>
  <body>
    <div class="login-container">
      <div class="login-card">
        <div class="brand-header">
          <img src="{{ asset('img/logo.png') }}" alt="logo" width="50px">
          <h1>MSANTRI.</h1>
          <p>Panel Pengelola</p>
        </div>

        <div class="welcome-text">
          <h2>SELAMAT DATANG ADMIN</h2>
          <p>Silakan masukkan kredensial Anda untuk mengakses sistem TPQ.</p>
        </div>

        @if(session('error'))
          <div style="background:#fee2e2;border:1px solid #fca5a5;color:#dc2626;padding:10px 15px;border-radius:8px;margin-bottom:15px;font-size:14px;">
            {{ session('error') }}
          </div>
        @endif

        <form method="POST" action="{{ route('admin.login.post') }}">
          @csrf
          <div class="form-group">
            <label for="username">Username Admin</label>
            <div class="input-wrapper">
              <input type="text" id="username" name="username" class="form-control"
                     placeholder="Ketik username Anda..." required autocomplete="off" />
              <i class="fa-regular fa-user"></i>
            </div>
          </div>

          <div class="form-group">
            <label for="password">Kata Sandi</label>
            <div class="input-wrapper">
              <input type="password" id="password" name="password" class="form-control"
                     placeholder="••••••••" required />
              <i class="fa-solid fa-lock"></i>
            </div>
          </div>

          <button type="submit" class="btn-login">
            Masuk ke Sistem <i class="fa-solid fa-arrow-right-to-bracket"></i>
          </button>
        </form>
      </div>
    </div>
  </body>
</html>
