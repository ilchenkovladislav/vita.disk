import { Link } from 'react-router-dom';

import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { MdOutlineContentCopy } from 'react-icons/md';

import styles from './ProjectHeader.module.scss';
import { IProjectItem } from '../../store/slices/projectSlice';

interface ProjectHeaderProps {
  project: IProjectItem;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({ project }) => {
  return (
    <div className={styles.header}>
      <Link to="/">
        <HiOutlineArrowNarrowLeft />
      </Link>
      <h1>{project?.title}</h1>
      <button>
        <MdOutlineContentCopy />
        копировать ссылку
      </button>
      <a
        href={`https://ou7g5wq1c17j.wfolio.pro/disk/${project?.link}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        посмотреть на сайте
      </a>
    </div>
  );
};
