// ==========================================
// SERVICE WORKER: MENYIMPAN CACHE OFFLINE
// ==========================================

const CACHE_NAME = 'labpocket-v1';

// Daftar file yang akan disimpan ke memori HP saat pertama kali dibuka
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './physics.html',
    './chemistry.html',
    './biology.html',
    './notes.html',
    './css/style.css',
    './js/app.js',
    './js/physics.js',
    './js/chemistry.js',
    './js/biology.js',
    './manifest.json',
    // Library Three.js dari CDN ikut disimpan agar 3D tetap jalan saat offline
    'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
];

// 1. EVENT INSTALL: Menyimpan semua aset ke dalam Cache HP
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Menyimpan aset LabPocket untuk mode offline...');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// 2. EVENT ACTIVATE: Menghapus cache versi lama jika ada pembaruan kode
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Menghapus cache lama:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// 3. EVENT FETCH: Mengambil file dari Cache HP dulu sebelum mencari ke internet
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                // Jika file ada di cache HP, gunakan itu (cepat & bisa offline)
                if (cachedResponse) {
                    return cachedResponse;
                }
                // Jika belum ada, ambil dari internet
                return fetch(event.request);
            })
    );
});
