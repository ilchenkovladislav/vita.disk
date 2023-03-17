import { FiDownload, FiShare2 } from 'react-icons/fi';
import { ImageItem as IImageItem } from 'store/slices/imageSlice';
import styles from './ImageItem.module.scss';

interface ImageItemProps {
  image: IImageItem;
  handleClickLike: () => void;
}

export const ImageItem: React.FC<ImageItemProps> = ({
  image,
  handleClickLike
}) => {
  return (
    <li className={styles.imageItem} key={image.id}>
      <img className={styles.image} src={image.path} alt="" />
      <div className={styles.controls}>
        <button>
          <FiShare2 />
        </button>
        <button
          onClick={handleClickLike}
          className={image.isFavourites ? styles.like : styles.unlike}
        >
          лайк
        </button>
        <a href={image.path} download>
          <FiDownload />
        </a>
      </div>
    </li>
  );
};
