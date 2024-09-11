import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Loader from './common/Loader';
import SignIn from './pages/Authentication/SignIn';
import InputBarang from './pages/Barang/InputBarang';
import ListBarang from './pages/Barang/ListBarang';
import Chart from './pages/Chart';
import Dashboard from './pages/Dashboard/Index';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Settings from './pages/Settings';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import EditBarang from './pages/Barang/EditBarang';
import KeluarBarang from './pages/Barang/KeluarBarang';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
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
        <Route path="/home" element={<Dashboard />} />
        <Route path="/barang/list-barang" element={<ListBarang />} />
        <Route path="/barang/input-barang" element={<InputBarang />} />
        <Route path="/barang/keluar-barang" element={<KeluarBarang />} />
        <Route path="/barang/edit-barang/:id" element={<EditBarang />} />
        <Route path="/forms/form-elements" element={<FormElements />} />
        <Route path="/forms/form-layout" element={<FormLayout />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/ui/alerts" element={<Alerts />} />
        <Route path="/ui/buttons" element={<Buttons />} />
      </Routes>
    </>
  );
}

export default App;
