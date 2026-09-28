# Modul 1 - Sintaks & UI Dasar (Pemrograman Mobile)

Repositori ini berisi hasil pengerjaan praktikum **Modul 1: Sintaks & UI Dasar** untuk mata kuliah Pemrograman Mobile (Universitas Muhammadiyah Malang).

---

## 📋 Daftar Codelab & Implementasi

### 1. Codelab 1 - Struktur Dasar React
- **Lokasi file:** `src/app/index.tsx`, `src/app/_layout.tsx`
- **Konsep:**
  - Setup struktur folder route Expo Router.
  - Penggunaan `import` & `export default function`.
  - Struktur JSX/TSX dengan single root component.

### 2. Codelab 2 - Komponen UI Dasar
- **Lokasi file:** `src/app/index.tsx`
- **Konsep:**
  - Penggunaan Core Components React Native: `<View>`, `<Text>`, `<TextInput>`, dan `<Button>`.

### 3. Codelab 3 - Styling Dasar
- **Lokasi file:** `src/app/index.tsx`
- **Konsep:**
  - Internal styling menggunakan `StyleSheet.create()`.
  - Properti layout & box model: `flex`, `justifyContent`, `alignItems`, `padding`, `borderWidth`, `borderColor`, `borderRadius`, `marginBottom`.
  - Properti tipografi: `fontSize`, `fontWeight`, `color`, `textAlign`.

### 4. Codelab 4 - Package, Library & Dependency
- **Lokasi file:** `package.json`, `src/app/index.tsx`
- **Dependency:** `@expo/vector-icons`
- **Konsep:**
  - Instalasi modul eksternal via npm.
  - Import dan penggunaan icon `Ionicons` (`information-circle` dan `hand-left`).

### 5. Codelab 5 - Sintaks Dasar TypeScript
- **Lokasi file:** `exercise.ts`
- **Konsep:**
  - `interface Student` (kontrak tipe data objek).
  - Array of Objects (`students: Student[]`).
  - Conditionals (`if / else if / else`) pada custom function `getGrade()`.
  - Iterasi array menggunakan method `.map()`.
  - Primitive loop menggunakan `while`.

---

## 🚀 Cara Menjalankan Project

### 1. Menjalankan Aplikasi Mobile (Codelab 1 - 4)

Pastikan sudah berada di folder `codelab`:

```powershell
# Install dependency jika baru pertama kali clone/pull
npm install

# Menjalankan development server Expo
npx expo start
```

1. Buka aplikasi **Expo Go** di smartphone Android / iOS.
2. Pastikan laptop dan HP berada dalam satu jaringan Wi-Fi yang sama.
3. Scan QR code yang muncul di terminal.

### 2. Menjalankan Latihan TypeScript (Codelab 5)

Latihan TypeScript Codelab 5 dapat dijalankan langsung menggunakan Node.js:

```powershell
node exercise.ts
```

**Expected Output:**
```text
Andi - A
Citra - A
Student :  Andi
Student :  Budi
Student :  Citra
```

---

## 🛠️ Tech Stack & Environment
- **Node.js:** v24.x / LTS
- **React Native:** 0.86.x
- **Expo SDK:** ~57
- **TypeScript:** ~6.0.x
- **Icons:** `@expo/vector-icons`
