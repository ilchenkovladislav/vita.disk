import { ProjectItem } from '../../components/ProjectItem/ProjectItem';

import styles from './ProjectList.module.scss';

export const ProjectList = () => {
  return (
    <ul className={styles.body}>
      <button>добавить проект +</button>

      <li className={styles.row}>
        <ProjectItem />
      </li>
    </ul>
  );
};
