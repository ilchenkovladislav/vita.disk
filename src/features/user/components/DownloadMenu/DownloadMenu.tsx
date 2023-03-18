import { BsDownload } from 'react-icons/bs';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { AiOutlineHeart } from 'react-icons/ai';

import {
  HiOutlineFolderDownload,
  HiOutlineDocumentDownload
} from 'react-icons/hi';

import styles from './DownloadMenu.module.scss';
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

  const numberFolders = useStateSelector((state) =>
    state.folder.items.filter((folder) => folder.projectId === projectId)
  ).length;

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

  const hasFavouriteImg = images.find((img) => img.isFavourites);

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

  return (
    <Menu>
      <div className={styles.container}>
        <Menu.Button className={styles.btn}>
          скачать <MdKeyboardArrowDown />
        </Menu.Button>

        <Menu.Items className={styles.list}>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${styles.item} ${active && styles.itemActive}`}
                onClick={handleDownloadProjectClick}
              >
                <HiOutlineDocumentDownload /> скачать весь проект
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
                  <HiOutlineFolderDownload /> скачать текущую папку
                </button>
              )}
            </Menu.Item>
          ) : null}
          {hasFavouriteImg ? (
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${styles.item} ${active && styles.itemActive}`}
                  onClick={handleDownloadFavouriteClick}
                >
                  <AiOutlineHeart /> скачать избранные фото
                </button>
              )}
            </Menu.Item>
          ) : null}
        </Menu.Items>
      </div>
    </Menu>
  );
};
