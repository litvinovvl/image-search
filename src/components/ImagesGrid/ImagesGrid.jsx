import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import { ReactComponent as NoResultsIcon } from '../../assets/images/sad-face.svg';
import { ReactComponent as LoadingIcon } from '../../assets/images/think-face.svg';

import './style.scss';

const ImagesGrid = ({
  images, isLoading, error,
}) => {
  const [openedImage, setOpenedImage] = useState(null);
  const isModalOpened = Boolean(openedImage);

  const handleImgClick = (image) => () => setOpenedImage(image);

  const handleImgKeyPress = (image) => (e) => {
    if (e.key === 'Enter') setOpenedImage(image);
  };

  const renderImages = () => {
    if (error) {
      return (
        <div className="spinner-wrapper">
          <NoResultsIcon width={48} hanging={48} />
          Something went wrong, try again
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="spinner-wrapper">
          <LoadingIcon width={48} hanging={48} />
          Loading
        </div>
      );
    }

    if (images && images.length) {
      return (
        <div className="images-wrapper">
          {
            images.map((image) => (
              <div
                key={image.id}
                role="button"
                onClick={handleImgClick(image)}
                onKeyPress={handleImgKeyPress(image)}
                tabIndex={0}
              >
                <img
                  src={image.webformatURL}
                  alt={image.tags}
                  className="image"
                />
              </div>

            ))
          }
        </div>
      );
    }

    return (
      <div className="spinner-wrapper">
        <NoResultsIcon width={48} hanging={48} />
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
  images: null,
  isLoading: false,
  error: false,
};

ImagesGrid.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
};

export default ImagesGrid;
