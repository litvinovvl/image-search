import React, { useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import './style.scss';

const SearchBox = ({ isLoading, fullScreen, onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
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
