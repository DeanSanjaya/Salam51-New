import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import { useNavigate } from 'react-router-dom';

const Petunjuk = () => {
  const role = sessionStorage.getItem('role');
  const navigate = useNavigate();

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Petunjuk Pengguna" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          {role === 'user 1' ? (
            <div>
              <div className="mb-10">
                <h1 className="text-2xl font-bold text-black dark:text-white mb-4">
                  Menambahkan barang baru
                </h1>
                <p className="text-base text-black dark:text-white mb-2">
                  Berikut adalah tahapan untuk menambahkan barang baru:
                </p>
                <ol className="text-base text-black dark:text-white list-inside list-decimal">
                  <li className="mb-2">
                    Masuk ke halaman{' '}
                    <span
                      onClick={() => navigate('/barang/input-barang')}
                      className="cursor-pointer text-primary"
                    >
                      Tambah barang
                    </span>
                  </li>
                  <li className="mb-2">
                    Lalu isikan semua input dengan lengkap
                  </li>
                  <li className="mb-2">
                    Apabila barang memiliki atribut khusus, pengguna bisa
                    menambah input sendiri lalu mengisinya
                  </li>
                  <li className="mb-2">
                    Setelah memastikan semuanya sudah terisi, pengguna bisa
                    mengklik tombol 'Confirm' untuk mensubmitnya
                  </li>
                </ol>
              </div>
              <div className="mb-10">
                <h1 className="text-2xl font-bold text-black dark:text-white mb-4">
                  Menambahkan barang yang sudah tersimpan
                </h1>
                <p className="text-base text-black dark:text-white mb-2">
                  Berikut adalah tahapan untuk menambahkan barang :
                </p>
                <ol className="text-base text-black dark:text-white list-inside list-decimal">
                  <li className="mb-2">
                    Masuk ke halaman{' '}
                    <span
                      onClick={() => navigate('/barang/list-barang')}
                      className="cursor-pointer text-primary"
                    >
                      List Barang
                    </span>
                  </li>
                  <li className="mb-2">
                    Dihalaman tersebut dapat dilihat semua barang yang sudah
                    tersimpan oleh sistem
                  </li>
                  <li className="mb-2">
                    Klik tombol '+' di baris aksi di barang yang ingin
                    ditambahkan
                  </li>
                  <li className="mb-2">
                    Setelah sudah, maka akan dialihkan ke halaman tambah barang
                    sesuai dengan barang yang anda ingin tambahkan
                  </li>
                  <li className="mb-2">
                    Isi semua input dalam halaman tersebut seperti jumlah
                    barang, tanggal barang, dan tempat simpan barang
                  </li>
                  <li className="mb-2">
                    Jika semua input sudah benar dan lengkap, pengguna bisa
                    menyelesaikan proses dengan mengklik tombol 'Confirm'
                  </li>
                </ol>
              </div>
              <div className="mb-10">
                <h1 className="text-2xl font-bold text-black dark:text-white mb-4">
                  Melihat informasi barang yang sudah tersimpan
                </h1>
                <p className="text-base text-black dark:text-white mb-2">
                  Berikut adalah tahapan untuk Melihat informasi barang :
                </p>
                <ol className="text-base text-black dark:text-white list-inside list-decimal">
                  <li className="mb-2">
                    Masuk ke halaman{' '}
                    <span
                      onClick={() => navigate('/barang/list-barang')}
                      className="cursor-pointer text-primary"
                    >
                      List Barang
                    </span>
                  </li>
                  <li className="mb-2">
                    Dihalaman tersebut dapat dilihat semua barang yang sudah
                    tersimpan oleh sistem
                  </li>
                  <li className="mb-2">
                    Klik tombol '(i)' di baris aksi di barang yang ingin anda
                    lihat informasinya
                  </li>
                  <li className="mb-2">
                    Setelah sudah, maka akan dialihkan ke halaman informasi
                    barang yang menampilkan semua informasi barang yang anda
                    pilih
                  </li>
                </ol>
              </div>
              <div className="mb-10">
                <h1 className="text-2xl font-bold text-black dark:text-white mb-4">
                  Melihat detail barang (urutan barang)
                </h1>
                <p className="text-base text-black dark:text-white mb-2">
                  Berikut adalah tahapan untuk melihat detail barang :
                </p>
                <ol className="text-base text-black dark:text-white list-inside list-decimal">
                  <li className="mb-2">
                    Masuk ke halaman{' '}
                    <span
                      onClick={() => navigate('/barang/list-barang')}
                      className="cursor-pointer text-primary"
                    >
                      List Barang
                    </span>
                  </li>
                  <li className="mb-2">
                    Dihalaman tersebut dapat dilihat semua barang yang sudah
                    tersimpan oleh sistem
                  </li>
                  <li className="mb-2">
                    Klik tombol '(...)' di baris aksi di barang yang ingin anda
                    lihat informasinya
                  </li>
                  <li className="mb-2">
                    Setelah sudah, maka akan dialihkan ke halaman detail barang
                    yang menampilkan semua urutan barang yang anda pilih
                  </li>
                </ol>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-10">
                <h1 className="text-2xl font-bold text-black dark:text-white mb-4">
                  Melihat informasi barang yang sudah tersimpan
                </h1>
                <p className="text-base text-black dark:text-white mb-2">
                  Berikut adalah tahapan untuk Melihat informasi barang :
                </p>
                <ol className="text-base text-black dark:text-white list-inside list-decimal">
                  <li className="mb-2">
                    Masuk ke halaman{' '}
                    <span
                      onClick={() => navigate('/barang/list-barang')}
                      className="cursor-pointer text-primary"
                    >
                      List Barang
                    </span>
                  </li>
                  <li className="mb-2">
                    Dihalaman tersebut dapat dilihat semua barang yang sudah
                    tersimpan oleh sistem
                  </li>
                  <li className="mb-2">
                    Klik tombol '(i)' di baris aksi di barang yang ingin anda
                    lihat informasinya
                  </li>
                  <li className="mb-2">
                    Setelah sudah, maka akan dialihkan ke halaman informasi
                    barang yang menampilkan semua informasi barang yang anda
                    pilih
                  </li>
                </ol>
              </div>
              <div className="mb-10">
                <h1 className="text-2xl font-bold text-black dark:text-white mb-4">
                  Melihat detail barang (urutan barang)
                </h1>
                <p className="text-base text-black dark:text-white mb-2">
                  Berikut adalah tahapan untuk melihat detail barang :
                </p>
                <ol className="text-base text-black dark:text-white list-inside list-decimal">
                  <li className="mb-2">
                    Masuk ke halaman{' '}
                    <span
                      onClick={() => navigate('/barang/list-barang')}
                      className="cursor-pointer text-primary"
                    >
                      List Barang
                    </span>
                  </li>
                  <li className="mb-2">
                    Dihalaman tersebut dapat dilihat semua barang yang sudah
                    tersimpan oleh sistem
                  </li>
                  <li className="mb-2">
                    Klik tombol '(...)' di baris aksi di barang yang ingin anda
                    lihat informasinya
                  </li>
                  <li className="mb-2">
                    Setelah sudah, maka akan dialihkan ke halaman detail barang
                    yang menampilkan semua urutan barang yang anda pilih
                  </li>
                </ol>
              </div>
              <div className="mb-10">
                <h1 className="text-2xl font-bold text-black dark:text-white mb-4">
                  Mengeluarkan Barang
                </h1>
                <p className="text-base text-black dark:text-white mb-2">
                  Berikut adalah tahapan untuk mengeluarkan barang :
                </p>
                <ol className="text-base text-black dark:text-white list-inside list-decimal">
                  <li className="mb-2">
                    Masuk ke halaman{' '}
                    <span
                      onClick={() => navigate('/barang/keluar-barang')}
                      className="cursor-pointer text-primary"
                    >
                      Keluar Barang
                    </span>
                  </li>
                  <li className="mb-2">
                    Di halaman tersebut, pengguna dapat memilih barang yang
                    ingin dikeluarkan
                  </li>
                  <li className="mb-2">
                    Setelah sudah dipilih, pengguna bisa mengisi jumlah barang
                    yang ingin dikeluarkan
                  </li>
                  <li className="mb-2">
                    Setelah sudah, pengguna bisa menyelesaikan proses
                    pengeluaran barang dengan mengklik tombol 'Confirm'
                  </li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Petunjuk;
