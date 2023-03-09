import { Link } from 'react-router-dom';

import { BsFolder } from 'react-icons/bs';

import { useStateSelector } from 'store/hooks';

import styles from './CompactProjectList.module.scss';

export const CompactProjectList = () => {
  const projects = useStateSelector((state) => state.project.items);

  return (
    <ul className={styles.folders}>
      {projects.map(({ id, title, numberImages }) => (
        <li key={id}>
          <Link to={`/project/${id}`} className={styles.link}>
            <div className={styles.folder}>
              <BsFolder />
              <div>
                <h3>{title}</h3>
                <p>{numberImages} фото</p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
