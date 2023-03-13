import styles from './ModalAddFolder.module.scss';
import { Dialog } from '@headlessui/react';
import { Closure } from 'components/ui/components/Closure/Closure';
import { useEffect, useRef, useState } from 'react';
import { Toggle } from 'components/ui/components/Toggle/Toggle';
import { v4 as uuidv4 } from 'uuid';
import { useActionCreators, useStateSelector } from 'store/hooks';
import { actionsThunk, FolderItem } from 'store/slices/folderSlice';

interface ModalAddFolderProps {
  projectId: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  folder?: FolderItem | null;
}

export const ModalAddFolder: React.FC<ModalAddFolderProps> = ({
  projectId,
  isOpen,
  setIsOpen,
  folder
}) => {
  const numberFolders = useStateSelector(
    (state) =>
      state.folder.items.filter(
        (folder) => Number(folder.projectId) === Number(projectId)
      ).length
  );
  const asyncActions = useActionCreators(actionsThunk);

  const initialState = {
    title: '',
    link: uuidv4(),
    description: ''
  };

  const [form, setForm] = useState(initialState);

  const [isEditMode, setIsEditMode] = useState(false);

  const inputRef = useRef(null);
  const [isToggleOn, setIsToggleOn] = useState(true);

  useEffect(() => {
    if (isToggleOn) {
      setForm((prev) => ({ ...prev, link: uuidv4() }));
    }
  }, [isToggleOn]);

  useEffect(() => {
    if (folder) {
      setIsEditMode(true);
      setForm({
        title: folder.title,
        link: folder.link,
        description: folder.description
      });
    } else {
      setIsEditMode(false);
      clearForm();
    }
  }, [folder]);

  function inputHandler(
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isEditMode) {
      asyncActions.updateFolder({ ...folder, ...form });
    } else {
      asyncActions.addFolder({
        ...form,
        sequence: numberFolders,
        projectId: projectId
      });
    }
    setIsOpen(false);
    clearForm();
  }

  function clearForm() {
    setForm(initialState);
  }

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className={styles.dialog}
        initialFocus={inputRef}
      >
        <div className={styles.wrapper}>
          <Dialog.Panel className={styles.panel}>
            <header className={styles.header}>
              <Dialog.Title className={styles.title}>
                {isEditMode ? 'редактирование папки' : 'добавление новой папки'}
              </Dialog.Title>
              <Closure onClick={() => setIsOpen(false)} />
            </header>

            <form
              id="ModalAddFolder"
              className={styles.form}
              onSubmit={onSubmit}
            >
              <div className={styles.formGroup}>
                <label htmlFor="title">название папки</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={form.title}
                  ref={inputRef}
                  required
                  onChange={inputHandler}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="link">ссылка</label>
                <input
                  type="text"
                  name="link"
                  id="link"
                  value={form.link}
                  disabled={isToggleOn}
                  required
                  onChange={inputHandler}
                />
              </div>
              <Toggle
                checked={isToggleOn}
                onChange={setIsToggleOn}
                label="сгенерировать ссылку"
              />
              <div className={styles.formGroup}>
                <label htmlFor="description">описание</label>
                <textarea
                  name="description"
                  id="description"
                  value={form.description}
                  cols={30}
                  rows={10}
                  onChange={inputHandler}
                ></textarea>
              </div>
            </form>

            <footer className={styles.footer}>
              <input
                type="submit"
                form="ModalAddFolder"
                value={isEditMode ? 'обновить' : 'добавить'}
              />
            </footer>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};
