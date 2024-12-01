import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const InformasiBarang = () => {
  const { id } = useParams();
  const [nama, setNama] = useState('');
  const [merk, setMerk] = useState('');
  const [leadTime, setLeadTime] = useState('');
  const [satuanWaktu, setSatuanWaktu] = useState('');
  const [rerata, setRerata] = useState('');
  const [safetyStock, setSafetyStock] = useState('');
  const [attributes, setAttributes] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/items/${id}`);
        setNama(response.data.nama);
        setMerk(response.data.merk);
        setLeadTime(response.data.leadTime);
        setSatuanWaktu(response.data.satuanWaktu);
        setRerata(response.data.rerata);
        setSafetyStock(response.data.safetyStock);
        setAttributes(response.data.attributes || {});
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName={`Informasi Barang ${nama}`} />
      <div className="flex flex-col gap-9 ">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white"></h3>
          </div>

          <div className="p-6.5">
            <div className="grid grid-cols-2 gap-x-4.5">
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
                    disabled
                    id="namaBarang"
                    type="text"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    onChange={(e) => setNama(e.target.value)}
                    value={nama}
                  />
                </div>
                <div className="mb-4.5">
                  <label
                    className="mb-2.5 block text-black dark:text-white"
                    htmlFor="leadTime"
                  >
                    Lama Waktu Pengantaran
                  </label>
                  <input
                    disabled
                    id="leadTime"
                    type="number"
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
                    Rata-rata Penjualan Perharinya
                  </label>
                  <input
                    disabled
                    id="rerata"
                    type="number"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    onChange={(e) => setRerata(e.target.value)}
                    value={rerata}
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
                    Merk Barang
                  </label>
                  <input
                    disabled
                    id="merk"
                    type="text"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    onChange={(e) => setMerk(e.target.value)}
                    value={merk}
                  />
                </div>
                <div className="mb-4.5">
                  <label
                    className="mb-2.5 block text-black dark:text-white"
                    htmlFor="satuan-waktu"
                  >
                    Satuan Waktu
                  </label>
                  <input
                    disabled
                    id="satuan-waktu"
                    type="text"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    onChange={(e) => setSatuanWaktu(e.target.value)}
                    value={satuanWaktu}
                  />
                </div>

                <div className="mb-4.5">
                  <label
                    className="mb-2.5 block text-black dark:text-white"
                    htmlFor="safety"
                  >
                    Safety Stock
                  </label>
                  <input
                    disabled
                    id="safety"
                    type="number"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    onChange={(e) => setSafetyStock(e.target.value)}
                    value={safetyStock}
                  />
                </div>
              </div>
              {/* Menampilkan atribut dinamis */}
              {Object.entries(attributes).map(([key, value]) => (
                <div key={key} className="mb-4.5">
                  <label
                    className="mb-2.5 block text-black dark:text-white"
                    htmlFor={key}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <input
                    disabled
                    id={key}
                    type="text"
                    className="dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                    value={value}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default InformasiBarang;
