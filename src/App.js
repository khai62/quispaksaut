// Import modul yang diperlukan dari React dan axios
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Definisi komponen utama App
const App = () => {
  // State untuk menyimpan data dari form input
  const [formData, setFormData] = useState({
      nama: '',         // State untuk nama
      deskripsi: '',    // State untuk deskripsi
  });

  // State untuk menyimpan data yang diambil dari API
  const [data, setData] = useState([]);
  // State untuk mengindikasikan apakah data sedang dimuat
  const [isLoading, setIsLoading] = useState(true);

  // Menggunakan useEffect untuk mengambil data saat komponen pertama kali di-render
  useEffect(() => {
      const fetchData = async () => {
          try {
              // Mengambil data dari endpoint API menggunakan axios
              const response = await axios.get('http://localhost:3000/api/data');
              setData(response.data);  // Menyimpan data ke dalam state
          } catch (err) {
              console.error('Kesalahan saat mengambil data', err); // Menangani error jika terjadi
          } finally {
              setIsLoading(false);  // Mengubah state isLoading menjadi false setelah data diambil atau terjadi error
          }
      };
      fetchData();  // Memanggil fungsi fetchData
  }, []); // Kosong dependency array untuk memastikan ini hanya dijalankan sekali saat komponen di-mount

  // Fungsi untuk menangani perubahan input pada form
  const handleChange = (e) => {
      setFormData({
          ...formData,              // Menyalin state formData sebelumnya
          [e.target.name]: e.target.value,  // Mengupdate nilai state yang sesuai dengan nama input yang diubah
      });
  };

  // Fungsi untuk menangani submit form
  const handleSubmit = async (e) => {
      e.preventDefault();  // Mencegah refresh halaman
      try {
          // Mengirim data form ke endpoint API menggunakan axios
          const response = await axios.post('http://localhost:3000/api/data', formData);
          console.log('Data disimpan:', response.data);  // Log data yang disimpan

          // Mengosongkan form setelah berhasil disubmit
          setFormData({ nama: '', deskripsi: '' });

          // Mengambil data yang diperbarui dari API setelah menyimpan data baru
          const updatedData = await axios.get('http://localhost:3000/api/data');
          setData(updatedData.data);  // Mengupdate state dengan data yang diperbarui
      } catch (error) {
          console.error('Kesalahan saat menyimpan data', error); // Menangani error jika terjadi
      }
  };

  // JSX yang di-render oleh komponen
  return (
    <div className='container'>
      <h2>Input Data</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nama</label>
          <br />
          <input
            type='text'
            id='nama'
            name='nama'
            value={formData.nama}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Deskripsi</label>
          <br />
          <input
            type='text'
            id='deskripsi'
            name='deskripsi'
            value={formData.deskripsi}
            onChange={handleChange}
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
      <h2>Daftar Data</h2>
      {isLoading ? (
        <p>Loading...</p>  // Menampilkan teks 'Loading...' saat data sedang dimuat
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Deskripsi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.nama}</td>
                <td>{item.deskripsi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Ekspor komponen App sebagai default export
export default App;