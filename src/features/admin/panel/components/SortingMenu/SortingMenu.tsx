import { useState } from 'react';

import { BiSort } from 'react-icons/bi';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';

import { useStateSelector } from 'store/hooks';

import { IProjectItem, projectAsyncActions } from 'store/slices/projectSlice';

import { useAppDispatch } from 'store/hooks';
import { AppMenu, MenuItem } from 'components/ui/AppMenu/AppMenu';

type CompareFunction = (
  projectA: IProjectItem,
  projectB: IProjectItem
) => number;

export const SortingMenu: React.FC = () => {
  const [label, setLabel] = useState('сортировка');
  const [icon, setIcon] = useState(<BiSort />);

  const menuItems: MenuItem[] = [
    {
      label: 'по имени',
      icon: <MdKeyboardArrowUp />,
      cb: (label, icon) => {
        sortTitleASC();
        setLabel(label);
        setIcon(icon);
      }
    },
    {
      label: 'по имени',
      icon: <MdKeyboardArrowDown />,
      cb: (label, icon) => {
        sortTitleDESC();
        setLabel(label);
        setIcon(icon);
      }
    },
    {
      label: 'по дате',
      icon: <MdKeyboardArrowUp />,
      cb: (label, icon) => {
        sortDateASC();
        setLabel(label);
        setIcon(icon);
      }
    },
    {
      label: 'по дате',
      icon: <MdKeyboardArrowDown />,
      cb: (label, icon) => {
        sortDateDESC();
        setLabel(label);
        setIcon(icon);
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

  return <AppMenu btnTitle={`${icon} ${label}`} menuItems={menuItems} />;
};
