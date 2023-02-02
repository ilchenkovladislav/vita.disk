import { SlSocialVkontakte, SlSocialInstagram } from 'react-icons/sl';
import { TbBrandTelegram } from 'react-icons/tb';
import { FaWhatsapp } from 'react-icons/fa';

import styles from './BusinessCard.module.scss';

export const BusinessCard = () => {
  return (
    <div className={styles.card}>
      <img
        className={styles.img}
        src="https://img-10.wfolio.com/7KPZNnZv3SeiTWDwINuamy-vxdo_GAugJKmNFjI2FRM/rs:fill:320:320:1/cb:v2/aHR0cDovL3N0b3Jh/Z2Uud2ZvbGlvLnJ1/L3NpdGVzLzU0OTA1/L2Fzc2V0cy8xNjY4/ODY5Nzc5XzJlODA0/NS5qcGc.jpg"
        alt=""
      />
      <p className={styles.name}>Ирина Зуева</p>
      <a className={styles.phone} href="tel:+79111551663">
        +79111551663
      </a>

      <a className={styles.email} href="mailto:zuevairinav@yandex.ru">
        zuevairinav@yandex.ru
      </a>

      <div className={styles.socialWrapper}>
        <a
          className={styles.social}
          href="https://vk.com/vita_zw"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SlSocialVkontakte /> vk
        </a>

        <a
          className={styles.social}
          href="https://www.instagram.com/vita___i"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SlSocialInstagram /> instagram
        </a>

        <a
          className={styles.social}
          href="whatsapp://send?phone=79111551663"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp /> whatsapp
        </a>

        <a
          className={styles.social}
          href="https://t.me/vita_i"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TbBrandTelegram /> telegram
        </a>
      </div>
    </div>
  );
};
