import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStateSelector } from 'store/hooks';

import { Outlet } from 'react-router-dom';
import { FolderList } from '../FolderList/FolderList';
import { ImageUploader } from '../ImageUploader/ImageUploader';

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
    <div>
      <FolderList projectId={Number(projectId)} />
      <ImageUploader
        projectId={Number(projectId)}
        folderId={Number(folderId)}
      />
      <Outlet />
    </div>
  );
};
