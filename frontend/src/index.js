import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AppProvider from './contexts/appContext';
import CartProvider from './contexts/cartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
    <CartProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </CartProvider>
  </AppProvider>
);
