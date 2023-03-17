import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';

import { useStateSelector, useAppDispatch } from 'store/hooks';
import { FolderMenu } from '../FolderMenu/FolderMenu';

import styles from './FolderList.module.scss';
import { ModalAddFolder } from 'features/admin/project/components/ModalAddFolder/ModalAddFolder';
import { useState } from 'react';
import { FolderItem, actionsThunk } from 'store/slices/folderSlice';

interface FolderListProps {
  projectId: number;
}

export const FolderList: React.FC<FolderListProps> = ({ projectId }) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [editFolder, setEditFolder] = useState<FolderItem | null>(null);

  const folders = useStateSelector((state) =>
    state.folder.items.filter(
      (folder) => Number(folder.projectId) === Number(projectId)
    )
  );

  function onDragEnd(result: any) {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      let copyFolders: FolderItem[] = structuredClone(folders);

      const remoteProject = copyFolders.splice(source.index, 1)[0];
      copyFolders.splice(destination.index, 0, remoteProject);
      copyFolders.forEach((project, idx) => (project.sequence = idx));

      dispatch(actionsThunk.updateFolderSequence(copyFolders));
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId={new Date().getMilliseconds().toString()}
        direction="horizontal"
      >
        {(provided) => (
          <ul
            className={styles.folderList}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {folders.map(({ id, title }, idx) => (
              <Draggable draggableId={id.toString()} key={id} index={idx}>
                {(provided) => (
                  <li
                    className={styles.folderItem}
                    key={id}
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                  >
                    <Link to={`./folder/${id}`}>
                      <h4>{title}</h4>
                      <p>47 фото</p>
                    </Link>
                    <FolderMenu
                      projectId={projectId}
                      folderId={id}
                      setEditFolder={setEditFolder}
                      setIsOpen={setIsOpen}
                    />
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <li>
              <button
                className={styles.addBtn}
                type="button"
                onClick={() => {
                  setIsOpen(true);
                  setEditFolder(null);
                }}
              >
                + добавить папку
              </button>
            </li>
          </ul>
        )}
      </Droppable>

      <ModalAddFolder
        projectId={projectId}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        folder={editFolder}
      />
    </DragDropContext>
  );
};
