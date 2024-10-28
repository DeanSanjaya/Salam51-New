import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Loader from './common/Loader';
import SignIn from './pages/Authentication/SignIn';
import InputBarang from './pages/Barang/InputBarang';
import ListBarang from './pages/Barang/ListBarang';
import Settings from './pages/Settings';
import EditBarang from './pages/Barang/EditBarang';
import KeluarBarang from './pages/Barang/KeluarBarang';
import TambahBarang from './pages/Barang/Tambah Barang';
import DetailBarang from './pages/Barang/DetailBarang';
import DashboardUser from './pages/Dashboard/User';
import DashboardAdmin from './pages/Dashboard/Admin';
import TambahUser from './pages/TambahUser';
import Laporan from './pages/Barang/Laporan';

function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route index element={<SignIn />} />
        <Route path="/home-user" element={<DashboardUser />} />
        <Route path="/home-admin" element={<DashboardAdmin />} />
        <Route path="/barang/list-barang" element={<ListBarang />} />
        <Route path="/barang/input-barang" element={<InputBarang />} />
        <Route path="/barang/tambah-barang/:id" element={<TambahBarang />} />
        <Route path="/barang/detail-barang/:id" element={<DetailBarang />} />
        <Route path="/barang/keluar-barang" element={<KeluarBarang />} />
        <Route path="/barang/edit-barang/:id" element={<EditBarang />} />
        <Route path="/laporan" element={<Laporan />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/tambah-user" element={<TambahUser />} />
      </Routes>
    </>
  );
}

export default App;
