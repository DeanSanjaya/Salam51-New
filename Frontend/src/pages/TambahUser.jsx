import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useState } from 'react';
import SelectGroupFour from '../components/Forms/SelectGroup/SelectGroupFour';

const TambahUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const roleLocal = sessionStorage.getItem('role');

  const navigate = useNavigate();
  const sweetAlert = (message, icon) => {
    Swal.fire({
      title: message,
      icon: icon,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Tutup',
    }).then((result) => {
      if (result.isConfirmed && icon === 'success') {
        navigate(`/home-${roleLocal}`);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username) {
      sweetAlert('Username tidak boleh kosong', 'error');
      return;
    }
    if (!password) {
      sweetAlert('Password tidak boleh kosong', 'error');
      return;
    }
    if(!role){
      sweetAlert('Silahkan pilih role', 'error');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/addUser', {
        username,
        password,
        role,
      });
      if (response.status === 201) {
        sweetAlert('User berhasil ditambahkan', 'success');
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Terjadi kesalahan';
      if (error.response && error.response.status === 400) {
        if (errorMessage === 'Username sudah terpakai') {
          sweetAlert('Username sudah terpakai', 'error');
        } else {
          sweetAlert('Gagal menambahkan user: ' + errorMessage, 'error');
        }
      } else {
        alert('Error: ' + errorMessage);
      }
    }
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-180">
        <Breadcrumb pageName="Tambah User" />
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Tambah User
            </h3>
          </div>
          <div className="p-7">
            <form onSubmit={handleSubmit}>
              <div className="mb-5.5">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="username"
                >
                  Username
                </label>
                <div className="relative">
                  <input
                    className="w-full rounded border border-stroke bg-white py-3 pl-4.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    name="username"
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="mb-5.5">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    className="w-full rounded border border-stroke bg-white py-3 px-4.5 pl-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    name="password"
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-5.5">
                <div className="relative">
                  <SelectGroupFour role={role} setRole={setRole} />
                </div>
              </div>
              <div className="flex justify-end gap-4.5">
                <button
                  onClick={() => navigate(`/home-${roleLocal}`)}
                  className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  type="button"
                >
                  Kembali
                </button>
                <button
                  className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                  type="submit"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default TambahUser;
