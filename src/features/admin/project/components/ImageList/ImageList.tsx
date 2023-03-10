import { useParams } from 'react-router-dom';
import { useStateSelector } from 'store/hooks';

import styles from './ImageList.module.scss';
import { ImageUploader } from 'features/admin/project/components/ImageUploader/ImageUploader';

import { useActionCreators } from 'store/hooks';
import { imageAsyncActions } from 'store/slices/imageSlice';
import { useEffect, useState } from 'react';

export const ImageList = () => {
  const { projectId, folderId } = useParams();
  const actions = useActionCreators(imageAsyncActions);

  const images = useStateSelector((state) =>
    state.image.items.filter(
      (image) => Number(image.folderId) === Number(folderId)
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
        <li>
          {
            <ImageUploader
              projectId={Number(projectId)}
              folderId={Number(folderId)}
            />
          }
        </li>
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
                ??????????????
              </a>
              <button>?????????????????????? ????????????</button>
              <button onClick={() => handleDeleteClick(image.id)}>
                ??????????????
              </button>
            </div>
            <div className={styles.downloads}>
              {image.numberDownloads} ?????? ??????????????
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
        <button onClick={handleDeleteAll}>?????????????? ??????????????????</button>
        <button onClick={handleSelectAll}>???????????????? ??????</button>
        <button onClick={handleDeselectAll}>?????????? ??????????????????</button>
      </div>
    </>
  );
};
