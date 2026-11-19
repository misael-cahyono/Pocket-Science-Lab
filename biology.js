// ==========================================
// SIMULASI BIOLOGI 3D: MODEL SEL HEWAN
// ==========================================

let scene, camera, renderer, cellGroup;

// Jalankan fungsi utama saat halaman dimuat
initBiologySim();

function initBiologySim() {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    // 1. BUAT SCENE, CAMERA, & RENDERER
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf1f5f9);

    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // 2. TAMBAHKAN PENCAHAYAAN
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight = new THREE.DirectionalLight(0xffffff, 0.8);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // 3. BUAT KELOMPOK STRUKTUR SEL
    cellGroup = new THREE.Group();

    // Membran Sel (Bola luar yang transparan/kaca)
    const membraneGeo = new THREE.SphereGeometry(1.6, 32, 32);
    const membraneMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.25,
        roughness: 0.1
    });
    const membrane = new THREE.Mesh(membraneGeo, membraneMat);
    cellGroup.add(membrane);

    // Inti Sel / Nukleus (Bola ungu di bagian tengah)
    const nucleusGeo = new THREE.SphereGeometry(0.5, 32, 32);
    const nucleusMat = new THREE.MeshStandardMaterial({ color: 0x8b5cf6, roughness: 0.3 });
    const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
    cellGroup.add(nucleus);

    // Mitokondria (Bentuk kapsul merah muda di dalam sel)
    const mitoGeo = new THREE.CapsuleGeometry(0.15, 0.35, 16, 16);
    const mitoMat = new THREE.MeshStandardMaterial({ color: 0xec4899, roughness: 0.3 });

    // Mitokondria 1
    const mito1 = new THREE.Mesh(mitoGeo, mitoMat);
    mito1.position.set(0.7, 0.5, 0.4);
    mito1.rotation.z = Math.PI / 4;
    cellGroup.add(mito1);

    // Mitokondria 2
    const mito2 = new THREE.Mesh(mitoGeo, mitoMat);
    mito2.position.set(-0.6, -0.6, -0.3);
    mito2.rotation.x = Math.PI / 3;
    cellGroup.add(mito2);

    scene.add(cellGroup);

    // Mulai animasi perputaran sel
    animate();
}

// ==========================================
// LOOP ANIMASI (BERPUTAR OTOMATIS)
// ==========================================
function animate() {
    requestAnimationFrame(animate);

    // Membuat model sel hewan berputar perlahan
    if (cellGroup) {
        cellGroup.rotation.y += 0.003;
        cellGroup.rotation.x += 0.001;
    }

    renderer.render(scene, camera);
}
