import { CiFolderOn } from 'react-icons/ci';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { MdOutlineContentCopy } from 'react-icons/md';

import styles from './ProjectPage.module.scss';

export const ProjectPage = () => {
  return (
    <div>
      <ul className={styles.folders}>
        <li>
          <a className={styles.link} href="#">
            <div className={styles.folder}>
              <CiFolderOn />
              <div>
                <h3>"Новогодние открытки"</h3>
                <p>47 фото</p>
              </div>
            </div>
          </a>
        </li>
        <li>
          <a className={styles.link} href="#">
            <div className={styles.folder}>
              <CiFolderOn />
              <div>
                <h3>"Новогодние открытки"</h3>
                <p>47 фото</p>
              </div>
            </div>
          </a>
        </li>
      </ul>

      <div className={styles.header}>
        <a href="#">
          <HiOutlineArrowNarrowLeft />
        </a>
        <h1>"Новогодние открытки"</h1>
        <button>
          <MdOutlineContentCopy />
          копировать ссылку
        </button>
        <a
          href="https://ou7g5wq1c17j.wfolio.pro/disk/novogodnie-otkrytki"
          target="_blank"
          rel="noopener noreferrer"
        >
          посмотреть на сайте
        </a>
      </div>

      <div>
        <ul className={styles.tabs}>
          <li className={styles.current}>
            <a href="">
              <CiFolderOn />
              проект
            </a>
          </li>
          <li>
            <a href="">
              <CiFolderOn />
              избранное
            </a>
          </li>
          <li>
            <a href="">
              <CiFolderOn />
              дизайн и обложка
            </a>
          </li>
          <li>
            <button>
              <CiFolderOn />
              настройки
            </button>
          </li>
        </ul>
      </div>

      <ul className={styles.folderList}>
        <li className={styles.folderItem}>
          <a href="#">
            <h4>фотографии</h4>
            <p>47 фото</p>
          </a>
          <button>:</button>
        </li>
        <li>
          <button className={styles.addFolder}>+ добавить папку</button>
        </li>
      </ul>

      {/* ======== */}

      <button>Добавить</button>

      {/* <ul className={styles.images}>
        <li className={styles.item}>
          <img
            className={styles.img}
            src="https://img-20.wfolio.com/5OrjZ-dGGNsZBLeXg0PvrZ9JSOlZWcZ0_j6DwH4GUVk/rs:fit:640:0:0/cb:v2/aHR0cDovL2Rpc2su/d2ZvbGlvLnJ1L2Rp/c2tzLzQxMTYzL3By/b2plY3RzLzE5MzA3/MzYvcHJldmlld3Mv/MTY3Mzc5MTU3OV8y/OTkwMzYuanBn.jpg"
            alt=""
          />
          <div className={styles.control}>
            <button>переименовать</button>
            <button>скачать</button>
            <button>скопировать ссылку</button>
            <button>удалить</button>
          </div>
          <div className={styles.downloads}>1 раз скачали</div>
          <input className={styles.check} type="checkbox" name="" id="" />
        </li>
      </ul> */}
    </div>
  );
};
