import { useEffect } from 'react';
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useGlobalContext } from '../contexts/appContext';
import { getError } from '../utils/getError';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useGlobalContext();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (error) {
        toast.error(getError(error));
      }
    };
    fetchCategories();
  }, []);
  return (
    <SidebarWrapper className={isSidebarOpen && 'show'}>
      <div className="sidebar-header">
        <h2>Market</h2>
        <button onClick={closeSidebar} className="close">
          <FaTimes />
        </button>
      </div>
      <div className="cat-container">
        <ul>
          {categories.map((cat, index) => (
            <li key={index}>
              <Link onClick={closeSidebar} to={`/search?category=${cat}`}>
                {cat}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.aside`
  position: fixed;
  height: 100vh;
  width: 300px;
  background: #222;
  top: 0;
  left: 0;
  right: 0;
  transform: translateX(-120%);
  transition: transform 0.4s;
  z-index: 101;
  padding: 3rem 1rem;
  .sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  h2 {
    font-size: 2.5rem;
    color: #fff;
    margin: 0;
  }
  .close {
    border: 0;
    background-color: transparent;
    color: red;
    font-size: 2.5rem;
  }
  &.show {
    transform: translateX(0);
  }
  ul {
    margin: 5rem 0;
    padding: 0;
    li {
      margin: 1rem 0;
      a {
        color: #fff;
        text-transform: capitalize;
      }
    }
  }
`;
export default Sidebar;
