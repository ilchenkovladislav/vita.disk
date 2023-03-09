import { Menu } from '@headlessui/react';

import styles from './AppMenu.module.scss';

export interface MenuItem {
  label: string;
  icon: JSX.Element;
  cb: (label: string, icon: JSX.Element) => void;
}

interface MenuProps {
  btnTitle: string | JSX.Element;
  menuItems: MenuItem[];
}

export const AppMenu: React.FC<MenuProps> = ({ btnTitle, menuItems }) => {
  return (
    <Menu>
      <div className={styles['dropdown-container']}>
        <Menu.Button className={styles['dropdown-button']}>
          {btnTitle}
        </Menu.Button>

        <Menu.Items className={styles['dropdown-list']}>
          {menuItems.map(({ label, icon, cb }, idx) => (
            <Menu.Item key={idx}>
              {({ active }) => (
                <button
                  className={`${styles['dropdown-item']} ${
                    active && styles['dropdown-item--active']
                  }`}
                  onClick={() => {
                    cb(label, icon);
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
