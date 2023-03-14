import styles from 'components/ui/ModalAddProject/ModalAddProject.module.scss';
import { Toggle } from 'components/ui/components/Toggle/Toggle';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { FormProjectItem } from 'components/ui/ModalAddProject/ModalAddProject';
import { useActionCreators, useStateSelector } from 'store/hooks';
import { projectAsyncActions } from 'store/slices/projectSlice';
import { useParams } from 'react-router-dom';

export const Settings = () => {
  const { projectId } = useParams();
  const project = useStateSelector((state) =>
    state.project.items.find((el) => Number(el.id) === Number(projectId))
  );

  const asyncActions = useActionCreators(projectAsyncActions);

  const initialState = {
    title: '',
    link: uuidv4(),
    dateShooting: '',
    cover:
      'https://img-20.wfolio.com/lOlf4eEjCXFJ4dZiEdZftJYQVFwtal4J7N5ouMA8B9c/rs:fit:640:0:0/cb:v2/aHR0cDovL2Rpc2su/d2ZvbGlvLnJ1L2Rp/c2tzLzQxMTYzL3By/b2plY3RzLzIxMTk2/MjQvcHJldmlld3Mv/MTY3NzE1NTcyN18z/OGJlMTIuanBn.jpg',
    sequence: 0
  };

  const [form, setForm] = useState<FormProjectItem>(initialState);
  const [isToggleOn, setIsToggleOn] = useState(true);

  useEffect(() => {
    if (isToggleOn) {
      setForm((prev) => ({ ...prev, link: uuidv4() }));
    }
  }, [isToggleOn]);

  useEffect(() => {
    if (project) {
      setForm({
        title: project.title,
        link: project.link,
        dateShooting: project.dateShooting,
        cover: project.cover,
        sequence: project.sequence
      });
    }
  }, [project]);

  function inputHandler(e: React.FormEvent<HTMLInputElement>) {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    asyncActions.updateProject({ ...project, ...form });

    clearForm();
  }

  function clearForm() {
    setForm(initialState);
  }

  return (
    <>
      <form id="ModalAddProject" className={styles.form} onSubmit={onSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title">название проекта</label>
          <input
            type="text"
            name="title"
            id="title"
            value={form.title}
            onChange={inputHandler}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="link">ссылка</label>
          <input
            type="text"
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
        <input type="submit" form="ModalAddProject" value="обновить" />
      </footer>
    </>
  );
};
