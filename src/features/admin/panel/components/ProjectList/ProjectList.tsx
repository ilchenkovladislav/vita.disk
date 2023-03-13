import { ProjectItem } from '../ProjectItem/ProjectItem';
import { IProjectItem } from 'store/slices/projectSlice';
import { ModalAddProject } from 'components/ui/ModalAddProject/ModalAddProject';

import styles from './ProjectList.module.scss';
import { useState } from 'react';

type ProjectListProps = {
  projects: IProjectItem[];
};

export const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ul className={styles.body}>
        <button
          className={styles.addBtn}
          type="button"
          onClick={() => setIsOpen(true)}
        >
          добавить проект +
        </button>
        {projects.map((project) => (
          <li className={styles.row} key={project.id}>
            <ProjectItem project={project} />
          </li>
        ))}
      </ul>

      <ModalAddProject isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
