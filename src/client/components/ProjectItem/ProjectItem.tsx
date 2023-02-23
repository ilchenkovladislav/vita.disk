import styles from './ProjectItem.module.scss';

import { MdOutlineContentCopy } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsDot } from 'react-icons/bs';
import { FaArrowsAltV } from 'react-icons/fa';

export const ProjectItem = () => {
  return (
    <>
      <FaArrowsAltV />
      <div className={styles.project}>
        <a className={styles.imgLink} href="#">
          <img
            className={styles.projectImg}
            src="https://img-20.wfolio.com/R1hU6ed_Sju13hrASXOF5AtUx1-dcBTYmnRon4vO4_o/rs:fill:160:160:1/g:fp:0.5102040816326531:0.4974431818181818/cb:v2/aHR0cDovL2Rpc2su/d2ZvbGlvLnJ1L2Rp/c2tzLzQxMTYzL3By/b2plY3RzL2NvdmVy/cy8xNjczNzkxNjg4/XzZkZjE5ZC5qcGc.jpg"
            alt=""
          />
        </a>
        <a className={styles.titleLink} href="#">
          <h3>"Новогодние открытки"</h3>
        </a>
        <p className={styles.projectDateCreate}>15.01.2023</p>
        <BsDot className={styles.projectDot} />
        <p className={styles.projectFiles}>47 фото</p>
      </div>
      <p>01.01.2023</p>
      <p>
        <a
          href="https://ou7g5wq1c17j.wfolio.pro/disk/novogodnie-otkrytki"
          target="_blank"
          rel="noopener noreferrer"
        >
          /novogodnie-otkrytki
        </a>
      </p>
      <div className={styles.buttons}>
        <button type="button">
          <MdOutlineContentCopy />
        </button>
        <button type="button">
          <FiSettings />
        </button>
        <button type="button">
          <AiOutlineDelete />
        </button>
      </div>
    </>
  );
};
