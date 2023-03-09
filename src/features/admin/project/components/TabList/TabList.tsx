import { Link } from 'react-router-dom';

import { BsFolder } from 'react-icons/bs';

import styles from './TabList.module.scss';

const tabItems = [
  {
    title: 'проект',
    icon: <BsFolder />,
    link: './'
  },
  {
    title: 'избранное',
    icon: <BsFolder />,
    link: 'favourites'
  },
  {
    title: 'дизайн и обложка',
    icon: <BsFolder />,
    link: 'design'
  },
  {
    title: 'настройка',
    icon: <BsFolder />,
    link: 'settings'
  }
];

export const TabList = () => {
  return (
    <div>
      <ul className={styles.tabs}>
        {tabItems.map(({ link, icon, title }, idx) => (
          <li className={styles.current} key={idx}>
            <Link to={`./${link}`}>
              {icon}
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
