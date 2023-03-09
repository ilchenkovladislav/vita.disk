import { useEffect, useState } from 'react';

import { TableHeader } from '../components/TableHeader/TableHeader';
import { ProjectList } from '../components/ProjectList/ProjectList';

import { useStateSelector } from 'store/hooks';

import styles from './AdminPanel.module.scss';
import { IProjectItem } from 'store/slices/projectSlice';

export const AdminPanel = () => {
  const projects = useStateSelector((state) => state.project.items);

  const [filterProjects, setFilterProjects] = useState<IProjectItem[]>([]);

  useEffect(() => {
    setFilterProjects(projects);
  }, [projects]);

  function onChangeSearch(searchString: string) {
    setFilterProjects(projects.filter((el) => el.title.includes(searchString)));
  }

  return (
    <div>
      <div className={styles.table}>
        <TableHeader onChangeSearch={onChangeSearch} />
        <ProjectList projects={filterProjects} />
      </div>
    </div>
  );
};
