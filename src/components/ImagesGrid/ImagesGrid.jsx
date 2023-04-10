import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import { ReactComponent as NoResultsIcon } from '../../assets/images/sad-face.svg';
import { ReactComponent as LoadingIcon } from '../../assets/images/think-face.svg';
import { ReactComponent as FavoriteIcon } from '../../assets/images/favorite.svg';
import { ReactComponent as CrossIcon } from '../../assets/images/cross.svg';

import './style.scss';

const ImagesGrid = ({
  images, isLoading, error, favoritesView, favorites, saveToFavorites, deleteFromFavorites,
}) => {
  const [openedImage, setOpenedImage] = useState(null);
  const isModalOpened = Boolean(openedImage);

  const handleImgClick = (image) => () => setOpenedImage(image);

  const renderImages = () => {
    if (error) {
      return (
        <div className="spinner-wrapper">
          <NoResultsIcon width={48} height={48} />
          Something went wrong, try again
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="spinner-wrapper">
          <LoadingIcon width={48} height={48} />
          Loading
        </div>
      );
    }

    const data = favoritesView ? favorites : images;

    if (data && data.length) {
      return (
        <div className="images-wrapper">
          {
            data.map((image) => {
              const saved = favorites.find(({ id }) => id === image.id);
              return (
                <div
                  key={image.id}
                  className="image-wrapper"
                >
                  <img
                    role="button"
                    onClick={handleImgClick(image)}
                    tabIndex={0}
                    src={image.webformatURL}
                    alt={image.tags}
                    className="image"
                  />
                  {!favoritesView && (
                    <div
                      className={
                        classNames(
                          'favorite-btn',
                          { selected: saved },
                        )
                      }
                      onClick={!saved && saveToFavorites(image)}
                    >
                      <FavoriteIcon width={24} height={24} />
                    </div>
                  )}
                  {favoritesView && (
                  <div
                    className="delete-btn"
                    onClick={deleteFromFavorites(image.id)}
                  >
                    <CrossIcon width={24} height={24} />
                  </div>
                  )}
                </div>
              );
            })
          }
        </div>
      );
    }

    return (
      <div className="spinner-wrapper" onClick={saveToFavorites} role="button">
        <NoResultsIcon width={48} height={48} />
        No results found!
      </div>
    );
  };

  const closeModal = () => setOpenedImage(null);

  return (
    <div className={classNames('container', { hidden: !images })}>
      {renderImages()}
      <ReactModal
        className="modal"
        overlayClassName="overlay"
        isOpen={isModalOpened}
        onRequestClose={closeModal}
      >
        {isModalOpened && (
          <div className="modal-content">
            <img src={openedImage.largeImageURL} alt={openedImage.tags} className="image" />
          </div>
        )}
      </ReactModal>
    </div>
  );
};

ImagesGrid.defaultProps = {
  images: [],
  favorites: [],
  favoritesView: false,
  isLoading: false,
  error: false,
  saveToFavorites: () => {},
  deleteFromFavorites: () => {},
};

ImagesGrid.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
  favoritesView: PropTypes.bool,
  favorites: PropTypes.arrayOf(PropTypes.object),
  saveToFavorites: PropTypes.func,
  deleteFromFavorites: PropTypes.func,
};

export default ImagesGrid;
