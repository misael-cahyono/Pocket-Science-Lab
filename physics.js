// ==========================================
// SIMULASI FISIKA 3D: GRAVITASI & BOLA PANTUL
// ==========================================

let scene, camera, renderer, ball;
let velocityY = 0;
let gravity = 0.015; // Percepatan gravitasi tiruan
let bounce = -0.7;   // Koefisien restitusi (pemantulan)

// Jalankan fungsi utama saat halaman dimuat
initPhysicsSim();

function initPhysicsSim() {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    // 1. BUAT SCENE, CAMERA, & RENDERER
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f2f5);

    // Kamera perspektif untuk melihat dunia 3D
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 2, 5);
    camera.lookAt(0, 0, 0);

    // Renderer untuk menggambar grafik ke layar HP
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // 2. TAMBAHKAN PENCAHAYAAN (LIGHTING)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight = new THREE.DirectionalLight(0xffffff, 0.8);
    pointLight.position.set(5, 10, 7);
    scene.add(pointLight);

    // 3. BUAT OBJEK 3D (BOLA & LANTAI)
    // Bola (Mewakili objek eksperimen)
    const ballGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const ballMaterial = new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.3 });
    ball = new THREE.Mesh(ballGeometry, ballMaterial);
    ball.position.set(0, 3, 0); // Posisi awal di atas
    scene.add(ball);

    // Lantai (Sebagai batas pantul)
    const floorGeometry = new THREE.PlaneGeometry(6, 6);
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xe5e7eb, side: THREE.DoubleSide });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = Math.PI / 2;
    floor.position.y = -1;
    scene.add(floor);

    // 4. EVENT LISTENER: SENTUH LAYAR UNTUK MENGATUR ULANG POSISI BOLA
    window.addEventListener('click', () => {
        resetBola();
    });

    // Mulai animasi pergerakan
    animate();
}

// ==========================================
// LOOP ANIMASI (BERJALAN 60 KALI PER DETIK)
// ==========================================
function animate() {
    requestAnimationFrame(animate);

    // Logika Fisika Sederhana: Gerak Jatuh Bebas
    velocityY -= gravity; // Kecepatan berkurang karena gravitasi ke bawah
    ball.position.y += velocityY; // Ubah posisi bola berdasarkan kecepatan

    // Jika bola menyentuh lantai (y = -0.6), pantulkan!
    if (ball.position.y <= -0.6) {
        ball.position.y = -0.6;
        velocityY = -velocityY * 0.75; // Energi berkurang sedikit saat memantul
    }

    renderer.render(scene, camera);
}

// Fungsi untuk menjatuhkan ulang bola dari atas
function resetBola() {
    ball.position.set(0, 3, 0);
    velocityY = 0;
}
