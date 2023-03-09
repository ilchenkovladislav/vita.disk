import { MdOutlineContentCopy } from 'react-icons/md';
import { BsEye, BsPencil, BsDownload, BsTrash } from 'react-icons/bs';

import { AppMenu } from 'components/ui/AppMenu/AppMenu';
import { MenuItem } from 'components/ui/AppMenu/AppMenu';

import styles from './FolderMenu.module.scss';

const folderMenuItems: MenuItem[] = [
  {
    label: 'Посмотреть на сайте',
    icon: <BsEye />,
    cb: handleViewClick
  },
  {
    label: 'Редактировать',
    icon: <BsPencil />,
    cb: handleEditClick
  },
  {
    label: 'Скопировать ссылку',
    icon: <MdOutlineContentCopy />,
    cb: handleCopyClick
  },
  {
    label: 'Скачать файлы',
    icon: <BsDownload />,
    cb: handleDownloadClick
  },
  {
    label: 'Удалить папку',
    icon: <BsTrash />,
    cb: handleDeleteClick
  }
];

interface FolderMenuProps {
  id: number;
}

export const FolderMenu: React.FC<FolderMenuProps> = ({ id }) => {
  return (
    <AppMenu
      btnTitle=":"
      menuItems={folderMenuItems}
      btnStyle={styles.btn}
      containerStyle={styles.container}
    />
  );
};

function handleViewClick() {
  console.log(`Viewing on the site`);
}

function handleEditClick() {
  console.log(`Editing`);
}

function handleCopyClick() {
  console.log(`Copying link to`);
}

function handleDownloadClick() {
  console.log(`Downloading files from`);
}

function handleDeleteClick() {
  console.log(`Deleting`);
}
