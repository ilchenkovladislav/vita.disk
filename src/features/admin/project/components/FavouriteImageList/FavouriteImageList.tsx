import { useParams } from 'react-router-dom';
import { useStateSelector } from 'store/hooks';

import styles from './FavouriteImageList.module.scss';

import { useActionCreators } from 'store/hooks';
import { imageAsyncActions } from 'store/slices/imageSlice';
import { useEffect, useState } from 'react';

export const FavouriteImageList = () => {
  const { projectId, folderId } = useParams();
  const actions = useActionCreators(imageAsyncActions);

  const images = useStateSelector((state) =>
    state.image.items.filter(
      (image) =>
        Number(image.folderId) === Number(folderId) &&
        Number(image.isFavourites)
    )
  );

  const [selectedImages, setSelectedImages] = useState<number[]>([]);

  useEffect(() => {
    setSelectedImages([]);
  }, [folderId]);

  function handleCheckboxClick(
    e: React.FormEvent<HTMLInputElement>,
    imageId: number
  ) {
    if (e.currentTarget.checked) {
      setSelectedImages((prev) => [...prev, imageId]);
    } else {
      const idx = selectedImages.findIndex((id) => id === imageId);

      setSelectedImages((prev) => [
        ...prev.slice(0, idx),
        ...prev.slice(idx + 1)
      ]);
    }
  }

  function handleDeleteClick(id: number) {
    actions.deleteImage(id);
  }

  function handleSelectAll() {
    setSelectedImages(images.map((el) => el.id));
  }

  function handleDeselectAll() {
    setSelectedImages([]);
  }

  function handleDeleteAll() {
    for (const selectedImage of selectedImages) {
      actions.deleteImage(selectedImage);
    }

    setSelectedImages([]);
  }

  return (
    <>
      <ul className={styles.images}>
        {images.map((image) => (
          <li
            className={
              selectedImages.includes(image.id)
                ? styles.itemSelected
                : styles.item
            }
            key={image.id}
          >
            <img className={styles.img} src={image.path} alt="" />
            <div className={styles.control}>
              <a href={image.path} download>
                скачать
              </a>
              <button>скопировать ссылку</button>
              <button onClick={() => handleDeleteClick(image.id)}>
                удалить
              </button>
            </div>
            <div className={styles.downloads}>
              {image.numberDownloads} раз скачали
            </div>
            <input
              className={styles.check}
              onChange={(e) => handleCheckboxClick(e, image.id)}
              type="checkbox"
              checked={selectedImages.includes(image.id)}
              name=""
              id=""
            />
          </li>
        ))}
      </ul>
      <div className={selectedImages.length ? '' : styles.pop}>
        <button onClick={handleDeleteAll}>удалить выбранное</button>
        <button onClick={handleSelectAll}>выделить всё</button>
        <button onClick={handleDeselectAll}>снять выделение</button>
      </div>
    </>
  );
};
