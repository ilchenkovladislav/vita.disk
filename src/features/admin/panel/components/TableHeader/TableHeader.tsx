import { useState } from 'react';

import { SortingMenu } from '../SortingMenu/SortingMenu';

import styles from './TableHeader.module.scss';

type TableHeaderProps = {
  onChangeSearch: (searchString: string) => void;
};

export const TableHeader: React.FC<TableHeaderProps> = ({ onChangeSearch }) => {
  const [searchString, setSearchString] = useState('');

  function inputHandler(e: React.FormEvent<HTMLInputElement>) {
    setSearchString(e.currentTarget.value);
    onChangeSearch(e.currentTarget.value);
  }

  return (
    <div className={styles.header}>
      <input
        className={styles.search}
        type="search"
        placeholder="название проекта"
        onChange={inputHandler}
        value={searchString}
      />
      <p>дата съемки</p>
      <p>ссылка на диск</p>

      <SortingMenu />
    </div>
  );
};
