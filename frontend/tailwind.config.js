/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ====== WARNA dari Design System Emerald & Marble ======
      colors: {
        // Warna Utama (Hijau Zamrud)
        primary: '#006747',
        'primary-dark': '#004d34',
        'primary-light': '#97f3c6',
        'on-primary': '#ffffff',

        // Aksen Emas (Gold)
        gold: '#a37c35',
        'gold-light': '#ffddae',
        'gold-dim': '#e9c176',

        // Background (Marmer Putih)
        surface: '#fcf9f8',
        'surface-low': '#f6f3f2',
        'surface-mid': '#f1edec',
        'surface-high': '#ebe7e6',
        'surface-highest': '#e5e1e1',

        // Teks
        'on-surface': '#1f1b1a',
        'on-surface-variant': '#524441',

        // Garis & Border
        outline: '#857370',
        'outline-light': '#d7c2be',
      },

      // ====== FONT dari Design System ======
      fontFamily: {
        // Playfair Display untuk Judul (elegan, mewah)
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        // Manrope untuk Body (bersih, mudah dibaca)
        sans: ['Manrope', 'Inter', 'sans-serif'],
      },

      // ====== SUDUT BORDER dari Design System ======
      borderRadius: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        full: '9999px',
      },

      // ====== ANIMASI KUSTOM ======
      keyframes: {
        // Efek melayang (floating) standar
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-2deg)' },
          '50%': { transform: 'translateY(-18px) rotate(2deg)' },
        },
        // Efek melayang + putar 3D (Y-axis)
        floatSpin: {
          '0%': { transform: 'translateY(0px) rotateY(0deg)' },
          '50%': { transform: 'translateY(-18px) rotateY(180deg)' },
          '100%': { transform: 'translateY(0px) rotateY(360deg)' },
        },
        // Bayangan bergerak di bawah objek melayang
        floatShadow: {
          '0%, 100%': { transform: 'scaleX(1)', opacity: '0.4' },
          '50%': { transform: 'scaleX(0.7)', opacity: '0.15' },
        },
        // Efek bintang berkilau
        shimmer: {
          '0%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
          '100%': { opacity: '0.3', transform: 'scale(0.8)' },
        },
        // Animasi partikel naik
        rise: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-80px)', opacity: '0' },
        },
        // Animasi muncul dari bawah
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // Marquee bergerak ke kiri
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        floatSpin: 'floatSpin 8s linear infinite',
        floatShadow: 'floatShadow 4s ease-in-out infinite',
        shimmer: 'shimmer 2.5s ease-in-out infinite',
        rise: 'rise 3s ease-in forwards',
        fadeUp: 'fadeUp 0.8s ease-out forwards',
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
}
