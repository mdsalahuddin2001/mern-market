import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import AppProvider from './contexts/appContext';
import CartProvider from './contexts/cartContext';
import UserProvider from './contexts/userContext';
import OrderProvider from './contexts/orderContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
    <CartProvider>
      <OrderProvider>
        <UserProvider>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </UserProvider>
      </OrderProvider>
    </CartProvider>
  </AppProvider>
);
