import styled from 'styled-components';
import { BsCart } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useCartContext } from '../contexts/cartContext';
import { useUserContext } from '../contexts/userContext';
import { IoMdArrowDropdownCircle } from 'react-icons/io';
import { useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { useGlobalContext } from '../contexts/appContext';
import { FaBars } from 'react-icons/fa';
import Searchbox from './Searchbox';
const Navbar = () => {
  const { toggleSidebar } = useGlobalContext();
  const { total_items } = useCartContext();
  const { userInfo, logout } = useUserContext();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  // Sign out handler
  const logoutHandler = () => {
    logout();
    navigate('/login');
  };
  return (
    <NavbarWrapper>
      <div className="navbar-container section-center">
        <div className="nav-center">
          <div className="sidebar-toggle-btn">
            <button type="button" onClick={toggleSidebar}>
              <FaBars />
            </button>
          </div>
          <div className="logo">
            <Link to="/">
              <h4>Market</h4>
            </Link>
          </div>
        </div>
        <Searchbox />
        {userInfo ? (
          <div className="dropdown-container">
            <p
              className="dropdown-header"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {userInfo.name} <IoMdArrowDropdownCircle />
            </p>
            <ul
              onClick={() => setShowDropdown(false)}
              className={`dropdown-items ${showDropdown && 'show-items'}`}
            >
              <li>
                <Link to="/profile">User Profile</Link>
              </li>
              <li>
                <Link to="/order-history">Order History</Link>
              </li>
              <hr />
              <li>
                <span onClick={logoutHandler}>Sign Out</span>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn">
            Sign In
          </Link>
        )}
        {userInfo && userInfo.role === 'admin' && (
          <NavDropdown title="Admin" id="admin-nav-dropdown">
            <LinkContainer to="/admin/dashboard">
              <NavDropdown.Item>Dashboard</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/admin/productlist">
              <NavDropdown.Item>Products</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/admin/orderlist">
              <NavDropdown.Item>Orders</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/admin/userlist">
              <NavDropdown.Item>Users</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
        )}
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
    flex-wrap: wrap;
  }
  .nav-center {
    display: flex;
    align-items: center;
    button {
      margin-right: 2.5rem;
    }
  }
  button {
    margin-right: 2rem;
    border: 0;
    background: transparent;
    color: #fff;
    font-size: 2.5rem;
    margin: 0;
  }
  h4 {
    font-size: 3rem;
    color: #fff;
    margin: 0;
  }
  ul {
    display: flex;
    align-items: center;
    justify-content: center;
    li {
      margin: 1rem;
    }
  }
  a {
    font-size: 1.5rem;
  }
  .dropdown-container {
    position: relative;
    .dropdown-header {
      color: #fff;
      margin: 0;
      display: flex;
      align-items: center;
      font-size: 1.5rem;
      cursor: pointer;
      svg {
        margin-left: 0.5rem;
      }
    }
    .dropdown-items {
      background: var(--primary-color);
      display: block;
      position: absolute;
      width: 150px;
      top: 175%;
      z-index: 100;
      opacity: 0;
      display: none;
      transition: all 0.4s;
      li {
        color: #fff;
        display: block;
        cursor: pointer;
        a {
          color: #fff;
          display: block;
        }
      }
    }
    .dropdown-items.show-items {
      opacity: 1;
      display: block;
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
      top: -20%;
      right: -50%;
    }
  }
`;
export default Navbar;
