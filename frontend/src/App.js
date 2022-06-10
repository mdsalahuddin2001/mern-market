import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import { Home, SingleProduct } from './pages';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Order from './pages/Order';
import OrderHistory from './pages/OrderHistory';
import PaymentMethod from './pages/PaymentMethod';
import PlaceOrder from './pages/PlaceOrder';
import Profile from './pages/Profile';
import Shipping from './pages/Shipping';
import Signup from './pages/Signup';
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
        <Route path="/signup" element={<Signup />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/payment-method" element={<PaymentMethod />} />
        <Route path="/order" element={<PlaceOrder />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
