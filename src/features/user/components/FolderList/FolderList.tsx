import { FolderItem as IFolderItem } from 'store/slices/folderSlice';
import { FolderItem } from '../FolderItem/FolderItem';
import styles from './FolderList.module.scss';

interface FolderListProps {
  folders: IFolderItem[];
}

export const FolderList: React.FC<FolderListProps> = ({ folders }) => {
  return (
    <ul className={styles.directories}>
      {folders.map((folder) => (
        <li key={folder.id}>
          <FolderItem folder={folder} />
        </li>
      ))}
    </ul>
  );
};
