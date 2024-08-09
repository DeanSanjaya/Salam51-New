import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Tabel from '../../components/Tables';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';

interface Items {
  _id: String;
  nama: String;
  jumlah: number;
  tanggal: String;
}

const ListBarang = () => {
  const [items, setItems] = useState<Items[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/items')
      .then((response) => setItems(response.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="List Barang" />
      <Tabel items={items} setItems={setItems} />
    </DefaultLayout>
  );
};

export default ListBarang;
