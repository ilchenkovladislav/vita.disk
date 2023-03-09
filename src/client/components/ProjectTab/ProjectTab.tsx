import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStateSelector } from '../../store/hooks';

import { Outlet } from 'react-router-dom';
import { FolderList } from '../FolderList/FolderList';

export const ProjectTab: React.FC = () => {
  const { projectId } = useParams();

  const folderId = useStateSelector(
    (state) =>
      state.folder.items.find(
        (folder) => Number(folder.projectId) === Number(projectId)
      )?.id
  );

  const navigate = useNavigate();

  useEffect(() => {
    navigate(`folder/${folderId}`);
  }, [folderId]);

  return (
    <>
      <FolderList projectId={Number(projectId)} />
      <Outlet />
    </>
  );
};
