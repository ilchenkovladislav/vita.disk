import { useEffect } from 'react';

import { Outlet, useParams } from 'react-router-dom';

import { useStateSelector } from 'store/hooks';
import { useActionCreators } from 'store/hooks';
import { actionsThunk } from 'store/slices/folderSlice';
import { imageAsyncActions } from 'store/slices/imageSlice';

import { CompactProjectList } from '../components/CompactProjectList/CompactProjectList';
import { ProjectHeader } from '../components/ProjectHeader/ProjectHeader';
import { TabList } from '../components/TabList/TabList';
import styles from './ProjectPage.module.scss';

export const ProjectPage = () => {
  const folderStatus = useStateSelector((state) => state.folder.status);
  const actions = useActionCreators(actionsThunk);

  const imagesStatus = useStateSelector((state) => state.image.status);
  const imageActions = useActionCreators(imageAsyncActions);

  const { projectId } = useParams();

  const projects = useStateSelector((state) => state.project.items);
  const project = projects.find(
    (project) => Number(project.id) === Number(projectId)
  );

  useEffect(() => {
    if (folderStatus === 'init') {
      actions.getFolders();
    }

    if (imagesStatus === 'init') {
      imageActions.getImages();
    }
  }, [folderStatus]);

  return (
    <div className={styles.page}>
      <CompactProjectList />
      <div>
        <ProjectHeader project={project!} />
        <TabList />
        <Outlet />
      </div>
    </div>
  );
};
