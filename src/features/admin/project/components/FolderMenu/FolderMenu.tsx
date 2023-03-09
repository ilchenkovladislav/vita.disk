import { MdKeyboardArrowUp } from 'react-icons/md';

import { AppMenu } from 'components/ui/AppMenu/AppMenu';
import { MenuItem } from 'components/ui/AppMenu/AppMenu';

const folderMenuItems: MenuItem[] = [
  {
    label: 'Первый',
    icon: <MdKeyboardArrowUp />,
    cb(label, icon) {
      console.log('Первый');
    }
  },
  {
    label: 'Второй',
    icon: <MdKeyboardArrowUp />,
    cb(label, icon) {
      console.log('Второй');
    }
  }
];

export const FolderMenu = () => {
  return <AppMenu btnTitle=":" menuItems={folderMenuItems} />;
};
