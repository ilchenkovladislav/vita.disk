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
  const [editProject, setEditProject] = useState<IProjectItem | null>(null);

  return (
    <>
      <ul className={styles.body}>
        <button
          className={styles.addBtn}
          type="button"
          onClick={() => {
            setIsOpen(true);
            setEditProject(null);
          }}
        >
          добавить проект +
        </button>
        {projects.map((project) => (
          <li className={styles.row} key={project.id}>
            <ProjectItem
              project={project}
              setIsOpen={setIsOpen}
              setEditProject={setEditProject}
            />
          </li>
        ))}
      </ul>

      <ModalAddProject
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        project={editProject}
      />
    </>
  );
};
