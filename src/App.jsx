import { Routes, Route } from 'react-router-dom';

import NotFoundPage from './pages/404';
import MainLayout from './components/layout/mainLayout';
import { privateRoutes, publicRoutes } from './routes';

const App = () => {
  const token = true;

  return (
    <div className='App'>
      <MainLayout>
        <Routes>
          {!token &&
            publicRoutes?.map((route) => (
              <Route
                key={route?.id}
                path={route?.path}
                element={<route.elememt />}
              />
            ))}

          {token &&
            privateRoutes?.map((route) => (
              <Route
                key={route?.id}
                path={route?.path}
                element={<route.elememt />}
              />
            ))}

          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </MainLayout>
    </div>
  );
};

export default App;
