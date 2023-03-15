import { Link } from 'react-router-dom';

import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { MdOutlineContentCopy } from 'react-icons/md';

import styles from './ProjectHeader.module.scss';
import { IProjectItem } from 'store/slices/projectSlice';
import { baseClientUrl } from '../../../../../config';

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
        href={`${baseClientUrl}/page/${project?.link}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        посмотреть на сайте
      </a>
    </div>
  );
};
