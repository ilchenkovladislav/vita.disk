import { Switch } from '@headlessui/react';

import styles from './Toggle.module.scss';

type ToggleProps = {
  onChange: React.Dispatch<React.SetStateAction<boolean>>;
  checked: boolean;
  label: string;
};

export const Toggle: React.FunctionComponent<ToggleProps> = ({
  onChange,
  checked,
  label
}) => {
  return (
    <Switch.Group>
      <div className={styles.toggleGroup}>
        <Switch
          checked={checked}
          onChange={onChange}
          className={checked ? styles.toggleOn : styles.toggleOff}
        >
          <span className={styles.toggleRound} />
        </Switch>
        <Switch.Label>{label}</Switch.Label>
      </div>
    </Switch.Group>
  );
};
