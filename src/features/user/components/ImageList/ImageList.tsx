import { useParams } from 'react-router-dom';
import { useStateSelector } from 'store/hooks';
import { ImageItem } from '../ImageItem/ImageItem';
import styles from './ImageList.module.scss';

export const ImageList = () => {
  const { userLink, folderLink } = useParams();

  const project = useStateSelector((state) =>
    state.project.items.find((project) => project.link === userLink)
  );

  const folder = useStateSelector((state) =>
    state.folder.items.find(
      (folder) =>
        folder.link === folderLink &&
        Number(folder.projectId) === Number(project?.id)
    )
  );

  const images = useStateSelector((state) =>
    state.image.items.filter((el) => Number(el.folderId) === Number(folder?.id))
  );

  function handleClickLike(id: number) {
    //  сделать экшн, который будет ставить лайк
  }

  return (
    <ul className={styles.imageList}>
      {images.map((img) => (
        <li className={styles.imageItem} key={img.id}>
          <ImageItem image={img} handleClickLike={handleClickLike} />
        </li>
      ))}
    </ul>
  );
};
