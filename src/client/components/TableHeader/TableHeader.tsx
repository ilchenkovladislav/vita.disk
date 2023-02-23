import { FaArrowsAlt } from 'react-icons/fa';
import { BiSort } from 'react-icons/bi';

import styles from './TableHeader.module.scss';

export const TableHeader = () => {
  return (
    <div className={styles.header}>
      <FaArrowsAlt />
      <input
        className={styles.search}
        type="search"
        placeholder="название проекта"
      />
      <p>дата съемки</p>
      <p>ссылка на диск</p>
      <div className={styles.sort}>
        <BiSort /> сортировка
      </div>
    </div>
  );
};
