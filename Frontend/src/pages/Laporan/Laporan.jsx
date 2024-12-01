import axios from 'axios';
import { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useNavigate } from 'react-router-dom';

const Laporan = () => {
  const [transaksi, setTransaksi] = useState([]);
  const navigate = useNavigate();

  const handleDetail = (_id) => {
    navigate(`/laporan/${_id}`);
  };

  useEffect(() => {
    axios
      .get('http://localhost:5000/transaksi/getTransaksi')
      .then((response) => setTransaksi(response.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName={`Laporan Transaksi`} />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-center dark:bg-meta-4">
                <th className="min-w-[50px] py-4 px-4 font-medium text-black dark:text-white cursor-pointer">
                  No
                </th>
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11 cursor-pointer">
                  Nama Barang
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white cursor-pointer">
                  Penambahan Terakhir
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white cursor-pointer">
                  Pengeluaran Terakhir
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white cursor-pointer">
                  Penghapusan Terakhir
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white cursor-pointer">
                  Detail
                </th>
              </tr>
            </thead>
            <tbody>
              {transaksi.length > 0 ? (
                transaksi.map((transaksis, index) => (
                  <tr key={transaksis._id}>
                    <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark min-w-[20px] text-center">
                      <h5 className="text-black dark:text-white">
                        {index + 1}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark ">
                      <h5 className="text-black dark:text-white text-center">
                        {transaksis.namaBarang}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center">
                      <h5 className="text-black dark:text-white">
                        {transaksis.penambahan.length > 0
                          ? transaksis.penambahan[
                              transaksis.penambahan.length - 1
                            ].jumlah
                          : '0'}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="text-black dark:text-white text-center">
                        {transaksis.pengeluaran.length > 0
                          ? transaksis.pengeluaran[
                              transaksis.pengeluaran.length - 1
                            ].jumlah
                          : '0'}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="text-black dark:text-white text-center">
                        {transaksis.penghapusan.length > 0
                          ? transaksis.penghapusan[
                              transaksis.penghapusan.length - 1
                            ].jumlah
                          : '0'}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="text-black dark:text-white text-center">
                        <button
                          onClick={() => handleDetail(transaksis._id)}
                          className="hover:text-primary"
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <circle
                              cx="8"
                              cy="12"
                              r="1.5"
                              fill="currentColor"
                            />
                            <circle
                              cx="12"
                              cy="12"
                              r="1.5"
                              fill="currentColor"
                            />
                            <circle
                              cx="16"
                              cy="12"
                              r="1.5"
                              fill="currentColor"
                            />
                          </svg>
                        </button>
                      </h5>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    Data tidak tersedia
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Laporan;
