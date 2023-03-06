import { useState } from 'react';

import { Menu } from '@headlessui/react';

import { BiSort } from 'react-icons/bi';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';

import styles from './SortingMenu.module.scss';

import { useStateSelector } from '../../../store/hooks';

import {
  IProjectItem,
  projectAsyncActions
} from '../../../store/slices/projectSlice';

import { useAppDispatch } from '../../../store/hooks';

type CompareFunction = (
  projectA: IProjectItem,
  projectB: IProjectItem
) => number;

type SortingMenuItem = {
  label: string;
  sortFunction: () => void;
  icon: JSX.Element;
};

export const SortingMenu: React.FC = () => {
  const [label, setLabel] = useState('сортировка');
  const [icon, setIcon] = useState(<BiSort />);

  const menuItems: SortingMenuItem[] = [
    {
      label: 'по имени',
      sortFunction: sortTitleASC,
      icon: <MdKeyboardArrowUp />
    },
    {
      label: 'по имени',
      sortFunction: sortTitleDESC,
      icon: <MdKeyboardArrowDown />
    },
    {
      label: 'по дате',
      sortFunction: sortDateASC,
      icon: <MdKeyboardArrowUp />
    },
    {
      label: 'по дате',
      sortFunction: sortDateDESC,
      icon: <MdKeyboardArrowDown />
    }
  ];

  const projects = useStateSelector((state) => state.project.items);
  const dispatch = useAppDispatch();

  function updateProjectSequence(projects: IProjectItem[]): IProjectItem[] {
    return projects.map((project, idx) => ({ ...project, sequence: idx }));
  }

  function sortProjects(compareFunction: CompareFunction) {
    const sortedProjects = [...projects].sort(compareFunction);
    const updatedProjects = updateProjectSequence(sortedProjects);

    dispatch(projectAsyncActions.updateProjectSequence(updatedProjects));
  }

  function sortTitleASC() {
    sortProjects((projectA, projectB) =>
      projectA.title.localeCompare(projectB.title)
    );
  }

  function sortTitleDESC() {
    sortProjects((projectA, projectB) =>
      projectB.title.localeCompare(projectA.title)
    );
  }

  function sortDateASC() {
    sortProjects((projectA, projectB) => {
      const dateA: Date = new Date(projectA.dateCreation);
      const dateB: Date = new Date(projectB.dateCreation);

      return dateA.getTime() - dateB.getTime();
    });
  }

  function sortDateDESC() {
    sortProjects((projectA, projectB) => {
      const dateA: Date = new Date(projectA.dateCreation);
      const dateB: Date = new Date(projectB.dateCreation);

      return dateB.getTime() - dateA.getTime();
    });
  }

  return (
    <Menu>
      <div className={styles['dropdown-container']}>
        <Menu.Button className={styles['dropdown-button']}>
          {icon} {label}
        </Menu.Button>

        <Menu.Items className={styles['dropdown-list']}>
          {menuItems.map(({ label, icon, sortFunction }, idx) => (
            <Menu.Item key={idx}>
              {({ active }) => (
                <button
                  className={`${styles['dropdown-item']} ${
                    active && styles['dropdown-item--active']
                  }`}
                  onClick={() => {
                    sortFunction();
                    setLabel(label);
                    setIcon(icon);
                  }}
                >
                  {label} {icon}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </div>
    </Menu>
  );
};
