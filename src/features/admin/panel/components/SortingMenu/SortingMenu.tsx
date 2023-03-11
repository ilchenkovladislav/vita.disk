import { useState } from 'react';

import { BiSort } from 'react-icons/bi';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';

import { useStateSelector } from 'store/hooks';

import { IProjectItem, projectAsyncActions } from 'store/slices/projectSlice';

import { useAppDispatch } from 'store/hooks';
import { Menu } from '@headlessui/react';

import styles from './SortingMenu.module.scss';

type CompareFunction = (
  projectA: IProjectItem,
  projectB: IProjectItem
) => number;

interface SortingMenuItem {
  label: string;
  icon: JSX.Element;
  functionSort: () => void;
}

export const SortingMenu: React.FC = () => {
  const [label, setLabel] = useState('сортировка');
  const [icon, setIcon] = useState(<BiSort />);

  const menuItems: SortingMenuItem[] = [
    {
      label: 'по имени',
      icon: <MdKeyboardArrowUp />,
      functionSort: () => {
        sortTitleASC();
      }
    },
    {
      label: 'по имени',
      icon: <MdKeyboardArrowDown />,
      functionSort: () => {
        sortTitleDESC();
      }
    },
    {
      label: 'по дате',
      icon: <MdKeyboardArrowUp />,
      functionSort: () => {
        sortDateASC();
      }
    },
    {
      label: 'по дате',
      icon: <MdKeyboardArrowDown />,
      functionSort: () => {
        sortDateDESC();
      }
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
      <div className={styles.container}>
        <Menu.Button className={styles.btn}>
          {icon} {label}
        </Menu.Button>

        <Menu.Items className={styles.list}>
          {menuItems.map(({ label, icon, functionSort }, idx) => (
            <Menu.Item key={idx}>
              {({ active }) => (
                <button
                  className={`${styles.item} ${active && styles.itemActive}`}
                  onClick={() => {
                    functionSort();
                    setLabel(label);
                    setIcon(icon);
                  }}
                >
                  {icon} {label}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </div>
    </Menu>
  );
};
