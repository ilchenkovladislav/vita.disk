import { FiDownload, FiShare2 } from 'react-icons/fi';

import styles from './UserPage.module.scss';

export const UserPage = () => {
  return (
    <div>
      {/* обложка проекта */}
      <section className={styles.cover}>
        <p className={styles.dateShooting}>01.01.2023</p>
        <h1 className={styles.title}>«Новогодние открытки»</h1>
      </section>
      <section className={styles.container}>
        <div className={styles.menu}>
          {/* компонент с папками */}
          <ul className={styles.directories}>
            <li>
              <a href="https://ou7g5wq1c17j.wfolio.pro/disk/novogodnie-otkrytki/photos">
                На улице
              </a>
            </li>
            <li>
              <a href="https://ou7g5wq1c17j.wfolio.pro/disk/novogodnie-otkrytki/photos">
                В студии
              </a>
            </li>
          </ul>
          {/* компонент с выпадающим меню скачивания */}
          <button>Скачать весь проект</button>
        </div>
        {/* список фоток */}
        <ul className={styles.imageList}>
          <li className={styles.imageItem}>
            <img
              className={styles.image}
              src="https://img-20.wfolio.com/AEnxMcCC4KcXVcEkWZg81k6vekA2BUDJXwtwlkO8CJ0/rs:fit:320:0:0/cb:v2/aHR0cDovL2Rpc2su/d2ZvbGlvLnJ1L2Rp/c2tzLzQxMTYzL3By/b2plY3RzLzE5MzA3/MzYvcHJldmlld3Mv/MTY3Mzc5MTU3OV8y/OTkwMzYuanBn.jpg"
              alt=""
            />
            <div className={styles.controls}>
              <button>
                <FiShare2 />
              </button>
              <button>
                <FiDownload />
              </button>
            </div>
          </li>
          <li className={styles.imageItem}>
            <img
              className={styles.image}
              src="https://img-20.wfolio.com/AEnxMcCC4KcXVcEkWZg81k6vekA2BUDJXwtwlkO8CJ0/rs:fit:320:0:0/cb:v2/aHR0cDovL2Rpc2su/d2ZvbGlvLnJ1L2Rp/c2tzLzQxMTYzL3By/b2plY3RzLzE5MzA3/MzYvcHJldmlld3Mv/MTY3Mzc5MTU3OV8y/OTkwMzYuanBn.jpg"
              alt=""
            />
            <div className={styles.controls}>
              <button>
                <FiShare2 />
              </button>
              <button>
                <FiDownload />
              </button>
            </div>
          </li>
          <li className={styles.imageItem}>
            <img
              className={styles.image}
              src="https://img-20.wfolio.com/AEnxMcCC4KcXVcEkWZg81k6vekA2BUDJXwtwlkO8CJ0/rs:fit:320:0:0/cb:v2/aHR0cDovL2Rpc2su/d2ZvbGlvLnJ1L2Rp/c2tzLzQxMTYzL3By/b2plY3RzLzE5MzA3/MzYvcHJldmlld3Mv/MTY3Mzc5MTU3OV8y/OTkwMzYuanBn.jpg"
              alt=""
            />
            <div className={styles.controls}>
              <button>
                <FiShare2 />
              </button>
              <button>
                <FiDownload />
              </button>
            </div>
          </li>
          <li className={styles.imageItem}>
            <img
              className={styles.image}
              src="https://img-20.wfolio.com/AEnxMcCC4KcXVcEkWZg81k6vekA2BUDJXwtwlkO8CJ0/rs:fit:320:0:0/cb:v2/aHR0cDovL2Rpc2su/d2ZvbGlvLnJ1L2Rp/c2tzLzQxMTYzL3By/b2plY3RzLzE5MzA3/MzYvcHJldmlld3Mv/MTY3Mzc5MTU3OV8y/OTkwMzYuanBn.jpg"
              alt=""
            />
            <div className={styles.controls}>
              <button>
                <FiShare2 />
              </button>
              <button>
                <FiDownload />
              </button>
            </div>
          </li>
          <li className={styles.imageItem}>
            <img
              className={styles.image}
              src="https://img-20.wfolio.com/AEnxMcCC4KcXVcEkWZg81k6vekA2BUDJXwtwlkO8CJ0/rs:fit:320:0:0/cb:v2/aHR0cDovL2Rpc2su/d2ZvbGlvLnJ1L2Rp/c2tzLzQxMTYzL3By/b2plY3RzLzE5MzA3/MzYvcHJldmlld3Mv/MTY3Mzc5MTU3OV8y/OTkwMzYuanBn.jpg"
              alt=""
            />
            <div className={styles.controls}>
              <button>
                <FiShare2 />
              </button>
              <button>
                <FiDownload />
              </button>
            </div>
          </li>
          <li className={styles.imageItem}>
            <img
              className={styles.image}
              src="https://img-20.wfolio.com/AEnxMcCC4KcXVcEkWZg81k6vekA2BUDJXwtwlkO8CJ0/rs:fit:320:0:0/cb:v2/aHR0cDovL2Rpc2su/d2ZvbGlvLnJ1L2Rp/c2tzLzQxMTYzL3By/b2plY3RzLzE5MzA3/MzYvcHJldmlld3Mv/MTY3Mzc5MTU3OV8y/OTkwMzYuanBn.jpg"
              alt=""
            />
            <div className={styles.controls}>
              <button>
                <FiShare2 />
              </button>
              <button>
                <FiDownload />
              </button>
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
};
