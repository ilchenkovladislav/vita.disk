import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import { useStateSelector } from 'store/hooks';
import { MdContentCopy, MdOutlineFileDownload } from 'react-icons/md';
import { AiOutlineDelete } from 'react-icons/ai';

import styles from './ImageList.module.scss';

import { useActionCreators } from 'store/hooks';
import { imageAsyncActions, ImageItem } from 'store/slices/imageSlice';
import { useEffect, useState } from 'react';

import { ImageUploader } from '../ImageUploader/ImageUploader';

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

  function onDragEnd(result: any) {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      let copyImages: ImageItem[] = structuredClone(images);

      const remoteProject = copyImages.splice(source.index, 1)[0];
      copyImages.splice(destination.index, 0, remoteProject);
      copyImages.forEach((image, idx) => (image.sequence = idx));

      actions.updateImageSequence(copyImages);
    }
  }

  return (
    <div>
      <ImageUploader
        projectId={Number(projectId)}
        folderId={Number(folderId)}
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId={new Date().getMilliseconds().toString()}
          direction={'horizontal'}
        >
          {(provided) => (
            <ul
              className={styles.images}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {images.map((image, idx) => (
                <Draggable
                  draggableId={image.id.toString()}
                  key={image.id}
                  index={idx}
                >
                  {(provided) => (
                    <li
                      className={
                        selectedImages.includes(image.id)
                          ? styles.itemSelected
                          : styles.item
                      }
                      key={image.id}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    >
                      <img className={styles.img} src={image.path} alt="" />
                      <p className={styles.title}>{image.title}</p>
                      <div className={styles.control}>
                        <a
                          className={styles.controlBtn}
                          href={image.path}
                          download
                        >
                          <MdOutlineFileDownload />
                        </a>
                        <button className={styles.controlBtn}>
                          <MdContentCopy />
                        </button>
                        <button
                          className={styles.controlBtn}
                          onClick={() => handleDeleteClick(image.id)}
                        >
                          <AiOutlineDelete />
                        </button>
                      </div>
                      {image.numberDownloads ? (
                        <div className={styles.downloads}>
                          {image.numberDownloads} <MdOutlineFileDownload />
                        </div>
                      ) : null}
                      <input
                        className={styles.check}
                        onChange={(e) => handleCheckboxClick(e, image.id)}
                        type="checkbox"
                        checked={selectedImages.includes(image.id)}
                        name=""
                        id=""
                      />
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
        <div className={selectedImages.length ? styles.show : styles.hide}>
          <button className={styles.selectedAction} onClick={handleSelectAll}>
            выделить всё
          </button>
          <button className={styles.selectedAction} onClick={handleDeselectAll}>
            снять выделение
          </button>
          <button className={styles.selectedAction} onClick={handleDeleteAll}>
            удалить выбранное
          </button>
        </div>
      </DragDropContext>
    </div>
  );
};
