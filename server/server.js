// Import modul yang diperlukan
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Membuat instance dari Express
const app = express();
const PORT = process.env.PORT || 3000;  // Menentukan port untuk server, menggunakan environment variable atau default ke 3000

// Middleware
app.use(cors());  // Mengizinkan Cross-Origin Resource Sharing (CORS)
app.use(bodyParser.json());  // Menggunakan body-parser untuk mem-parsing request body sebagai JSON

// Model Database menggunakan Mongoose
const Tesdatabase = mongoose.model('user', {
    nama: String,        // Field nama dengan tipe data String
    deskripsi: String    // Field deskripsi dengan tipe data String
});

// Koneksi ke Database MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/tesdatabase',)  // URL koneksi ke MongoDB
    .then(() => console.log('Terhubung ke MongoDB'))  // Pesan log saat berhasil terhubung
    .catch(err => console.error('Kesalahan saat terhubung ke MongoDB', err));  // Pesan log saat gagal terhubung

// Endpoint untuk Menyimpan Data Baru
app.post('/api/data', async (req, res) => {
    const { nama, deskripsi } = req.body;  // Mengambil data dari request body
    const newData = new Tesdatabase({ nama, deskripsi });  // Membuat instance baru dari model Tesdatabase

    try {
        const savedData = await newData.save();  // Menyimpan data ke database
        res.status(200).json(savedData);  // Mengirim response dengan data yang disimpan
    } catch (err) {
        res.status(400).json({ error: err.message });  // Mengirim response error jika gagal menyimpan data
    }
});

// Endpoint untuk Mengambil Data
app.get('/api/data', async (req, res) => {
    try {
        const data = await Tesdatabase.find();  // Mengambil semua data dari koleksi Tesdatabase
        res.status(200).json(data);  // Mengirim response dengan data yang diambil
    } catch (err) {
        console.error('Kesalahan saat mengambil data', err);  // Pesan log saat gagal mengambil data
        res.status(500).json({ message: 'Kesalahan saat mengambil data' });  // Mengirim response error jika gagal mengambil data
    }
});

// Menjalankan server pada port yang ditentukan
app.listen(PORT, () => {
    console.log("Server berjalan di port ${PORT}");  // Pesan log saat server berhasil berjalan
});