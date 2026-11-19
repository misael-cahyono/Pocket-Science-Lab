// ==========================================
// DATABASE SIMULASI FISIKA (PHYSICS DATA)
// ==========================================

const physicsLabData = {
    jatuhBebas: {
        judul: "Gerak Jatuh Bebas",
        deskripsi: "Mempelajari percepatan benda akibat gaya gravitasi tanpa hambatan udara. Coba ubah jenis planet untuk melihat perbedaan kecepatan jatuhnya bola!",
        gravityValue: 0.015, // Default gravitasi Bumi tiruan
        opsiPlanet: [
            { nama: "Bumi (9.8 m/s²)", nilai: 0.015 },
            { nama: "Bulan (1.6 m/s²)", nilai: 0.004 },
            { nama: "Jupiter (24.8 m/s²)", nilai: 0.035 }
        ]
    },
    bidangMiring: {
        judul: "Hukum Newton & Gesekan",
        deskripsi: "Simulasi gaya yang bekerja pada benda di atas bidang miring (segera hadir di pembaruan berikutnya!).",
        gravityValue: 0.010,
        opsiPlanet: []
    }
};
