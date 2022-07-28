import React from "react";
import styles from "../styles/Footer.module.css";
import Image from "next/image";

const Footer = () => {
  return (
    <div className={styles.container} id='contact'>
      <div className={styles.title}>Pizza Florina</div>
      <div className={styles.infoWrapper}>
        <div className={styles.item}>
          <Image src="/assets/map_white.png" width={40} height={40} />
          <p>adres :</p>
          <p>Wrocław ul.Pizzerri 13</p>
        </div>

        <div className={styles.item}>
          <Image src="/assets/time.png" width={40} height={40} />
          <p>godziny otwarcia:</p>
          <p>pn-pt : 8-21</p>
          <p>sb-ndz : 10-18</p>
        </div>
        <div className={styles.item}>
          <Image src="/assets/email.png" width={40} height={40} />
          <p>email :</p>
          <p>pizzaflorina@gmail.com</p>
        </div>
        <div className={styles.item}>
          <Image src="/assets/phone.png" width={40} height={40} />
          <p>telefon :</p>
          <p>555 555 555</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
