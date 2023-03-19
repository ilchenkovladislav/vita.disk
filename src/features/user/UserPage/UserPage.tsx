import styles from './UserPage.module.scss';
import { Outlet, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useActionCreators, useStateSelector } from 'store/hooks';
import { useEffect } from 'react';
import { actionsThunk } from 'store/slices/folderSlice';
import { imageAsyncActions } from 'store/slices/imageSlice';
import { Header } from '../components/Header/Header';

export const UserPage = () => {
  const { userLink, folderLink } = useParams();

  const project = useStateSelector((state) =>
    state.project.items.find((project) => project.link === userLink)
  );

  const firstFolderLink = useStateSelector((state) =>
    state.folder.items.find((folder) => folder.projectId === project?.id)
  )?.link;

  const folderStatus = useStateSelector((state) => state.folder.status);
  const actions = useActionCreators(actionsThunk);

  const imagesStatus = useStateSelector((state) => state.image.status);
  const imageActions = useActionCreators(imageAsyncActions);

  useEffect(() => {
    if (folderStatus === 'init') {
      actions.getFolders();
    }

    if (imagesStatus === 'init') {
      imageActions.getImages();
    }
  }, [folderStatus]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!firstFolderLink) return;

    if (!folderLink) {
      navigate(`${firstFolderLink}`);
    }
  }, [location, firstFolderLink]);

  return (
    <div>
      <section className={styles.cover}>
        <p className={styles.dateShooting}>{project?.dateShooting}</p>
        <h1 className={styles.title}>{project?.title}</h1>
      </section>
      <section className={styles.container}>
        <Header projectId={project?.id} />

        <Outlet />
      </section>
    </div>
  );
};
