import { TableHeader } from '../../components/TableHeader/TableHeader';
import { ProjectList } from '../../components/ProjectList/ProjectList';

import styles from './AdminPanel.module.scss';

export const AdminPanel = () => {
  return (
    <div>
      {/* таблица */}
      <div className={styles.table}>
        {/* header таблицы */}
        <TableHeader />
        {/* тело таблицы */}
        <ProjectList />
      </div>
    </div>
  );
};
