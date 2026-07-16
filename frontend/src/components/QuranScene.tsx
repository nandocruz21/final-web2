import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';


//membuat kotak 3D-nya menggunakan pustaka (library) Three.js dan React Three Fiber. Di file inilah logika putarannya, warnanya (emas), efek bayangannya, dan animasinya diatur.

// ================================================
// Komponen buku 3D Al-Quran
// ================================================
const QuranBook: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null!);

  // Ukuran buku: lebar, tinggi, tebal
  const W = 1.4;
  const H = 1.9;
  const D = 0.22;

  // Warna emas untuk cover
  const goldColor = new THREE.Color('#b8960c');
  const goldDark = new THREE.Color('#7a5c0a');
  const pagesColor = new THREE.Color('#f5e6c8');

  // Material cover emas
  const coverMaterial = new THREE.MeshStandardMaterial({
    color: goldColor,
    metalness: 0.6,
    roughness: 0.3,
  });

  // Material punggung buku
  const spineMaterial = new THREE.MeshStandardMaterial({
    color: goldDark,
    metalness: 0.5,
    roughness: 0.4,
  });

  // Material halaman kertas
  const pagesMaterial = new THREE.MeshStandardMaterial({
    color: pagesColor,
    metalness: 0.0,
    roughness: 0.9,
  });

  // 6 sisi kotak: kanan, kiri, atas, bawah, depan (cover), belakang
  const materials = [
    spineMaterial,  // kanan (punggung)
    pagesMaterial,  // kiri (halaman)
    pagesMaterial,  // atas
    pagesMaterial,  // bawah
    coverMaterial,  // depan (cover utama)
    coverMaterial,  // belakang
  ];

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <boxGeometry args={[W, H, D]} />
      {materials.map((mat, i) => (
        <primitive key={i} object={mat} attach={`material-${i}`} />
      ))}
    </mesh>
  );
};

// ================================================
// Komponen teks di atas buku (menggunakan canvas texture)
// ================================================
const QuranBookWithText: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null!);

  // Buat texture canvas untuk cover buku
  const coverTexture = React.useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 700;
    const ctx = canvas.getContext('2d')!;

    // Background emas gradient
    const grad = ctx.createLinearGradient(0, 0, 512, 700);
    grad.addColorStop(0, '#c8a020');
    grad.addColorStop(0.3, '#a37c35');
    grad.addColorStop(0.7, '#8b6914');
    grad.addColorStop(1, '#c9a227');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 700);

    // Bingkai luar
    ctx.strokeStyle = 'rgba(255, 240, 150, 0.5)';
    ctx.lineWidth = 6;
    ctx.strokeRect(20, 20, 472, 660);

    // Bingkai dalam
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(255, 240, 150, 0.3)';
    ctx.strokeRect(35, 35, 442, 630);

    // Tulisan Arab — القرآن الكريم
    ctx.fillStyle = 'rgba(255, 250, 200, 0.95)';
    ctx.font = 'bold 52px serif';
    ctx.textAlign = 'center';
    ctx.fillText('القرآن الكريم', 256, 200);

    // Garis pemisah
    ctx.fillStyle = 'rgba(255, 240, 150, 0.5)';
    ctx.fillRect(120, 230, 272, 2);

    // Teks Latin
    ctx.fillStyle = 'rgba(255, 245, 180, 0.85)';
    ctx.font = 'bold 28px sans-serif';
    ctx.letterSpacing = '4px';
    ctx.fillText("AL-QUR'AN", 256, 290);
    ctx.font = '22px sans-serif';
    ctx.fillText('AL-KARIIM', 256, 328);

    // Ornamen geometri bintang di tengah
    ctx.strokeStyle = 'rgba(255, 240, 150, 0.4)';
    ctx.lineWidth = 2;
    // Kotak berlian besar
    ctx.beginPath();
    ctx.moveTo(256, 390);
    ctx.lineTo(326, 460);
    ctx.lineTo(256, 530);
    ctx.lineTo(186, 460);
    ctx.closePath();
    ctx.stroke();
    // Kotak berlian kecil
    ctx.beginPath();
    ctx.moveTo(256, 415);
    ctx.lineTo(301, 460);
    ctx.lineTo(256, 505);
    ctx.lineTo(211, 460);
    ctx.closePath();
    ctx.stroke();
    // Titik tengah
    ctx.fillStyle = 'rgba(255, 240, 150, 0.6)';
    ctx.beginPath();
    ctx.arc(256, 460, 8, 0, Math.PI * 2);
    ctx.fill();

    // Simbol Allah di atas
    ctx.fillStyle = 'rgba(255, 250, 200, 0.8)';
    ctx.font = '40px serif';
    ctx.fillText('ﷻ', 256, 130);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  const W = 1.4;
  const H = 1.9;
  const D = 0.22;

  const goldDark = new THREE.Color('#7a5c0a');
  const pagesColor = new THREE.Color('#f5e6c8');

  const coverMat = new THREE.MeshStandardMaterial({
    map: coverTexture,
    metalness: 0.55,
    roughness: 0.28,
  });
  const spineMat = new THREE.MeshStandardMaterial({
    color: goldDark,
    metalness: 0.5,
    roughness: 0.4,
  });
  const pagesMat = new THREE.MeshStandardMaterial({
    color: pagesColor,
    metalness: 0.0,
    roughness: 0.9,
  });

  const materials = [
    spineMat,   // kanan (punggung)
    pagesMat,   // kiri (halaman)
    pagesMat,   // atas
    pagesMat,   // bawah
    coverMat,   // depan (cover)
    spineMat,   // belakang
  ];

  // Rotasi otomatis perlahan
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} castShadow rotation={[0.1, 0.4, 0.03]}>
      <boxGeometry args={[W, H, D]} />
      {materials.map((mat, i) => (
        <primitive key={i} object={mat} attach={`material-${i}`} />
      ))}
    </mesh>
  );
};

// ================================================
// Komponen utama: Canvas Three.js + Float effect
// ================================================
const QuranScene: React.FC = () => {
  return (
    <div className="w-full h-full" style={{ minHeight: 420 }}>
      <Canvas
        shadows
        camera={{ position: [0, 0, 3.5], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        {/* Cahaya ambient */}
        <ambientLight intensity={0.6} />

        {/* Cahaya utama dari atas kiri — membuat efek emas bersinar */}
        <directionalLight
          position={[3, 5, 3]}
          intensity={2.5}
          color="#fff5d0"
          castShadow
        />

        {/* Cahaya aksen dari bawah — efek premium */}
        <pointLight position={[-2, -2, 2]} intensity={1} color="#a37c35" />

        {/* Cahaya emas dari depan */}
        <pointLight position={[0, 0, 4]} intensity={0.8} color="#ffe08a" />

        {/* Float membuat buku melayang naik-turun otomatis */}
        <Float
          speed={1.8}          // kecepatan melayang
          rotationIntensity={0.4}  // seberapa banyak rotasi saat melayang
          floatIntensity={0.8}     // seberapa jauh naik-turun
        >
          <QuranBookWithText />
        </Float>

        {/* Environment untuk refleksi cahaya realistis */}
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
};

export default QuranScene;
