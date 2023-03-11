import { MdOutlineContentCopy } from 'react-icons/md';
import { BsDownload, BsEye, BsPencil, BsTrash } from 'react-icons/bs';

import styles from './FolderMenu.module.scss';
import { useStateSelector } from 'store/hooks';

import { Menu } from '@headlessui/react';
import { BASE_URL } from '../../../../../config';

interface FolderMenuProps {
  id: number;
}

export const FolderMenu: React.FC<FolderMenuProps> = ({ id }) => {
  const currentFolder = useStateSelector((state) =>
    state.folder.items.find((folder) => folder.id === id)
  );

  const currentProject = useStateSelector((state) =>
    state.project.items.find(
      (project) => project.id === currentFolder?.projectId
    )
  );

  const folderURL = `${BASE_URL}/${currentProject?.link}/${currentFolder?.link}`;

  function handleEditClick() {
    console.log(`Editing`);
  }

  function handleCopyClick() {
    navigator.clipboard.writeText(folderURL);
  }

  function handleDownloadClick() {
    console.log(`Downloading files from`);
  }

  function handleDeleteClick() {
    console.log(`Deleting`);
  }

  return (
    <Menu>
      <div className={styles.container}>
        <Menu.Button className={styles.btn}>:</Menu.Button>

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
