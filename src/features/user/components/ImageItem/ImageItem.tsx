import { FiDownload, FiShare2 } from 'react-icons/fi';
import { ImageItem as IImageItem } from 'store/slices/imageSlice';
import styles from './ImageItem.module.scss';

interface ImageItemProps {
  image: IImageItem;
  handleClickLike: (id: number) => void;
}

export const ImageItem: React.FC<ImageItemProps> = ({
  image,
  handleClickLike
}) => {
  return (
    <>
      <img className={styles.image} src={image.path} alt="" />
      <div className={styles.controls}>
        <button>
          <FiShare2 />
        </button>
        <button onClick={() => handleClickLike(image.id)}>лайк</button>
        <button>
          <FiDownload />
        </button>
      </div>
    </>
  );
};
