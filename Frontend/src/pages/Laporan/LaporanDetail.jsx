import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const LaporanDetail = () => {
  const { id } = useParams();
  const [transaksi, setTransaksi] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [activeTab, setActiveTab] = useState('Penambahan');

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/transaksi/getTransaksi/${id}`)
        .then((response) => {
          setTransaksi(response.data);
          filterData('Penambahan', response.data);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  const filterData = (type, data = transaksi) => {
    if (!data) return;

    if (type === 'Penambahan') {
      setFilteredData(data.penambahan || []);
    } else if (type === 'Pengeluaran') {
      setFilteredData(data.pengeluaran || []);
    } else if (type === 'Penghapusan') {
      setFilteredData(data.penghapusan || []);
    }
    setActiveTab(type);
  };

  return (
    <DefaultLayout>
      <Breadcrumb
        pageName={`Laporan Transaksi ${transaksi?.namaBarang || ''}`}
      />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className=" gap-4">
          {/* Tombol */}
          <div className="flex  justify-center flex-row  gap-4 mb-4">
            <button
              className={`py-2 px-4 rounded text-white ${
                activeTab === 'Penambahan' ? 'bg-blue-900' : 'bg-blue-500'
              }`}
              onClick={() => filterData('Penambahan')}
            >
              Penambahan
            </button>
            <button
              className={`py-2 px-4 rounded text-white ${
                activeTab === 'Pengeluaran' ? 'bg-blue-900' : 'bg-blue-500'
              }`}
              onClick={() => filterData('Pengeluaran')}
            >
              Pengeluaran
            </button>
            <button
              className={`py-2 px-4 rounded text-white ${
                activeTab === 'Penghapusan' ? 'bg-blue-900' : 'bg-blue-500'
              }`}
              onClick={() => filterData('Penghapusan')}
            >
              Penghapusan
            </button>
          </div>
          {/* Tabel */}
          <div className="pt-5 overflow-x-auto w-full  xl:pt-0">
            <table className="w-full table-auto mb-4.5">
              <thead>
                <tr className="bg-gray-2 text-center dark:bg-meta-4">
                  <th className="min-w-[50px] py-4 px-4 font-medium text-black dark:text-white cursor-pointer">
                    No
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white cursor-pointer">
                    Jumlah
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white cursor-pointer">
                    Tanggal
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white cursor-pointer">
                    Oleh
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((transaksis, index) => (
                    <tr key={transaksis._id || index}>
                      <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark min-w-[20px] text-center">
                        <h5 className="text-black dark:text-white">
                          {index + 1}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center">
                        <h5 className="text-black dark:text-white">
                          {transaksis.jumlah}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <h5 className="text-black dark:text-white text-center">
                          {new Date(transaksis.tanggalTransaksi)
                            .toLocaleDateString('id-ID', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                            })
                            .replace(/\//g, '-')}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <h5 className="text-black dark:text-white text-center">
                          {transaksis.username}
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
      </div>
    </DefaultLayout>
  );
};

export default LaporanDetail;
