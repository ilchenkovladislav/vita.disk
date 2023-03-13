import { Link } from 'react-router-dom';

import { MdOutlineContentCopy } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsDot } from 'react-icons/bs';
import { FaArrowsAltV } from 'react-icons/fa';

import { useActionCreators } from 'store/hooks';
import { projectAsyncActions } from 'store/slices/projectSlice';
import { IProjectItem } from 'store/slices/projectSlice';
import styles from './ProjectItem.module.scss';

interface ProjectItemProps {
  project: IProjectItem;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditProject: React.Dispatch<React.SetStateAction<IProjectItem | null>>;
}

export const ProjectItem: React.FC<ProjectItemProps> = ({
  project,
  setIsOpen,
  setEditProject
}) => {
  const { id, title, link, dateCreation, dateShooting, cover, numberImages } =
    project;
  const asyncActions = useActionCreators(projectAsyncActions);
  const href = `https://ou7g5wq1c17j.wfolio.pro/disk/${link}`;

  function onDeleteProject() {
    asyncActions.deleteProject(id);
  }

  return (
    <>
      <FaArrowsAltV />
      <div className={styles.project}>
        <Link to={`/project/${id}`} className={styles.imgLink}>
          <img className={styles.projectImg} src={cover} alt="" />
        </Link>
        <Link to={`/project/${id}`} className={styles.titleLink}>
          <h3 className={styles.projectTitle}>{title}</h3>
        </Link>
        <p className={styles.projectDateCreate}>
          {transformDateToLocale(dateCreation)}
        </p>
        <BsDot className={styles.projectDot} />
        <p className={styles.projectFiles}>{numberImages} фото</p>
      </div>
      <p>{transformDateToLocale(dateShooting)}</p>
      <p>
        <a href={href} target="_blank" rel="noopener noreferrer">
          {`/${link}`}
        </a>
      </p>
      <div className={styles.buttons}>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(href);
          }}
        >
          <MdOutlineContentCopy />
        </button>
        <button
          type="button"
          onClick={() => {
            setIsOpen(true);
            setEditProject(project);
          }}
        >
          <FiSettings />
        </button>
        <button type="button" onClick={onDeleteProject}>
          <AiOutlineDelete />
        </button>
      </div>
    </>
  );
};

function transformDateToLocale(date: string | undefined) {
  if (!date) return null;

  return new Date(date).toLocaleDateString();
}
