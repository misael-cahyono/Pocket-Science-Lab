// ==========================================
// 1. PWA SERVICE WORKER & INSTALL LOGIC
// ==========================================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(() => console.log('Service Worker Aktif!'))
      .catch((err) => console.log('SW Gagal:', err));
  });
}

let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (installBtn) {
    installBtn.style.display = 'block';
    installBtn.addEventListener('click', () => {
      installBtn.style.display = 'none';
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => { deferredPrompt = null; });
    });
  }
});


// ==========================================
// 2. SIMULASI FISIKA (physics.html)
// ==========================================
const physicsContainer = document.getElementById('canvas-container');
if (physicsContainer && typeof THREE !== 'undefined') {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, physicsContainer.clientWidth / physicsContainer.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  
  renderer.setSize(physicsContainer.clientWidth, physicsContainer.clientHeight);
  physicsContainer.appendChild(renderer.domElement);

  // Objek Sederhana: Bola Bandul 3D
  const sphereGeo = new THREE.SphereGeometry(0.5, 32, 32);
  const sphereMat = new THREE.MeshBasicMaterial({ color: 0x2563eb });
  const pendulumBall = new THREE.Mesh(sphereGeo, sphereMat);
  scene.add(pendulumBall);

  camera.position.z = 5;

  let isRunning = false;
  let angle = 0;

  // Tombol Interaktif
  const toggleBtn = document.getElementById('toggleSimBtn');
  const lengthSlider = document.getElementById('stringLength');
  const lengthVal = document.getElementById('lengthVal');

  if (lengthSlider) {
    lengthSlider.addEventListener('input', (e) => {
      lengthVal.textContent = e.target.value;
    });
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      isRunning = !isRunning;
      toggleBtn.textContent = isRunning ? 'Berhentikan Simulasi' : 'Mulai Simulasi';
    });
  }

  // Loop Animasi 3D
  function animatePhysics() {
    requestAnimationFrame(animatePhysics);
    if (isRunning) {
      angle += 0.05;
      pendulumBall.position.x = Math.sin(angle) * 2;
      pendulumBall.position.y = -Math.cos(angle) * 1.5;
    }
    renderer.render(scene, camera);
  }
  animatePhysics();
}


// ==========================================
// 3. SIMULASI KIMIA (chemistry.html)
// ==========================================
const chemContainer = document.getElementById('canvas-container');
if (chemContainer && document.getElementById('moleculeSelect') && typeof THREE !== 'undefined') {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, chemContainer.clientWidth / chemContainer.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.setSize(chemContainer.clientWidth, chemContainer.clientHeight);
  chemContainer.appendChild(renderer.domElement);

  // Buat Molekul Sederhana (Gabungan Atom)
  const group = new THREE.Group();
  const atomGeo = new THREE.SphereGeometry(0.6, 32, 32);
  const atomMat1 = new THREE.MeshBasicMaterial({ color: 0xef4444 }); // Pusat
  const atomMat2 = new THREE.MeshBasicMaterial({ color: 0x3b82f6 }); // Samping

  const centralAtom = new THREE.Mesh(atomGeo, atomMat1);
  const sideAtom1 = new THREE.Mesh(new THREE.SphereGeometry(0.4, 32, 32), atomMat2);
  sideAtom1.position.set(1.5, 1, 0);
  
  const sideAtom2 = new THREE.Mesh(new THREE.SphereGeometry(0.4, 32, 32), atomMat2);
  sideAtom2.position.set(-1.5, 1, 0);

  group.add(centralAtom, sideAtom1, sideAtom2);
  scene.add(group);
  camera.position.z = 5;

  let autoRotate = false;
  const rotateBtn = document.getElementById('rotateBtn');
  if (rotateBtn) {
    rotateBtn.addEventListener('click', () => {
      autoRotate = !autoRotate;
      rotateBtn.textContent = autoRotate ? 'Hentikan Putaran' : 'Putar Otomatis';
    });
  }

  function animateChem() {
    requestAnimationFrame(animateChem);
    if (autoRotate) {
      group.rotation.y += 0.01;
      group.rotation.x += 0.005;
    }
    renderer.render(scene, camera);
  }
  animateChem();
}


// ==========================================
// 4. SIMULASI BIOLOGI (biology.html)
// ==========================================
const bioContainer = document.getElementById('canvas-container');
if (bioContainer && document.getElementById('organelleSelect') && typeof THREE !== 'undefined') {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, bioContainer.clientWidth / bioContainer.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.setSize(bioContainer.clientWidth, bioContainer.clientHeight);
  bioContainer.appendChild(renderer.domElement);

  // Model Sel (Bentuk Kapsul/Bola Lonjong)
  const cellGeo = new THREE.SphereGeometry(1.5, 32, 32);
  const cellMat = new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true });
  const cellModel = new THREE.Mesh(cellGeo, cellMat);
  scene.add(cellModel);

  camera.position.z = 4;

  function animateBio() {
    requestAnimationFrame(animateBio);
    cellModel.rotation.y += 0.005;
    renderer.render(scene, camera);
  }
  animateBio();
}


// ==========================================
// 5. PENYIMPANAN CATATAN (notes.html - LocalStorage)
// ==========================================
const saveNoteBtn = document.getElementById('saveNoteBtn');
if (saveNoteBtn) {
  const noteTitleInput = document.getElementById('noteTitle');
  const noteContentInput = document.getElementById('noteContent');
  const notesListContainer = document.getElementById('notesList');

  // Fungsi untuk menampilkan catatan dari localStorage
  function loadNotes() {
    const savedNotes = JSON.parse(localStorage.getItem('labPocketNotes')) || [];
    notesListContainer.innerHTML = '';

    if (savedNotes.length === 0) {
      notesListContainer.innerHTML = '<p class="empty-notes" style="color: #666; font-style: italic;">Belum ada catatan yang tersimpan.</p>';
      return;
    }

    savedNotes.forEach((note, index) => {
      const noteEl = document.createElement('div');
      noteEl.className = 'note-item';
      noteEl.innerHTML = `
        <h4>${note.title}</h4>
        <p>${note.content}</p>
        <button onclick="deleteNote(${index})" style="margin-top: 6px; font-size: 0.75rem; background: #ef4444; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer;">Hapus</button>
      `;
      notesListContainer.appendChild(noteEl);
    });
  }

  // Tombol Simpan
  saveNoteBtn.addEventListener('click', () => {
    const title = noteTitleInput.value.trim();
    const content = noteContentInput.value.trim();

    if (!title || !content) {
      alert('Judul dan isi catatan tidak boleh kosong!');
      return;
    }

    const savedNotes = JSON.parse(localStorage.getItem('labPocketNotes')) || [];
    savedNotes.push({ title, content });
    localStorage.setItem('labPocketNotes', JSON.stringify(savedNotes));

    noteTitleInput.value = '';
    noteContentInput.value = '';
    loadNotes();
    alert('Catatan berhasil disimpan ke memori HP!');
  });

  // Fungsi Global untuk Hapus Catatan
  window.deleteNote = function(index) {
    let savedNotes = JSON.parse(localStorage.getItem('labPocketNotes')) || [];
    savedNotes.splice(index, 1);
    localStorage.setItem('labPocketNotes', JSON.stringify(savedNotes));
    loadNotes();
  };

  // Jalankan saat halaman dimuat
  loadNotes();
}
