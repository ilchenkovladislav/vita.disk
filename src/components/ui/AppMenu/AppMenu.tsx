import { Menu } from '@headlessui/react';

import styles from './AppMenu.module.scss';

export interface MenuItem {
  label: string;
  icon: JSX.Element;
  cb: (label: string, icon: JSX.Element) => void;
}

interface MenuProps {
  btnTitle?: string;
  btnIcon?: JSX.Element;
  btnStyle: string;
  containerStyle: string;
  menuItems: MenuItem[];
}

export const AppMenu: React.FC<MenuProps> = ({
  btnTitle,
  btnIcon,
  btnStyle,
  containerStyle,
  menuItems
}) => {
  return (
    <Menu>
      <div className={containerStyle}>
        <Menu.Button className={btnStyle}>
          {btnIcon} {btnTitle}
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
