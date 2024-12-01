import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DatePicker from '../../components/Forms/DatePicker/DatePicker';
import DefaultLayout from '../../layout/DefaultLayout';
import { calculateROP } from '../../utils/ropFunction';
import axios from 'axios';
import Swal from 'sweetalert2';
import SelectGroupOne from '../../components/Forms/SelectGroup/SelectGroupOne';
import DynamicFields from '../../components/DynamicField';
import SelectGroupThree from '../../components/Forms/SelectGroup/SelectGroupThree';

const InputBarang = () => {
  const [nama, setNama] = useState('');
  const [merk, setMerk] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [leadTime, setLeadTime] = useState('');
  const [satuanBarang, setSatuanBarang] = useState('');
  const [satuanWaktu, setSatuanWaktu] = useState('');
  const [rerata, setRerata] = useState('');
  const [safetyStock, setSafetyStock] = useState('');
  const [tempat, setTempat] = useState('');
  const [attributes, setAttributes] = useState([]);
  const [isOther, setIsOther] = useState(false);
  const username = sessionStorage.getItem('username');

  const handleSelectOther = (isSelected) => {
    setIsOther(isSelected);
  };

  const sweetAlert = (title, icon) => {
    Swal.fire({
      title: title,
      icon: icon,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Tutup',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      nama &&
      merk &&
      jumlah &&
      tanggal &&
      leadTime &&
      rerata &&
      safetyStock &&
      satuanWaktu &&
      satuanBarang &&
      tempat
    ) {
      // Menghitung ROP
      const ROP = calculateROP(leadTime, satuanWaktu, rerata, safetyStock);

      // Memformat atribut jika ada
      const formattedAttributes = attributes.reduce((acc, attr) => {
        if (attr.label && attr.value) {
          acc[attr.label] = attr.value;
        }
        return acc;
      }, {});

      try {
        // 1. Simpan barang ke itemsModel dan ambil idBarang yang baru dibuat
        const itemResponse = await axios.post('http://localhost:5000/items', {
          nama,
          merk,
          detail: [
            {
              jumlah,
              tanggal,
              tempat,
            },
          ],
          leadTime,
          rerata,
          safetyStock,
          satuanBarang,
          satuanWaktu,
          totalJumlah: jumlah,
          ROP,
          attributes: formattedAttributes,
        });

        const idBarang = itemResponse.data._id;

        // 2. Simpan transaksi ke transactionModel dengan idBarang
        await axios.post('http://localhost:5000/transaksi/tambah', {
          namaBarang: nama,
          idBarang,
          transaksi: [
            {
              username,
              jenisTransaksi: 'Penambahan',
              tanggalTransaksi: tanggal,
              jumlah,
            },
          ],
        });

        handleReset();
        sweetAlert('Input berhasil', 'success');
      } catch (err) {
        console.log(err);
        sweetAlert('Terjadi kesalahan', 'error');
      }
    } else {
      sweetAlert('Input Belum lengkap', 'error');
    }
  };

  const handleReset = () => {
    setNama('');
    setMerk('');
    setJumlah('');
    setTanggal('');
    setLeadTime('');
    setRerata('');
    setSafetyStock('');
    setSatuanBarang('');
    setSatuanWaktu('');
    setTempat('');
    setAttributes([]);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Input Barang" />
      <div className="flex flex-col gap-9 ">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Masukkan data barang
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <div className="grid grid-cols-2 gap-4.5">
                {/* Kolom 1 */}
                <div>
                  <div className="mb-4.5">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="namaBarang"
                    >
                      Nama barang
                    </label>
                    <input
                      autoComplete="off"
                      id="namaBarang"
                      type="text"
                      placeholder="Contoh: Paku, Kayu, Semen, dll"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      onChange={(e) => setNama(e.target.value)}
                      value={nama}
                    />
                  </div>
                  <div className="mb-4.5">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="jumlahBarang"
                    >
                      Jumlah barang
                    </label>
                    <input
                      id="jumlahBarang"
                      type="number"
                      placeholder="Masukkan jumlah barang"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      onChange={(e) => setJumlah(e.target.value)}
                      value={jumlah}
                    />
                  </div>
                  <div className="mb-4.5">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="waktu-antar"
                    >
                      Lama Waktu Pengantaran
                    </label>
                    <input
                      id="waktu-antar"
                      type="number"
                      placeholder="Masukkan waktu pengantaran barang"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      onChange={(e) => setLeadTime(e.target.value)}
                      value={leadTime}
                    />
                  </div>
                  <div className="mb-4.5">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="rerata"
                    >
                      Asumsi Rata-Rata Penjualan Perharinya
                    </label>
                    <input
                      id="rerata"
                      type="number"
                      placeholder="Masukkan rata-rata penjualan"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      onChange={(e) => setRerata(e.target.value)}
                      value={rerata}
                    />
                  </div>
                  <div className="mb-4.5">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="tempat"
                    >
                      Tempat Simpan
                    </label>
                    <input
                      autoComplete="off"
                      id="tempat"
                      type="text"
                      placeholder="Masukkan barang disimpan"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      onChange={(e) => setTempat(e.target.value)}
                      value={tempat}
                    />
                  </div>
                </div>
                {/* Kolom 2 */}

                <div>
                  <div className="mb-4.5">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="merk"
                    >
                      Merk barang
                    </label>
                    <input
                      autoComplete="off"
                      id="merk"
                      type="text"
                      placeholder="Contoh: Dulux, Nippon, dan lain-lain"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      onChange={(e) => setMerk(e.target.value)}
                      value={merk}
                    />
                  </div>
                  <div className="mb-4.5">
                    <DatePicker tanggal={tanggal} setTanggal={setTanggal} />
                  </div>

                  <SelectGroupThree
                    satuanBarang={satuanBarang}
                    setSatuanBarang={setSatuanBarang}
                    onSelectOther={handleSelectOther}
                  />

                  <SelectGroupOne
                    satuanWaktu={satuanWaktu}
                    setSatuanWaktu={setSatuanWaktu}
                  />
                  <div className="mb-4.5">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="safety"
                    >
                      Safety Stock
                    </label>
                    <input
                      id="safety"
                      type="number"
                      placeholder="Masukkan safety stock"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      onChange={(e) => setSafetyStock(e.target.value)}
                      value={safetyStock}
                    />
                  </div>
                </div>
              </div>
              <DynamicFields
                attributes={attributes}
                setAttributes={setAttributes}
              />
              <div className="flex justify-between gap-4.5">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex w-full justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                >
                  Hapus
                </button>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  Confirm
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default InputBarang;
