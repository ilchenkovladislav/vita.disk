import { BsEye } from 'react-icons/bs';

import styles from '../../../admin/project/components/FolderMenu/FolderMenu.module.scss';
import { useStateSelector } from 'store/hooks';

import { Menu } from '@headlessui/react';
import { actionsThunk } from 'store/slices/folderSlice';
import { projectAsyncActions } from 'store/slices/projectSlice';
import { imageAsyncActions } from 'store/slices/imageSlice';
import { useActionCreators } from 'store/hooks';
import { useParams } from 'react-router-dom';

interface DownloadMenuProps {
  projectId: number | undefined;
}

export const DownloadMenu: React.FC<DownloadMenuProps> = ({ projectId }) => {
  const { folderLink } = useParams();

  const actions = useActionCreators(actionsThunk);
  const projectActions = useActionCreators(projectAsyncActions);
  const imageActions = useActionCreators(imageAsyncActions);

  const folder = useStateSelector((state) =>
    state.folder.items.find(
      (folder) =>
        folder.link === folderLink &&
        Number(folder.projectId) === Number(projectId)
    )
  );

  const images = useStateSelector((state) =>
    state.image.items.filter(
      (img) => Number(img.folderId) === Number(folder?.id)
    )
  );

  function handleDownloadProjectClick() {
    projectActions.downloadProjectZip({ projectId });
  }

  function handleDownloadFolderClick() {
    actions.downloadFolderZip({ projectId, folderId: folder?.id });
  }

  function handleDownloadFavouriteClick() {
    const favouritesImageTitles = images
      .filter((img) => Number(img.isFavourites))
      .map((img) => img.title);

    imageActions.downloadFavouritesZip({
      favouritesImageTitles,
      projectId,
      folderId: folder?.id
    });
  }

  const numberFavourite = 1;
  const numberFolders = 2;

  return (
    <Menu>
      <div className={styles.container}>
        <Menu.Button className={styles.btn}>Скачать</Menu.Button>

        <Menu.Items className={styles.list}>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${styles.item} ${active && styles.itemActive}`}
                onClick={handleDownloadProjectClick}
              >
                <BsEye /> скачать весь проект
              </button>
            )}
          </Menu.Item>
          {numberFolders > 1 ? (
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${styles.item} ${active && styles.itemActive}`}
                  onClick={handleDownloadFolderClick}
                >
                  <BsEye /> скачать текущую папку
                </button>
              )}
            </Menu.Item>
          ) : null}
          {numberFavourite ? (
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${styles.item} ${active && styles.itemActive}`}
                  onClick={handleDownloadFavouriteClick}
                >
                  <BsEye /> скачать избранные фото
                </button>
              )}
            </Menu.Item>
          ) : null}
        </Menu.Items>
      </div>
    </Menu>
  );
};
