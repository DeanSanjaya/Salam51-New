import { useState } from 'react';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';
import { useNavigate } from 'react-router-dom';

const DefaultLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const username = sessionStorage.getItem('username');
  const role = sessionStorage.getItem('role');
  const navigate = useNavigate();

  return (
    <div>
      {role && username ? (
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          <div className="flex h-screen overflow-hidden">
            <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
              <Header
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
              <main>
                <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen bg-boxdark">
          <div>
            <h1 className="text-bodydark text-5xl mb-5">
              PLEASE LOGIN FIRST !
            </h1>
            <button
              onClick={() => navigate('/')}
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >
              Click
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DefaultLayout;
