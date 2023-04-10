import React, { useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import './style.scss';

const SearchBox = ({
  isLoading, fullScreen, onSubmit,
}) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/');
    onSubmit(query);
  };

  const handleChange = ({ target: { value } }) => setQuery(value);

  return (
    <form onSubmit={handleSubmit} className={classnames('search-wrapper', { shrink: !fullScreen })}>
      <input
        className="search-input"
        placeholder="What images would ypu like to see on Pixabay?"
        onChange={handleChange}
      />
      <button type="submit" className="search-btn">
        {isLoading ? 'Searching' : 'Search'}
      </button>
      <button type="button" className="favorites-btn" onClick={() => navigate('/favorites')}>
        Manage Favorites
      </button>
    </form>
  );
};

SearchBox.defaultProps = {
  fullScreen: true,
  isLoading: false,
};

SearchBox.propTypes = {
  fullScreen: PropTypes.bool,
  isLoading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBox;
