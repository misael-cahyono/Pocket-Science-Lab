// ==========================================
// 1. REGISTRASI SERVICE WORKER (UNTUK PWA)
// ==========================================
// Mengecek apakah browser HP mendukung fitur Service Worker (agar bisa diinstal & offline)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then((reg) => console.log('Service Worker berhasil didaftarkan:', reg.scope))
            .catch((err) => console.log('Service Worker gagal:', err));
    });
}

// ==========================================
// 2. TOMBOL INSTALL APLIKASI DI HP
// ==========================================
let deferredPrompt;
const installBtn = document.getElementById('installBtn'); // Pastikan ada tombol dengan id="installBtn" di HTML

window.addEventListener('beforeinstallprompt', (e) => {
    // Mencegah pop-up otomatis dari browser muncul terlalu cepat
    e.preventDefault();
    // Simpan event-nya agar bisa dipicu saat tombol ditekan
    deferredPrompt = e;
    
    // Tampilkan tombol install jika tersedia di halaman
    if (installBtn) {
        installBtn.style.display = 'block';
        
        installBtn.addEventListener('click', () => {
            // Sembunyikan tombol setelah diklik
            installBtn.style.display = 'none';
            // Munculkan prompt instalasi ke layar utama HP
            deferredPrompt.prompt();
            
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('Siswa menginstal LabPocket!');
                }
                deferredPrompt = null;
            });
        });
    }
});

// ==========================================
// 3. SISTEM CATATAN LAB (LOCAL STORAGE)
// ==========================================
// Fungsi untuk menyimpan hasil pengamatan siswa ke memori HP
function simpanCatatan(mataPelajaran, judulEksperimen, isiCatatan) {
    // Ambil data lama dari localStorage, jika belum ada buat array kosong []
    let daftarCatatan = JSON.parse(localStorage.getItem('labPocket_notes')) || [];

    // Buat objek catatan baru
    const catatanBaru = {
        id: Date.now(), // ID unik berdasarkan waktu saat ini
        mapel: mataPelajaran,
        judul: judulEksperimen,
        isi: isiCatatan,
        tanggal: new Date().toLocaleDateString('id-ID')
    };

    // Masukkan catatan baru ke dalam daftar
    daftarCatatan.push(catatanBaru);

    // Simpan kembali ke memori lokal dalam bentuk teks (JSON)
    localStorage.setItem('labPocket_notes', JSON.stringify(daftarCatatan));
    alert('Catatan eksperimen berhasil disimpan di memori HP!');
}

// Fungsi untuk mengambil semua catatan yang tersimpan
function ambilSemuaCatatan() {
    return JSON.parse(localStorage.getItem('labPocket_notes')) || [];
}

// Fungsi untuk menghapus catatan berdasarkan ID
function hapusCatatan(idCatatan) {
    let daftarCatatan = ambilSemuaCatatan();
    // Saring catatan, sisakan yang ID-nya tidak sama dengan yang dihapus
    daftarCatatan = daftarCatatan.filter(item => item.id !== idCatatan);
    localStorage.setItem('labPocket_notes', JSON.stringify(daftarCatatan));
}
