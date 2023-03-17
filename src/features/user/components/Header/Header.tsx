import { useStateSelector } from 'store/hooks';
import { FolderList } from '../FolderList/FolderList';
import styles from './Header.module.scss';

import { DownloadMenu } from '../DownloadMenu/DownloadMenu';

interface HeaderProps {
  projectId: number | undefined;
}

export const Header: React.FC<HeaderProps> = ({ projectId }) => {
  const folders = useStateSelector((state) =>
    state.folder.items.filter(
      (folder) => Number(folder.projectId) === Number(projectId)
    )
  );

  return (
    <div className={styles.menu}>
      <FolderList folders={folders} />

      <DownloadMenu projectId={projectId} />
    </div>
  );
};
