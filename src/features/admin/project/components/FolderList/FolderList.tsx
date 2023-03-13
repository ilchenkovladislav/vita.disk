import { Link } from 'react-router-dom';

import { useStateSelector } from 'store/hooks';
import { FolderMenu } from '../FolderMenu/FolderMenu';

import styles from './FolderList.module.scss';
import { ModalAddFolder } from 'features/admin/project/components/ModalAddFolder/ModalAddFolder';
import { useState } from 'react';

interface FolderListProps {
  projectId: number;
}

export const FolderList: React.FC<FolderListProps> = ({ projectId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const folders = useStateSelector((state) =>
    state.folder.items.filter(
      (folder) => Number(folder.projectId) === Number(projectId)
    )
  );

  return (
    <>
      <ul className={styles.folderList}>
        {folders.map(({ id, title }) => (
          <li className={styles.folderItem} key={id}>
            <Link to={`./folder/${id}`}>
              <h4>{title}</h4>
              <p>47 фото</p>
            </Link>
            <FolderMenu projectId={projectId} folderId={id} />
          </li>
        ))}
        <li>
          <button
            className={styles.addBtn}
            type="button"
            onClick={() => setIsOpen(true)}
          >
            + добавить папку
          </button>
        </li>
      </ul>

      <ModalAddFolder
        projectId={projectId}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
};
