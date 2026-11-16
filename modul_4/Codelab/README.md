# Modul 4 Pemrograman Mobile: Database & Autentikasi (Codelab 1-5)

Implementasi Codelab 1 sampai 5 praktikum Pemrograman Mobile Informatika UMM menggunakan **Expo SDK 54**, **Expo Router**, **TypeScript**, dan **Supabase**.

---

## 1. Prasyarat

Sebelum menjalankan proyek ini, pastikan lingkungan pengembangan telah memenuhi prasyarat berikut:
- **Node.js**: Versi LTS (Node.js 20.x atau 22.x+ direkomendasikan).
- **Expo CLI / SDK 54**: Terpasang otomatis melalui dependensi `package.json`.
- **Akun & Proyek Supabase**: Proyek aktif di [supabase.com](https://supabase.com).
- **Perangkat Pengujian**:
  - Perangkat fisik Android/iOS dengan aplikasi **Expo Go**, atau
  - Emulator Android / iOS Simulator, atau
  - Web Browser (Google Chrome / Mozilla Firefox).

---

## 2. Konfigurasi Environment Variable (`.env`)

Aplikasi membutuhkan kredensial Supabase untuk berkomunikasi dengan backend cloud.

1. Salin template konfigurasi atau buka file `.env` di root direktori proyek:
   ```bash
   cp .env.example .env
   ```
2. Buka dashboard Supabase Anda:
   - Masuk ke menu **Project Settings** (ikon gear di pojok kiri bawah) -> **API**.
   - Salin **Project URL** dan masukkan ke `EXPO_PUBLIC_SUPABASE_URL`.
   - Salin **Project API Keys** bagian `anon` (public) dan masukkan ke `EXPO_PUBLIC_SUPABASE_ANON_KEY`.
   - Format `.env`:
     ```env
     EXPO_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxxxxxxxxx.supabase.co
     EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJh......
     ```
   > **PERINGATAN KEAMANAN**: JANGAN PERNAH menyertakan atau menggunakan `service_role` key pada aplikasi client mobile/frontend. `service_role` key dapat membypass seluruh Row Level Security (RLS) dan membahayakan seluruh database.
3. Setelah mengubah file `.env`, bersihkan cache dan restart Expo dev server dengan:
   ```bash
   npx expo start -c
   ```

---

## 3. Konfigurasi Supabase Auth

Secara default, Supabase mewajibkan konfirmasi email sebelum pengguna dapat login. Untuk kebutuhan praktikum/pengujian instan:

1. Buka dashboard Supabase -> **Authentication** di panel samping.
2. Pilih tab **Sign In / Providers** -> **Email**.
3. Matikan opsi **Confirm email** (toggle ke posisi Nonaktif / Off).
4. Klik **Save**.

Dengan mematikan konfirmasi email, akun yang baru didaftarkan via `signUp` akan langsung memiliki sesi aktif dan bisa langsung masuk ke sistem.

---

## 4. Konfigurasi Database & Row Level Security (RLS)

1. Buka dashboard Supabase -> pilih menu **SQL Editor** pada navigasi kiri.
2. Klik **New query**.
3. Salin seluruh isi dari file `supabase/schema.sql` dan tempelkan ke SQL Editor:
   ```sql
   -- 1. Buat tabel missions
   CREATE TABLE missions (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users NOT NULL DEFAULT auth.uid(),
     title TEXT NOT NULL,
     reward_points INTEGER DEFAULT 100,
     status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed')),
     created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
   );

   -- 2. Aktifkan Row Level Security (RLS)
   ALTER TABLE missions ENABLE ROW LEVEL SECURITY;

   -- 3. Kebijakan akses data khusus per user (Auth UID)
   CREATE POLICY "Operatives can view their own missions"
   ON missions FOR SELECT USING (auth.uid() = user_id);

   CREATE POLICY "Operatives can insert their own missions"
   ON missions FOR INSERT WITH CHECK (auth.uid() = user_id);

   CREATE POLICY "Operatives can update their own missions"
   ON missions FOR UPDATE USING (auth.uid() = user_id);

   CREATE POLICY "Operatives can delete their own missions"
   ON missions FOR DELETE USING (auth.uid() = user_id);
   ```
4. Klik tombol **Run** (atau tekan `Ctrl+Enter` / `Cmd+Enter`).
5. **Penjelasan Singkat Struktur Database & RLS**:
   - **Tabel `missions`**: Menyimpan data misi operatif (`id`, `user_id`, `title`, `reward_points`, `status`, `created_at`). Kolom `user_id` merujuk ke tabel bawaan Supabase `auth.users` dan memiliki nilai default `auth.uid()`.
   - **Row Level Security (RLS)**: Diaktifkan dengan `ENABLE ROW LEVEL SECURITY` untuk memastikan tabel tidak dapat diakses secara bebas tanpa aturan keamanan.
   - **4 Kebijakan Akses (RLS Policies)**:
     - `SELECT`: Pengguna hanya diperbolehkan membaca data misi yang kolom `user_id`-nya sama persis dengan UID pengguna yang terautentikasi (`auth.uid() = user_id`).
     - `INSERT`: Pengguna hanya diperbolehkan menambahkan misi baru jika data yang dimasukkan memiliki `user_id` milik pengguna tersebut (`WITH CHECK (auth.uid() = user_id)`).
     - `UPDATE`: Pengguna hanya diperbolehkan memperbarui status misi milik dirinya sendiri (`auth.uid() = user_id`).
     - `DELETE`: Pengguna hanya diperbolehkan menghapus misi miliknya sendiri (`auth.uid() = user_id`).

---

## 5. Cara Menjalankan Aplikasi

Jalankan perintah berikut pada terminal:
```bash
# Menjalankan untuk Expo Go di perangkat fisik / simulator
npx expo start --go

# Atau menjalankan mode web di browser
npx expo start --web
```

---

## 6. Peta File & Struktur Proyek

| File | Codelab Terkait | Fungsi & Deskripsi |
|---|---|---|
| `asset/SecureVaultDemo.tsx` | Codelab 1 | Komponen antarmuka Hardware Vault. Mendemonstrasikan operasi enkripsi simpan (`setItemAsync`), baca (`getItemAsync`), dan hapus (`deleteItemAsync`) token menggunakan `expo-secure-store` (dengan fallback `localStorage` di web). |
| `lib/supabase.ts` | Codelab 2 | Inisialisasi singleton client Supabase dengan adapter storage `expo-secure-store`. Berisi juga fungsi live health check `testCloudBridge()`. |
| `app/(app)/cloud-health.tsx` | Codelab 2 | Halaman antarmuka untuk mengecek konektivitas Cloud Bridge ke instance PostgreSQL Supabase. Menggantikan file `app/index.tsx` di panduan awal agar tidak bentrok rute dengan `app/(app)/index.tsx`. |
| `app/(auth)/login.tsx` | Codelab 3 | Layar autentikasi hero/operatif. Menangani pendaftaran akun baru via `supabase.auth.signUp` beserta user metadata (`callsign`, `role`) serta proses login via `supabase.auth.signInWithPassword`. |
| `context/AuthContext.tsx` | Codelab 4 | Context Provider autentikasi global. Mengatur rehidrasi sesi saat aplikasi dibuka via `supabase.auth.getSession` dan mendengarkan event auth secara real-time via `supabase.auth.onAuthStateChange`. |
| `app/_layout.tsx` | Codelab 4 | Root Navigation & Route Guard. Membungkus aplikasi dengan `AuthProvider`, mengecek apakah sesi ada melalui `useSegments()`, serta mengalihkan rute secara otomatis antara grup `(auth)` dan `(app)`. |
| `app/(app)/vault.tsx` | Codelab 1 (Pendukung) | Rute halaman tipis yang merender komponen `SecureVaultDemo` di dalam `SafeAreaView` agar Codelab 1 dapat diuji langsung dalam navigasi. |
| `supabase/schema.sql` | Codelab 5 | Skrip DDL database PostgreSQL: pembuatan tabel `missions`, aktivasi RLS, dan 4 security policies berbasis `auth.uid()`. |
| `app/(app)/index.tsx` | Codelab 5 | Dashboard Tactical Command HQ. Mengimplementasikan operasi CRUD data misi (`select`, `insert`, `update`, `delete`) pada tabel `missions` dengan optimistic UI updates. |

---

## 7. Panduan Pengujian

### Persiapan
- `.env` sudah terisi, **Confirm email** sudah dimatikan, `supabase/schema.sql` sudah dijalankan.
- Jalankan `npx expo start -c --go` (atau tekan `w` untuk web). Gunakan `-c` agar `.env` terbaca ulang.
- Catatan: `/vault` dan `/cloud-health` berada di grup `(app)`, jadi harus login dulu. Itu perilaku route guard yang benar.

### Urutan pengujian

1. **Codelab 4 (cold start):** buka aplikasi dalam keadaan belum login.
   - **Hasil yang diharapkan:** spinner singkat, lalu otomatis ke layar login tanpa berkedip.

2. **Codelab 3 (daftar dan login):**
   - Ketuk "Register here", isi callsign, email, password (min. 6 karakter), ketuk "Enlist as Hero".
   - **Hasil yang diharapkan:** akun berhasil didaftarkan.
   - Coba login dengan password salah. **Hasil yang diharapkan:** alert "Invalid login credentials", aplikasi tidak crash.
   - Login dengan kredensial benar. **Hasil yang diharapkan:** masuk ke HQ.
   - Cek Supabase Dashboard -> Authentication -> Users: akun baru muncul.
   - Catatan: karena Confirm email mati, signUp langsung membuat sesi sehingga user bisa langsung masuk ke HQ. Ini normal.

3. **Codelab 4 (persistensi dan logout):**
   - Refresh browser (F5) atau reload di Expo Go. **Hasil yang diharapkan:** tetap di HQ.
   - Ketuk Sign Out. **Hasil yang diharapkan:** kembali ke login. Buka URL HQ secara manual, harus terpental ke login.

4. **Codelab 1 (Secure Vault):** login dulu, lalu buka `/vault`.
   - Web: ketik `/vault` di address bar.
   - Expo Go: deep link `exp://<IP-KAMU>:8081/--/vault` (IP sama dengan yang tampil di terminal Expo).
   - Save Token -> pesan sukses dan input kosong. Load Token -> nilai tampil di "VAULT VALUE". Wipe Token lalu Load Token -> "No token found".
   - Catatan: di web memakai `localStorage` (badge menampilkan itu). Untuk membuktikan SecureStore asli, uji di Expo Go.

5. **Codelab 2 (Cloud Bridge):** buka `/cloud-health`.
   - **Hasil yang diharapkan:** URL Supabase tampil di TARGET URL dan pesan "Connection to PostgreSQL Supabase established successfully!".
   - Cek console Metro/browser: log `Cloud Bridge: Connection to Supabase established!` hanya muncul jika tidak ada error dari Supabase.
   - Catatan: layar ini bisa menampilkan sukses meski query gagal, karena `testCloudBridge` mengembalikan `true` selama tidak ada exception. Jadikan console sebagai indikator yang lebih jujur.

6. **Codelab 5 (CRUD, optimistic UI, RLS) dengan Akun A:**
   - Buat dua misi (mis. "Patrol Perimeter Node" dan "Deliver Field Supplies") lewat Dispatch. **Hasil yang diharapkan:** muncul chip ACTIVE, badge "2 QUEUED".
   - Ketuk misi: status langsung DONE (judul dicoret), ketuk lagi kembali ACTIVE.
   - Ketuk tombol hapus: misi langsung hilang.
   - Pull-to-refresh: spinner muncul, data tetap sama.
   - Uji rollback: matikan internet lalu toggle/hapus misi. **Hasil yang diharapkan:** alert gagal, daftar dikembalikan sesuai server.

7. **Codelab 5 (isolasi RLS) dengan Akun B:**
   - Sign Out, daftar akun baru (email dan callsign berbeda), masuk ke HQ. **Hasil yang diharapkan:** daftar misi kosong ("No active missions").
   - Tambah satu misi untuk Akun B, sign out, login lagi sebagai Akun A. **Hasil yang diharapkan:** Akun A hanya melihat misinya sendiri.
   - Bukti tambahan: di Supabase Table Editor -> missions, baris kedua akun terlihat (dashboard melewati RLS), tetapi aplikasi hanya menampilkan milik user yang login.

### Checklist pengujian

| Codelab | Yang diuji | Status |
|---|---|---|
| Codelab 4 | Cold start tanpa sesi otomatis ke login tanpa kedip | [ ] |
| Codelab 3 | Registrasi akun baru (Register here -> Enlist as Hero) | [ ] |
| Codelab 3 | Login password salah menampilkan alert, tidak crash | [ ] |
| Codelab 3 | Login benar masuk HQ; akun muncul di Auth Users | [ ] |
| Codelab 4 | Refresh/reload tetap di HQ (persistensi sesi) | [ ] |
| Codelab 4 | Sign Out kembali ke login; URL HQ manual terpental ke login | [ ] |
| Codelab 1 | Save/Load Token tampil di VAULT VALUE | [ ] |
| Codelab 1 | Wipe Token lalu Load menampilkan "No token found" | [ ] |
| Codelab 2 | TARGET URL benar dan pesan koneksi sukses | [ ] |
| Codelab 2 | Log console "Cloud Bridge..." hanya saat tanpa error | [ ] |
| Codelab 5 | Buat dua misi: chip ACTIVE, badge "2 QUEUED" | [ ] |
| Codelab 5 | Toggle DONE/ACTIVE dan hapus misi langsung | [ ] |
| Codelab 5 | Pull-to-refresh spinner dan data konsisten | [ ] |
| Codelab 5 | Rollback saat offline (alert gagal, daftar dikembalikan) | [ ] |
| Codelab 5 | Akun B melihat daftar kosong (isolasi RLS) | [ ] |
| Codelab 5 | Akun A hanya melihat misinya sendiri | [ ] |
| Codelab 5 | Table Editor menampilkan baris kedua akun, app tidak | [ ] |

### Masalah umum

| Gejala | Kemungkinan penyebab |
|---|---|
| "Failed to fetch" atau URL kosong | `.env` salah isi atau belum restart dengan `-c` |
| Alert "Database Setup Required" | `schema.sql` belum dijalankan |
| Daftar berhasil tapi tidak bisa login | Confirm email masih menyala |
| `/vault` atau `/cloud-health` memantul ke login | Belum login (route guard bekerja normal) |

---

## 8. Catatan Template

Berikut adalah catatan teknis mengenai karakteristik implementasi template resmi modul tanpa mengubah kode bawaan:

1. **`testCloudBridge` Selalu Mengembalikan `true`**:
   Fungsi `testCloudBridge()` di `lib/supabase.ts` dibungkus dalam blok `try...catch`. SDK Supabase mengembalikan error query (seperti tabel belum dibuat atau RLS ditolak) sebagai atribut properti `{ error }` dari respons objek, bukan melemparkan exception JavaScript. Oleh karena itu, selama jaringan tidak mengalami kegagalan koneksi total (exception), blok `try` tetap mengeksekusi `return true;`.
2. **Sanitasi `.trim()` pada Password**:
   Pada `app/(auth)/login.tsx`, input password dibersihkan menggunakan metode `.trim()`. Karakter spasi di awal atau akhir password akan dihilangkan sebelum dikirimkan ke `supabase.auth`.
3. **signUp Langsung Membuat Sesi**:
   Karena fitur *Confirm email* dinonaktifkan di dashboard Supabase, panggilan `supabase.auth.signUp()` langsung mengembalikan token sesi aktif. Listener `onAuthStateChange` dan route guard di `app/_layout.tsx` akan mendeteksi sesi ini dan langsung mengarahkan pengguna ke halaman utama.
4. **Respon UPDATE / DELETE Terhadap Kebijakan RLS**:
   Dalam protokol PostgreSQL / PostgREST Supabase, jika operasi `UPDATE` atau `DELETE` ditolak oleh evaluasi policy RLS (`auth.uid() = user_id`), database tidak mengembalikan pesan error, melainkan mengembalikan array hasil kosong (`0 rows affected`). Karena template menggunakan Optimistic UI (state antarmuka lokal diubah terlebih dahulu sebelum respons server), tindakan tersebut bisa tampak berhasil di layar lokal pengguna meskipun di database tidak ada baris yang terubah.
5. **SecureStore Fallback di Web**:
   Pustaka native `expo-secure-store` hanya beroperasi pada hardware Android KeyStore dan iOS Keychain. Saat aplikasi dijalankan di lingkungan web browser (`Platform.OS === 'web'`), `SecureVaultDemo.tsx` secara otomatis menggunakan fallback browser `localStorage`.

---

## 9. Panduan Troubleshooting

- **Error: `Failed to fetch` atau Network Request Failed**:
  - Periksa apakah URL pada `EXPO_PUBLIC_SUPABASE_URL` di file `.env` sudah benar dan tidak memiliki trailing slash (`/`).
  - Pastikan telah merestart server Expo dengan `npx expo start -c` setelah menyunting `.env`.
- **Error: `Table "missions" not found` / PGRST205**:
  - Tabel `missions` belum dibuat di Supabase. Buka dashboard Supabase -> **SQL Editor** -> buat query baru -> tempel isi `supabase/schema.sql` -> tekan **Run**.
- **User Tidak Bisa Login / `Email not confirmed`**:
  - Konfirmasi email belum dimatikan. Buka Supabase Dashboard -> **Authentication** -> **Sign In / Providers** -> **Email** -> matikan opsi **Confirm email** -> klik **Save**.
- **Token atau Sesi Hilang di Web**:
  - Ingat bahwa di web `SecureStore` fallback ke `localStorage`, pastikan cache browser atau mode penyamaran (Incognito) tidak menghapus storage lokal saat tab ditutup.
