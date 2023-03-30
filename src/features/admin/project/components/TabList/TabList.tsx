import { NavLink } from 'react-router-dom';

import { BsFolder } from 'react-icons/bs';
import { AiOutlineHeart, AiOutlineSetting } from 'react-icons/ai';
import { CgImage } from 'react-icons/cg';

import styles from './TabList.module.scss';

const tabItems = [
  {
    title: 'проект',
    icon: <BsFolder />,
    link: 'folder'
  },
  {
    title: 'избранное',
    icon: <AiOutlineHeart />,
    link: 'favourites'
  },
  {
    title: 'дизайн и обложка',
    icon: <CgImage />,
    link: 'design'
  },
  {
    title: 'настройка',
    icon: <AiOutlineSetting />,
    link: 'settings'
  }
];

export const TabList = () => {
  return (
    <div>
      <ul className={styles.tabs}>
        {tabItems.map(({ link, icon, title }, idx) => (
          <li key={idx}>
            <NavLink
              to={`./${link}`}
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              {icon}
              {title}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
