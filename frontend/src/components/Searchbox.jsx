import styled from 'styled-components';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Searchbox = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search?query=${query}` : '/search');
  };
  return (
    <SearchBoxWrapper onSubmit={submitHandler}>
      <div className="search-box">
        <input
          type="text"
          value={query}
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">
          <FaSearch />
        </button>
      </div>
    </SearchBoxWrapper>
  );
};

const SearchBoxWrapper = styled.form`
  .search-box {
    display: flex;
    input {
      padding: 0.2rem 1rem;
      border: 0;
    }
    button {
      background: orangered;
      padding: 0.2rem 1rem;
      border: 0;
      font-size: 1.8rem;
    }
  }
`;

export default Searchbox;
