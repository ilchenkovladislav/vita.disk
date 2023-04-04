import { Setting } from '../Design/Design';
import { Fieldset } from '../Design/Design';
import { SettingList } from '../SettingList/SettingList';
import styles from './FieldsetItem.module.scss';

interface FieldsetItemProps {
  fieldset: Fieldset;
  settings: Setting[];
}

export const FieldsetItem: React.FC<FieldsetItemProps> = (props) => {
  const { fieldset, settings } = props;

  return (
    <fieldset className={styles.fieldset}>
      <legend>{fieldset.title}</legend>

      <div className={styles.wrapper}>
        <SettingList settings={settings} fieldset={fieldset} />
      </div>
    </fieldset>
  );
};
