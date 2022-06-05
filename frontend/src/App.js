import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import { Home, SingleProduct } from './pages';
import Cart from './pages/Cart';
import Login from './pages/Login';
function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" limit={1} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:slug" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
