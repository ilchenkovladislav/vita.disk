import { Link } from 'react-router-dom';
import { FolderItem as IFolderItem } from 'store/slices/folderSlice';
import styles from './FolderItem.module.scss';

interface FolderItemProps {
  folder: IFolderItem;
}

export const FolderItem: React.FC<FolderItemProps> = ({ folder }) => {
  return (
    <Link to={folder.link} className={styles.link}>
      {folder.title}
    </Link>
  );
};
