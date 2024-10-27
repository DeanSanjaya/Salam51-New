import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DatePicker from '../../components/Forms/DatePicker/DatePicker';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const EditBarang = () => {
  const { id } = useParams();
  const [nama, setNama] = useState('');
  const [jumlah, setJumlah] = useState<number>(0);
  const [tanggal, setTanggal] = useState<Date | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http:/localhost:5000/items/${id}`);
        setNama(response.data[0].nama);
        setJumlah(response.data[0].jumlah);
        setTanggal(
          response.data[0].tanggal ? new Date(response.data[0].tanggal) : null,
        );
        console.log(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedDate = tanggal ? tanggal.toISOString().slice(0, 10) : null;
    try {
      await axios.put(`http://localhost:5000/items/${id}`, {
        nama,
        jumlah,
        tanggal: formattedDate,
      });
      console.log('Data updated successfully!');
      // Optionally, redirect or show success message
    } catch (error) {
      console.error('Error updating data:', error);
      // Handle error updating data, redirect or show error message
    }
    navigate('/barang/list-barang');
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Edit Barang" />
      <div className="flex flex-col gap-9">
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
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Masukkan nama barang"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Jumlah barang
                </label>
                <input
                  type="number"
                  value={jumlah}
                  onChange={(e) => setJumlah(parseInt(e.target.value))}
                  placeholder="Masukkan jumlah barang"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <DatePicker tanggal={tanggal} setTanggal={setTanggal} />
              </div>

              <button
                type="submit"
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              >
                Konfirmasi
              </button>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default EditBarang;
