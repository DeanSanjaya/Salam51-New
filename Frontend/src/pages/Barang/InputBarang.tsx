import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DatePicker from '../../components/Forms/DatePicker/DatePicker';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';

const InputBarang = () => {
  const [nama, setNama] = useState();
  const [jumlah, setJumlah] = useState();
  const [tanggal, setTanggal]  = useState(null)

  const formattedDate = tanggal ? new Date(tanggal).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }) : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/items', { nama, jumlah, tanggal : formattedDate })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Input Barang" />
      <div className="flex flex-col gap-9">
        {/* <!-- Contact Form --> */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Masukkan data barang
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Nama barang
                </label>
                <input
                  type="text"
                  placeholder="Masukkan nama barang"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  onChange={(e) => setNama(e.target.value)}
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Jumlah barang
                </label>
                <input
                  type="text"
                  placeholder="Masukkan jumlah barang"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  onChange={(e) => setJumlah(e.target.value)}
                />
              </div>
              <div className="mb-4.5">
                <DatePicker tanggal={tanggal} setTanggal={setTanggal} />
              </div>

              <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                Konfirmasi
              </button>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default InputBarang;
