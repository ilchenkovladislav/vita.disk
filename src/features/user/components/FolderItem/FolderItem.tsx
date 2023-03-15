import { Link } from 'react-router-dom';
import { FolderItem as IFolderItem } from 'store/slices/folderSlice';

interface FolderItemProps {
  folder: IFolderItem;
}

export const FolderItem: React.FC<FolderItemProps> = ({ folder }) => {
  return <Link to={folder.link}>{folder.title}</Link>;
};
