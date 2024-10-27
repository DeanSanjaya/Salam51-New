import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DatePicker from '../../components/Forms/DatePicker/DatePicker';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import Swal from 'sweetalert2';
import SelectGroupOne from '../../components/Forms/SelectGroup/SelectGroupOne';

const InputBarang = () => {
  const [nama, setNama] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [leadTime, setLeadTime] = useState('');
  const [satuanBarang, setSatuanBarang] = useState('');
  const [satuanWaktu, setSatuanWaktu] = useState('');
  const [rerata, setRerata] = useState('');
  const [safetyStock, setSafetyStock] = useState('');
  const [tempat, setTempat] = useState('');

  const sweetAlert = (title, icon) => {
    Swal.fire({
      title: title,
      icon: icon,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Tutup',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      nama &&
      jumlah &&
      tanggal &&
      leadTime &&
      rerata &&
      safetyStock &&
      satuanBarang &&
      satuanWaktu &&
      tempat
    ) {
      axios
        .post('http://localhost:5000/items', {
          nama,
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
          ROP:
            parseInt(leadTime, 10) * parseFloat(rerata) +
            parseInt(safetyStock, 10),
        })
        .catch((err) => console.log(err));
      handleReset();
      sweetAlert('Input berhasil', 'success');
    } else {
      sweetAlert('Input Belum lengkap', 'error');
    }
  };

  const handleReset = () => {
    setNama('');
    setJumlah('');
    setTanggal('');
    setLeadTime('');
    setRerata('');
    setSafetyStock('');
    setSatuanBarang('');
    setSatuanWaktu('');
    setTempat('');
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
                      placeholder="Masukkan nama barang"
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
                      placeholder="Masukkan lama waktu pengantaran"
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
                      Rata-rata Penjualan Selama {leadTime} {satuanWaktu}
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
                    <DatePicker tanggal={tanggal} setTanggal={setTanggal} />
                  </div>
                  <div className="mb-4.5">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="satuan"
                    >
                      Satuan Barang
                    </label>
                    <input
                      autoComplete="off"
                      id="satuan"
                      type="string"
                      placeholder="Masukkan satuan barang"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      onChange={(e) => setSatuanBarang(e.target.value)}
                      value={satuanBarang}
                    />
                  </div>
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
