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
      <Link to="/" className={styles.backLink}>
        <HiOutlineArrowNarrowLeft />
      </Link>
      <h1>{project?.title}</h1>
      <button className={styles.copy}>
        <MdOutlineContentCopy />
        скопировать ссылку
      </button>
      <a
        className={styles.site}
        href={`${baseClientUrl}/page/${project?.link}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        посмотреть на сайте
      </a>
    </div>
  );
};
