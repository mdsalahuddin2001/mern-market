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
import Sidebar from './components/Sidebar';
import Search from './pages/Search';
import ProtectedRoutes from './pages/ProtectedRoutes';
import Dashboard from './pages/Dashboard';
import AdminRoutes from './components/AdminRoutes';
function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" limit={1} />
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:slug" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/payment-method" element={<PaymentMethod />} />
        <Route path="/order" element={<PlaceOrder />} />
        <Route
          path="/order/:id"
          element={
            <ProtectedRoutes>
              <Order />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/order-history"
          element={
            <ProtectedRoutes>
              <OrderHistory />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        />
        <Route path="/search" element={<Search />} />
        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoutes>
              <Dashboard />
            </AdminRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
