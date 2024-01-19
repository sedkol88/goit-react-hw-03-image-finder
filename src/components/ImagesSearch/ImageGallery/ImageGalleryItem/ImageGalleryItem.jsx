import styles from './image-gallery-item.module.css';

const ImageGalleryItem = ({ showModal, items }) => {
  const elements = items.map(({ id, webformatURL, largeImageURL }) => (
    <li
      className={styles.item}
      key={id}
      onClick={() => showModal({ largeImageURL })}
    >
      <img
        className={styles.ImageGalleryItemImage}
        src={webformatURL}
        alt="small view"
      />
    </li>
  ));

  return elements;
};

export default ImageGalleryItem;
