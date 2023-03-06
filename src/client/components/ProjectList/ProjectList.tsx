import { ProjectItem } from '../../components/ProjectItem/ProjectItem';
import { IProjectItem } from '../../store/slices/projectSlice';
import { DialogFormAdding } from '../ui/DialogFormAdding/DialogFormAdding';

import styles from './ProjectList.module.scss';

type ProjectListProps = {
  projects: IProjectItem[];
};

export const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <ul className={styles.body}>
      <DialogFormAdding />
      {projects.map((project) => (
        <li className={styles.row} key={project.id}>
          <ProjectItem project={project} />
        </li>
      ))}
    </ul>
  );
};
