import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { store } from './redux/store';
import { useAppSelector } from './redux/hooks';
import { AppRoutes } from './routes/AppRoutes';
import { ErrorBoundary } from './components/common/ErrorBoundary';

const ThemeWrapper = ({ children }) => {
  const darkMode = useAppSelector((state) => state.theme.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return <>{children}</>;
};

export function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <HelmetProvider>
          <ThemeWrapper>
            <BrowserRouter>
              <AppRoutes />
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 3500,
                  style: {
                    borderRadius: '16px',
                    background: '#0f172a',
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: 600,
                  },
                }}
              />
            </BrowserRouter>
          </ThemeWrapper>
        </HelmetProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;

