import { useParams } from 'react-router-dom';
import { useStateSelector } from 'store/hooks';
import { ImageItem } from '../ImageItem/ImageItem';
import styles from './ImageList.module.scss';

import { useAppDispatch } from 'store/hooks';
import {
  imageAsyncActions,
  ImageItem as IImageItem
} from 'store/slices/imageSlice';

export const ImageList = () => {
  const { userLink, folderLink } = useParams();
  const dispatch = useAppDispatch();

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

  function handleClickLike(img: IImageItem) {
    dispatch(
      imageAsyncActions.updateImage({
        ...img,
        isFavourites: !img.isFavourites
      })
    );
  }

  return (
    <ul className={styles.imageList}>
      {images.map((img) => (
        <ImageItem image={img} handleClickLike={() => handleClickLike(img)} />
      ))}
    </ul>
  );
};
