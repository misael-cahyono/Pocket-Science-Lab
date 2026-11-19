// ==========================================
// SIMULASI KIMIA 3D: STRUKTUR MOLEKUL AIR (H2O)
// ==========================================

let scene, camera, renderer, moleculeGroup;

// Jalankan fungsi utama saat halaman dimuat
initChemistrySim();

function initChemistrySim() {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    // 1. BUAT SCENE, CAMERA, & RENDERER
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);

    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // 2. TAMBAHKAN PENCAHAYAAN
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.DirectionalLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // 3. BUAT KELOMPOK MOLEKUL (H2O)
    moleculeGroup = new THREE.Group();

    // Atom Oksigen (Merah, lebih besar di tengah)
    const oxygenGeo = new THREE.SphereGeometry(0.6, 32, 32);
    const oxygenMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.2 });
    const oxygenMesh = new THREE.Mesh(oxygenGeo, oxygenMat);
    oxygenMesh.position.set(0, 0, 0);
    moleculeGroup.add(oxygenMesh);

    // Atom Hidrogen 1 (Putih/Abu-abu, di kiri bawah)
    const hydrogenGeo = new THREE.SphereGeometry(0.35, 32, 32);
    const hydrogenMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.3 });
    
    const h1Mesh = new THREE.Mesh(hydrogenGeo, hydrogenMat);
    h1Mesh.position.set(-1.1, -0.8, 0);
    moleculeGroup.add(h1Mesh);

    // Atom Hidrogen 2 (Putih/Abu-abu, di kanan bawah)
    const h2Mesh = new THREE.Mesh(hydrogenGeo, hydrogenMat);
    h2Mesh.position.set(1.1, -0.8, 0);
    moleculeGroup.add(h2Mesh);

    // Ikatan Kimia (Silinder / Batang penghubung)
    const bondGeo = new THREE.CylinderGeometry(0.1, 0.1, 1.4, 16);
    const bondMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8 });

    // Ikatan O-H pertama
    const bond1 = new THREE.Mesh(bondGeo, bondMat);
    bond1.position.set(-0.55, -0.4, 0);
    bond1.rotation.z = -Math.PI / 4;
    moleculeGroup.add(bond1);

    // Ikatan O-H kedua
    const bond2 = new THREE.Mesh(bondGeo, bondMat);
    bond2.position.set(0.55, -0.4, 0);
    bond2.rotation.z = Math.PI / 4;
    moleculeGroup.add(bond2);

    scene.add(moleculeGroup);

    // Mulai animasi perputaran molekul
    animate();
}

// ==========================================
// LOOP ANIMASI (BERPUTAR OTOMATIS)
// ==========================================
function animate() {
    requestAnimationFrame(animate);

    // Membuat molekul H2O berputar perlahan agar siswa bisa melihat dari segala sisi
    if (moleculeGroup) {
        moleculeGroup.rotation.y += 0.005;
        moleculeGroup.rotation.x += 0.002;
    }

    renderer.render(scene, camera);
}
