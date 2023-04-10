import React, { useEffect, useState } from 'react';

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
  const [isFavoritesOpened, setIsFavoritesOpened] = useState(false);
  const shouldRenderImages = Boolean(images);

  useEffect(() => {
    if (isFavoritesOpened) {
      setImages(favorites);
    }
  }, [favorites, isFavoritesOpened]);

  const searchImages = async (query) => {
    if (!isFavoritesOpened && lastQuery === query) return;
    if (isFavoritesOpened) setIsFavoritesOpened(false);

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

  const openFavorites = () => {
    setIsFavoritesOpened(true);
  };

  const saveToFavorites = (image) => (e) => {
    e.stopPropagation();
    setFavorites([...favorites, image]);
  };

  const deleteFromFavorites = (id) => (e) => {
    e.stopPropagation();
    setFavorites(favorites.filter((image) => image.id !== id));
  };

  return (
    <div className="wrapper">
      <SearchBox
        fullScreen={!shouldRenderImages}
        isLoading={isLoading}
        onSubmit={searchImages}
        openFavorites={openFavorites}
      />
      <ImagesGrid
        images={images}
        isLoading={isLoading}
        error={error}
        favoritesView={isFavoritesOpened}
        favorites={favorites}
        saveToFavorites={saveToFavorites}
        deleteFromFavorites={deleteFromFavorites}
      />
    </div>
  );
};

export default App;
