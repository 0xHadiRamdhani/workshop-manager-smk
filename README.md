# Workshop Manager SMK - Aplikasi React Native

Aplikasi manajemen workshop untuk sekolah SMK dengan 10+ fitur inovatif yang dirancang khusus untuk meningkatkan efisiensi dan efektivitas pembelajaran praktik.

## Fitur Utama

### 1. Dashboard Analitik Komprehensif
- Statistik real-time siswa, proyek, dan layanan
- Grafik progress dan performa
- Notifikasi terbaru dan alert system
- Ringkasan aktivitas harian

### 2. Modul Pembelajaran Interaktif
- Kurikulum SMK terintegrasi
- Simulasi AR/VR untuk praktik virtual
- Materi pembelajaran multimedia
- Assessment dan evaluasi otomatis

### 3. Tracking Service Real-time
- QR Code scanner untuk tracking kendaraan
- Update status service secara real-time
- Histori service lengkap
- Notifikasi progress service

### 4. Manajemen Inventory Suku Cadang
- Stok management otomatis
- Alert system untuk stok minimum
- Analisis penggunaan parts
- Reorder otomatis ke supplier

### 5. Penjadwalan Mentor Dinamis
- Kalender interaktif untuk jadwal mentor
- Booking system online
- Manajemen kapasitas siswa
- Notifikasi reminder otomatis

### 6. Sistem Pelaporan Real-time
- Laporan harian/mingguan/bulanan
- Analisis performa siswa
- Grafik progress pembelajaran
- Export ke PDF/Excel

### 7. Integrasi Kurikulum SMK
- Standar kompetensi SMK
- Penilaian berbasis kompetensi
- Mapping skill dan progress
- Sertifikasi otomatis

### 8. Sistem Absensi Digital
- QR Code untuk absensi
- Real-time attendance tracking
- Statistik kehadiran
- Integrasi dengan jadwal

### 9. Kolaborasi Siswa-Mentor
- Chat dan messaging system
- Video call untuk konsultasi
- File sharing untuk dokumen
- Group collaboration tools

### 10. Manajemen Proyek Berbasis Scrum
- Scrum board interaktif
- Sprint planning dan tracking
- Burndown chart
- Retrospective tools

## Teknologi yang Digunakan

- **Framework**: React Native dengan Expo
- **Navigation**: Expo Router
- **State Management**: Zustand
- **UI Components**: Custom component library
- **Database**: Local storage dengan state management
- **QR Code**: expo-barcode-scanner
- **Notifications**: expo-notifications
- **Charts**: react-native-chart-kit
- **Video**: react-native-video

## Instalasi dan Setup

### Prasyarat
- Node.js (versi 16 atau lebih baru)
- npm atau yarn
- Expo CLI
- Android Studio (untuk emulator Android)
- Xcode (untuk iOS, hanya di macOS)

### Langkah Instalasi

1. **Clone Repository**
```bash
git clone https://github.com/your-repo/workshop-manager-smk.git
cd workshop-manager-smk
```

2. **Install Dependencies**
```bash
npm install
# atau
yarn install
```

3. **Install Expo CLI (jika belum terinstall)**
```bash
npm install -g expo-cli
```

4. **Jalankan Aplikasi**
```bash
npm start
# atau
expo start
```

5. **Scan QR Code** dengan Expo Go app di device Anda

## Menjalankan Aplikasi

### Development Mode
```bash
npm start
```

### Build untuk Production
```bash
# Android
expo build:android

# iOS
expo build:ios
```

### Testing
```bash
npm test
```

## Struktur Proyek

```
workshop-manager-smk/
├── app/                    # Main application screens
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── dashboard.tsx  # Main dashboard
│   │   ├── learning.tsx   # Learning modules
│   │   ├── services.tsx   # Service tracking
│   │   ├── inventory.tsx  # Inventory management
│   │   ├── schedule.tsx   # Mentor scheduling
│   │   ├── reports.tsx    # Reporting system
│   │   ├── attendance.tsx # Digital attendance
│   │   ├── collaboration.tsx # Student-mentor collaboration
│   │   └── scrum.tsx      # Scrum project management
│   └── _layout.tsx        # Root layout
├── src/                   # Source code
│   ├── components/        # Reusable UI components
│   │   └── ui/           # UI component library
│   ├── store/            # State management
│   ├── types/            # TypeScript definitions
│   └── theme/            # Design system
├── components/            # Shared components
├── constants/             # App constants
├── hooks/                 # Custom React hooks
└── assets/               # Static assets
```

## Performa dan Optimasi

- **Code Splitting**: Lazy loading untuk modul besar
- **Image Optimization**: Kompressi otomatis untuk gambar
- **State Management**: Zustand untuk performa optimal
- **Navigation**: Expo Router untuk navigasi cepat
- **Caching**: Local storage untuk data offline

## Keamanan

- Enkripsi data sensitif
- Validasi input lengkap
- Proteksi terhadap SQL injection
- Authentication system
- Role-based access control

## Kompatibilitas

- **iOS**: iOS 11.0+
- **Android**: Android 5.0+ (API level 21+)
- **Web**: Modern browsers
- **Tablet**: Fully responsive

## Kontribusi

1. Fork repository
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## Lisensi

Proyek ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## Tim Pengembang

- **Lead Developer**: [Nama Anda]
- **UI/UX Designer**: [Nama Designer]
- **Backend Developer**: [Nama Backend Dev]
- **QA Engineer**: [Nama QA]

## Kontak

- **Email**: yayasanbanimasum@gmail.com
- **Phone**: 082126608497
- **Website**: https://banimasum.com/

## Acknowledgments

- SMK Bani Ma'sum untuk support dan testing
- Dinas Pendidikan untuk kurikulum SMK
- Industri mitra untuk case study
- Komunitas React Native Indonesia

---

**Jika proyek ini bermanfaat, jangan lupa untuk memberikan bintang!**

Made dengan cinta untuk pendidikan SMK di Indonesia
