import axios from 'axios';
import { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const Laporan = () => {
  const [transaksi, setTransaksi] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  useEffect(() => {
    axios
      .get('http://localhost:5000/transaksi/getTransaksi')
      .then((response) => setTransaksi(response.data))
      .catch((err) => console.log(err));
  }, []);

  const sortData = (data, config) => {
    const sortedData = [...data];
    if (config.key) {
      sortedData.sort((a, b) => {
        let aValue = a[config.key];
        let bValue = b[config.key];
        if (config.key === 'tanggalTransaksi') {
          aValue = Date.parse(aValue);
          bValue = Date.parse(bValue);
        }
        if (a[config.key] < b[config.key]) {
          return config.direction === 'ascending' ? -1 : 1;
        }
        if (a[config.key] > b[config.key]) {
          return config.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedData;
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedTransaksi = sortData(transaksi, sortConfig);

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
                <th
                  onClick={() => requestSort('namaBarang')}
                  className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11 cursor-pointer"
                >
                  Nama Barang
                </th>
                <th
                  onClick={() => requestSort('jenisTransaksi')}
                  className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white cursor-pointer"
                >
                  Jenis Transaksi
                </th>
                <th
                  onClick={() => requestSort('jumlah')}
                  className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white cursor-pointer"
                >
                  Jumlah
                </th>
                <th
                  onClick={() => requestSort('tanggalTransaksi')}
                  className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white cursor-pointer"
                >
                  Tanggal
                </th>
                <th
                  onClick={() => requestSort('username')}
                  className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white cursor-pointer"
                >
                  Oleh
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedTransaksi.length > 0 ? (
                sortedTransaksi.map((detailtransaksi, index) => (
                  <tr key={detailtransaksi._id}>
                    <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark min-w-[20px] text-center">
                      <h5 className="text-black dark:text-white">
                        {index + 1}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark ">
                      <h5 className="text-black dark:text-white text-center">
                        {detailtransaksi.namaBarang}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center">
                      <h5 className="text-black dark:text-white">
                        {detailtransaksi.jenisTransaksi}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="text-black dark:text-white text-center">
                        {detailtransaksi.jumlah}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="text-black dark:text-white text-center">
                        {new Date(detailtransaksi.tanggalTransaksi)
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
                        {detailtransaksi.username}
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
