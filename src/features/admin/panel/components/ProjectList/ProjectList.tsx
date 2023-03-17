import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { ProjectItem } from '../ProjectItem/ProjectItem';
import { IProjectItem, projectAsyncActions } from 'store/slices/projectSlice';
import { ModalAddProject } from 'components/ui/ModalAddProject/ModalAddProject';
import { useAppDispatch } from 'store/hooks';

import styles from './ProjectList.module.scss';
import { useState } from 'react';

type ProjectListProps = {
  projects: IProjectItem[];
};

export const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [editProject, setEditProject] = useState<IProjectItem | null>(null);

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
      let copyProjects: IProjectItem[] = structuredClone(projects);

      const remoteProject = copyProjects.splice(source.index, 1)[0];
      copyProjects.splice(destination.index, 0, remoteProject);
      copyProjects.forEach((project, idx) => (project.sequence = idx));

      dispatch(projectAsyncActions.updateProjectSequence(copyProjects));
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={new Date().getMilliseconds().toString()}>
        {(provided) => (
          <ul
            className={styles.body}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <button
              className={styles.addBtn}
              type="button"
              onClick={() => {
                setIsOpen(true);
                setEditProject(null);
              }}
            >
              добавить проект +
            </button>

            {projects.map((project, idx) => (
              <Draggable
                draggableId={project.id.toString()}
                key={project.id}
                index={idx}
              >
                {(provided) => (
                  <li
                    className={styles.row}
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                  >
                    <ProjectItem
                      project={project}
                      setIsOpen={setIsOpen}
                      setEditProject={setEditProject}
                    />
                  </li>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </ul>
        )}
      </Droppable>

      <ModalAddProject
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        project={editProject}
      />
    </DragDropContext>
  );
};
