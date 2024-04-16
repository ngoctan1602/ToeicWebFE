import React, { useEffect, useState } from 'react';
import './App.css';
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AdminRouter, UserRoutes } from './router';
import { GlobalStateProvider, useGlobalState } from './component/common/globaleState';

import { checkUrlOnline } from './api/BaseAPI';
import './styles/styles.scss'
import UserLayout from './layout/UserLayout';
import AdminLayout from './layout/AdminLayout';
import NotFoundPage from './component/common/notFound';


const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { globalState, setGlobalState } = useGlobalState();
  const navigate = useNavigate();

  const notifySuccess = (message) => toast.success(message, {
    position: 'bottom-right',
    autoClose: 2000,
    transition: Flip,
  });

  const notifyFailed = (message) => toast.error(message, {
    position: 'bottom-right',
    autoClose: 2000,
    transition: Flip,
  });

  const notifyWarning = (message) => toast.warning(message, {
    position: 'bottom-right',
    autoClose: 2000,
    transition: Flip,
  });

  useEffect(() => {
    if (globalState.handle) {
      globalState.success ? notifySuccess(globalState.message) : notifyFailed(globalState.message);
    }
  }, [globalState]);

  useEffect(() => {
    checkUrlOnline(import.meta.env.VITE_BASE_API + 'part/getAll')
      .then((result) => {
        if (!result) {
          notifyWarning('Kiểm tra kết nối với server');
        } else {
          setGlobalState({ ...globalState, connect: true });
        }
      });
  }, []);

  return (
    <div style={{ minHeight: '480px', width: '100%' }}>
      <Routes>
        {UserRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={(
              <UserLayout>
                <route.component />
              </UserLayout>
            )}
          />
        ))}
        {AdminRouter.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={(
              <AdminLayout>
                {
                  // route.component !== null || route.component !== undefined
                  // &&
                }
                <route.component />
              </AdminLayout>
            )}
          />
        ))}
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
