import { MdOutlineContentCopy, MdOutlineMoreVert } from 'react-icons/md';
import { BsDownload, BsEye, BsPencil, BsTrash } from 'react-icons/bs';

import styles from './FolderMenu.module.scss';
import { useStateSelector } from 'store/hooks';

import { Menu } from '@headlessui/react';
import { BASE_URL } from '../../../../../config';
import { actionsThunk, FolderItem } from 'store/slices/folderSlice';
import { useActionCreators } from 'store/hooks';

interface FolderMenuProps {
  projectId: number;
  folderId: number;
  setEditFolder: React.Dispatch<React.SetStateAction<FolderItem | null>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FolderMenu: React.FC<FolderMenuProps> = ({
  projectId,
  folderId,
  setEditFolder,
  setIsOpen
}) => {
  const actions = useActionCreators(actionsThunk);

  const currentFolder = useStateSelector((state) =>
    state.folder.items.find((folder) => folder.id === folderId)
  );

  const currentProject = useStateSelector((state) =>
    state.project.items.find(
      (project) => project.id === currentFolder?.projectId
    )
  );

  const folderURL = `${BASE_URL}/${currentProject?.link}/${currentFolder?.link}`;

  function handleEditClick() {
    setIsOpen(true);
    currentFolder ? setEditFolder(currentFolder) : setEditFolder(null);
  }

  function handleCopyClick() {
    navigator.clipboard.writeText(folderURL);
  }

  function handleDownloadClick() {
    actions.downloadFolderZip({ projectId, folderId });
  }

  function handleDeleteClick() {
    actions.deleteFolder(folderId);
  }

  return (
    <Menu>
      <div className={styles.container}>
        <Menu.Button className={styles.btn}>
          <MdOutlineMoreVert />
        </Menu.Button>

        <Menu.Items className={styles.list}>
          <Menu.Item>
            {({ active }) => (
              <a
                className={`${styles.item} ${active && styles.itemActive}`}
                href={folderURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsEye /> Посмотреть на сайте
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${styles.item} ${active && styles.itemActive}`}
                onClick={handleEditClick}
              >
                <BsPencil /> Редактировать
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${styles.item} ${active && styles.itemActive}`}
                onClick={handleCopyClick}
              >
                <MdOutlineContentCopy /> Скопировать ссылку
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${styles.item} ${active && styles.itemActive}`}
                onClick={handleDownloadClick}
              >
                <BsDownload /> Скачать файлы
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${styles.item} ${active && styles.itemActive}`}
                onClick={handleDeleteClick}
              >
                <BsTrash /> Удалить папку
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </div>
    </Menu>
  );
};
