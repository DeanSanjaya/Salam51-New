import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import SelectGroupTwo from '../../components/Forms/SelectGroup/SelectGroupTwo';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const KeluarBarang = () => {
  const [items, setItems] = useState([]);
  const [jumlah, setJumlah] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOptionId, setSelectedOptionId] = useState('');
  const [merk, setMerk] = useState('');
  const [totalStok, setTotalStok] = useState('');
  const [detailPengambilan, setDetailPengambilan] = useState([]);
  const today = new Date();
  const username = sessionStorage.getItem('username');
  const navigate = useNavigate();

  const sweetAlert = (title, icon) => {
    Swal.fire({
      title: `<p style="line-height: 1;">${title}</p>`,
      icon: icon,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Tutup',
    }).then((result) => {
      if (result.isConfirmed && icon === 'success') {
        navigate('/barang/list-barang');
      }
    });
  };

  useEffect(() => {
    axios
      .get('http://localhost:5000/items')
      .then((response) => setItems(response.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSelectChange = (id) => {
    setSelectedOption(id);
    const selectedItem = items.find((item) => item._id === id);
    if (selectedItem) {
      setMerk(selectedItem.merk);
      setTotalStok(selectedItem.totalJumlah);
      setSelectedOptionId(selectedItem._id);
    } else {
      setMerk('');
      setTotalStok(0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jumlahKeluar = parseInt(jumlah, 10);
    const selectedItem = items.find((item) => item._id === selectedOption);

    if (!totalStok) {
      sweetAlert('Pilih barang yang ingin dikeluarkan', 'error');
      return;
    }

    if (!jumlah) {
      sweetAlert(`Masukkan jumlah barang yang ingin dikeluarkan`, `error`);
      return;
    }

    if (jumlah > selectedItem.totalJumlah) {
      sweetAlert('Jumlah barang tidak mencukupi', 'error');
      return;
    }

    try {
      //tambah barang ke items
      const response = await axios.put(
        `http://localhost:5000/items/${selectedItem._id}/detail`,
        { jumlahKeluar },
      );
      if (response.status === 200) {
        const detailPengambilanBaru = response.data.detailYangDigunakan;
        setDetailPengambilan(detailPengambilanBaru);

        // Buat pesan dinamis berdasarkan detail yang digunakan
        const detailPesan = detailPengambilanBaru
          .map(
            (detail) =>
              ` ${detail.jumlahYangDikeluarkan} ${selectedItem.satuanBarang} dari tempat ${detail.tempat}`,
          )
          .join(', dan ');

        sweetAlert(
          `${selectedItem.nama} ${selectedItem.merk} sebanyak ${jumlahKeluar} ${selectedItem.satuanBarang} berhasil keluar, dengan rincian:
          ${detailPesan}.`,
          'success',
        );

        // Update state items untuk mencerminkan perubahan
        const updatedItems = items.map((item) => {
          if (item._id === selectedItem._id) {
            return { ...item, detail: response.data.item.detail }; // Update detail dengan respons
          }
          return item;
        });
        setItems(updatedItems); // Update state dengan item yang diperbarui
      }
      //tambah transaksi
      await axios.post('http://localhost:5000/transaksi/tambah', {
        namaBarang: selectedOption,
        idBarang: selectedOptionId,
        transaksi: [
          {
            username,
            jenisTransaksi: 'Pengeluaran',
            tanggalTransaksi: today,
            jumlah,
          },
        ],
      });
    } catch (error) {
      console.error('Error updating database:', error);
      alert('Terjadi kesalahan saat memperbarui database.');
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Keluar Barang" />
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Masukkan data barang
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <SelectGroupTwo
                items={items}
                selectedOption={selectedOption}
                setSelectedOption={handleSelectChange}
              />
              <div className="mb-4.5">
                <label
                  htmlFor="merk"
                  className="mb-2.5 block text-black dark:text-white"
                >
                  Merk
                </label>
                <input
                  placeholder="Merk Barang"
                  id="merk"
                  type="text"
                  value={merk}
                  readOnly
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
                <label
                  htmlFor="stok"
                  className="mb-2.5 block text-black dark:text-white"
                >
                  Total Stok
                </label>
                <input
                  placeholder="Stok Barang"
                  id="stok"
                  type="number"
                  value={totalStok}
                  disabled
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
                <label
                  htmlFor="jumlah"
                  className="mb-2.5 block text-black dark:text-white"
                >
                  Jumlah barang
                </label>
                <input
                  id="jumlah"
                  type="number"
                  placeholder="Masukkan jumlah barang"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  onChange={(e) => setJumlah(e.target.value)}
                />
              </div>
              {/* <div className="mb-4.5">
                <DatePicker />
              </div> */}
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

export default KeluarBarang;
