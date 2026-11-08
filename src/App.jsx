import React from 'react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { store } from './redux/store';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { EcoBazarNativeApp } from './react-native/EcoBazarNativeApp';

export function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <HelmetProvider>
          <EcoBazarNativeApp />
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
        </HelmetProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
