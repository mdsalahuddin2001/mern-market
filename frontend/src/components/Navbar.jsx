import styled from 'styled-components';
import { BsCart } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useCartContext } from '../contexts/cartContext';
const Navbar = () => {
  const { total_items } = useCartContext();
  return (
    <NavbarWrapper>
      <div className="navbar-container section-center">
        <div className="nav-center">
          <div className="logo">
            <Link to="/">
              <h4>Market</h4>
            </Link>
          </div>
        </div>
        <ul>
          <li>Home</li>
          <li>Products</li>
          <li>Seller</li>
        </ul>
        <Link to="/cart">
          <div className="cart-icon">
            <button>
              <BsCart />
            </button>
            {total_items > 0 && <span>{total_items}</span>}
          </div>
        </Link>
      </div>
    </NavbarWrapper>
  );
};
const NavbarWrapper = styled.nav`
  background: #333;
  color: #fff;
  padding: 1.5rem 0;
  .navbar-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  h4 {
    font-size: 3rem;
    color: #fff;
  }
  ul {
    display: flex;
    align-items: center;
    justify-content: center;
    li {
      margin: 1rem;
    }
  }
  .cart-icon {
    cursor: pointer;
    position: relative;
    button {
      background-color: transparent;
      border: none;
    }
    svg {
      font-size: 3rem;
      color: #fff;
      cursor: pointer;
    }
    span {
      height: 25px;
      width: 25px;
      background-color: orangered;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      position: absolute;
      top: -30%;
      right: -50%;
    }
  }
`;
export default Navbar;
