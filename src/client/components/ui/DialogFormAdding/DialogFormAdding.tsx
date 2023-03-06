import { useState, useRef, useEffect } from 'react';

import { Dialog } from '@headlessui/react';
import { v4 as uuidv4 } from 'uuid';

import { Closure } from '../../form/Closure/Closure';
import { Toggle } from '../../form/Toggle/Toggle';

import { IProjectItem } from '../../../store/slices/projectSlice';
import { useActionCreators } from '../../../store/hooks';
import { projectAsyncActions } from '../../../store/slices/projectSlice';
import { useStateSelector } from '../../../store/hooks';

import styles from './DialogFormAdding.module.scss';

export type FormProjectItem = Omit<
  IProjectItem,
  'id' | 'dateCreation' | 'numberImages'
>;

export const DialogFormAdding: React.FunctionComponent = () => {
  const numberProjects = useStateSelector(
    (state) => state.project.items.length
  );

  const asyncActions = useActionCreators(projectAsyncActions);

  const [isOpen, setIsOpen] = useState(false);
  const [isToggleOn, setIsToggleOn] = useState(true);

  const [form, setForm] = useState<FormProjectItem>({
    title: '',
    link: '',
    dateShooting: '',
    cover:
      'https://img-20.wfolio.com/lOlf4eEjCXFJ4dZiEdZftJYQVFwtal4J7N5ouMA8B9c/rs:fit:640:0:0/cb:v2/aHR0cDovL2Rpc2su/d2ZvbGlvLnJ1L2Rp/c2tzLzQxMTYzL3By/b2plY3RzLzIxMTk2/MjQvcHJldmlld3Mv/MTY3NzE1NTcyN18z/OGJlMTIuanBn.jpg',
    sequence: 0
  });

  useEffect(() => {
    if (isToggleOn) {
      setForm((prev) => ({ ...prev, link: uuidv4() }));
    }
  }, [isToggleOn]);

  const inputRef = useRef(null);

  function inputHandler(e: React.FormEvent<HTMLInputElement>) {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    asyncActions.addProject({ ...form, sequence: numberProjects });
    setIsOpen(false);
    clearForm();
  }

  function clearForm() {
    setForm((prev) => ({
      ...prev,
      title: '',
      link: uuidv4(),
      dateShooting: ''
    }));
  }

  return (
    <>
      <button
        className={styles.addBtn}
        type="button"
        onClick={() => setIsOpen(true)}
      >
        добавить проект +
      </button>

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
                добавление нового проекта
              </Dialog.Title>
              <Closure onClick={() => setIsOpen(false)} />
            </header>

            <form
              id="DialogFormAdding"
              className={styles.form}
              onSubmit={onSubmit}
            >
              <div className={styles.formGroup}>
                <label htmlFor="title">название проекта</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  ref={inputRef}
                  value={form.title}
                  onChange={inputHandler}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="link">ссылка</label>
                <input
                  type="url"
                  name="link"
                  id="link"
                  onChange={inputHandler}
                  disabled={isToggleOn}
                  value={form.link}
                  required
                />
              </div>
              <Toggle
                checked={isToggleOn}
                onChange={setIsToggleOn}
                label="сгенерировать ссылку"
              />
              <div className={styles.formGroup}>
                <label htmlFor="dateShooting">дата съемки</label>
                <input
                  type="date"
                  name="dateShooting"
                  id="dateShooting"
                  onChange={inputHandler}
                  value={form.dateShooting}
                  required
                />
              </div>
            </form>

            <footer className={styles.footer}>
              <input type="submit" form="DialogFormAdding" value="добавить" />
            </footer>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};
