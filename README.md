\# Diary App – Praktikum React Native dan Redux Toolkit



\## Deskripsi

Diary App merupakan aplikasi buku harian sederhana berbasis React Native dengan Expo Router dan Redux Toolkit. Aplikasi digunakan untuk menambahkan, melihat, mengedit, dan mengelola catatan harian.



\## Teknologi

\- React Native

\- Expo

\- TypeScript

\- Expo Router

\- Redux Toolkit

\- React Redux



\## Fitur Aplikasi

1\. Menampilkan daftar diary.

2\. Menambahkan diary baru.

3\. Melihat detail diary.

4\. Mengedit judul, isi, dan mood diary.

5\. Menghapus diary.

6\. Menandai dan menghapus status favorite.

7\. Menghapus semua favorite sekaligus.

8\. Memfilter diary berdasarkan mood.

9\. Menampilkan total diary dan total favorite.

10\. Validasi judul minimal 3 karakter.

11\. Menampilkan empty state ketika data belum tersedia.

12\. Reset data diary ke kondisi awal.



\## Struktur State



\### 1. Local State

Local state adalah state yang hanya digunakan di dalam komponen tertentu.



Pada aplikasi ini, local state digunakan untuk:

\- Menyimpan sementara input judul diary.

\- Menyimpan sementara isi diary.

\- Menyimpan pilihan mood pada form.

\- Menyimpan pilihan filter mood di halaman Home.



Local state dikelola menggunakan React Hook `useState`.



\### 2. Global Redux State

Global Redux state adalah state yang dapat diakses oleh beberapa komponen melalui Redux Store.



Pada aplikasi ini, Redux digunakan untuk menyimpan:

\- Daftar diary.

\- Judul dan isi diary.

\- Mood diary.

\- Status favorite.

\- Filter diary.



Pengelolaan data dilakukan menggunakan Redux Toolkit melalui reducer dan action, seperti `addDiary`, `editDiary`, `deleteDiary`, `toggleFavorite`, dan `clearAllFavorites`.



\### 3. Persistent Database

Persistent database adalah penyimpanan data permanen yang tetap tersedia meskipun aplikasi ditutup atau perangkat dimulai ulang.



Pada project ini belum digunakan persistent database. Data diary hanya disimpan di Redux Store selama aplikasi berjalan. Jika aplikasi dimulai ulang, perubahan data yang belum disimpan secara permanen dapat hilang.



\## Perbedaan Local State, Global Redux State, dan Persistent Database



| Jenis | Fungsi | Contoh |

|---|---|---|

| Local State | Mengelola data sementara pada satu komponen | Input judul dan isi diary |

| Global Redux State | Mengelola data bersama yang dapat diakses banyak komponen | Daftar diary dan favorite |

| Persistent Database | Menyimpan data secara permanen | Database SQLite atau server database |



\## Cara Menjalankan Project



1\. Instal dependency:



&#x20;  ```bash

&#x20;  npm install

&#x20;  ```



2\. Jalankan aplikasi:



&#x20;  ```bash

&#x20;  npx expo start

&#x20;  ```



3\. Buka aplikasi menggunakan Expo Go.



\## Kesimpulan

Melalui project ini, penggunaan React Native dan Redux Toolkit diterapkan untuk mengelola data diary. Local state digunakan untuk input form, Redux digunakan untuk pengelolaan data bersama, sedangkan persistent database belum diterapkan. Aplikasi ini juga menerapkan fitur edit, filter mood, favorite, statistik, dan validasi input.



