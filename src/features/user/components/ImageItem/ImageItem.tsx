import { FiDownload, FiShare2 } from 'react-icons/fi';
import { AiOutlineHeart } from 'react-icons/ai';
import { MdOutlineContentCopy } from 'react-icons/md';
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
    <li className={styles.imageItem}>
      <img className={styles.image} src={image.path} alt="" />
      <div className={styles.controls}>
        <button className={styles.button}>
          <MdOutlineContentCopy />
        </button>
        <button
          onClick={handleClickLike}
          className={`${styles.button} ${
            image.isFavourites ? styles.like : styles.unlike
          }`}
        >
          <AiOutlineHeart />
        </button>
        <a className={styles.button} href={image.path} download>
          <FiDownload />
        </a>
      </div>
    </li>
  );
};
