import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

import styles from './imagegallery.module.css';

const ImageGallery = ({ showModal, items }) => {
  return (
    <ul className={styles.ImageGallery}>
      <ImageGalleryItem showModal={showModal} items={items} />
    </ul>
  );
};

export default ImageGallery;
