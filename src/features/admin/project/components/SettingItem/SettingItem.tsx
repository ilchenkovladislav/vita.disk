import React, { useContext } from 'react';
import styles from './SettingItem.module.scss';
import { DesignContext } from '../Design/Design';

interface SettingItemProps {
  setting: { img: string; value: string; label: string };
  name: string;
}

export const SettingItem: React.FC<SettingItemProps> = (props) => {
  const { setting, name } = props;
  const { settings, handleInputChange } = useContext(DesignContext);

  return (
    <label className={styles.label}>
      <div className={styles.any}>
        <img src={setting.img} alt="" />
        <input
          type="radio"
          name={name}
          value={setting.value}
          //@ts-ignore
          checked={settings[name] === setting.value}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          className={styles.radio}
        />
      </div>
      <p className={styles.title}>{setting.label}</p>
    </label>
  );
};
