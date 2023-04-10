import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import SearchBox from './components/SearchBox';
import ImagesGrid from './components/ImagesGrid';
import { fetchImages } from './helpers';
import { useLocalStorage } from './hooks';

import './styles.scss';

const App = () => {
  const [lastQuery, setLastQuery] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [images, setImages] = useState(null);
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const location = useLocation();
  const shouldRenderImages = Boolean(isLoading || images || location.pathname !== '/');

  const searchImages = async (query) => {
    if (lastQuery === query) return;

    setError(false);
    setIsLoading(true);

    try {
      const response = await fetchImages(query);
      const data = await response.json();
      setLastQuery(query);
      setImages(data.hits);
      setIsLoading(false);
    } catch (err) {
      setImages(images || []);
      setError(true);
      setIsLoading(false);
    }
  };

  const saveToFavorites = (image) => (e) => {
    e.stopPropagation();
    setFavorites([...favorites, image]);
  };

  const deleteFromFavorites = (id) => (e) => {
    e.stopPropagation();
    setFavorites(favorites.filter((image) => image.id !== id));
  };

  const router = (
    <Routes>
      <Route
        path="/"
        element={(
          <ImagesGrid
            images={images}
            isLoading={isLoading}
            error={error}
            favorites={favorites}
            saveToFavorites={saveToFavorites}
          />
        )}
      />
      <Route
        path="/favorites"
        element={(
          <ImagesGrid
            isLoading={isLoading}
            error={error}
            favoritesView
            favorites={favorites}
            deleteFromFavorites={deleteFromFavorites}
          />
        )}
      />
    </Routes>
  );

  return (
    <div className="wrapper">
      <SearchBox
        fullScreen={!shouldRenderImages}
        isLoading={isLoading}
        onSubmit={searchImages}
      />
      {router}
    </div>
  );
};

export default App;
