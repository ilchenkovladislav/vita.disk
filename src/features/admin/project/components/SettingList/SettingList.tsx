import React from 'react';
import { Setting } from '../Design/Design';
import { Fieldset } from '../Design/Design';
import { SettingItem } from '../SettingItem/SettingItem';

interface SettingListProps {
  settings: Setting[];
  fieldset: Fieldset;
}

export const SettingList: React.FC<SettingListProps> = ({
  settings,
  fieldset
}) => {
  return (
    <>
      {settings.map((setting) => (
        <SettingItem
          name={fieldset.name}
          setting={setting}
          key={setting.label}
        />
      ))}
    </>
  );
};
