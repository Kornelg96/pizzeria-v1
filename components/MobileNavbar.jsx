import React from "react";
import styles from "../styles/MobileNavbar.module.css";
import Image from "next/image";
import Link from "next/link";

const MobileNavbar = ({ setOpen }) => {
    const handleClick=()=>{
        setOpen(false)
    }
  return (
    <div className={styles.mobileContainer}>
      <div className={styles.cross} onClick={handleClick}>
        <Image src="/assets/cross.png" alt="" width="40" height="40" />
      </div>
      <ul className={styles.menuMobileItems}>
        <Link href="/#about">
          <li className={styles.menuMobileItem} onClick={handleClick}>o Nas</li>
        </Link>
        <Link href="/menu">
          <li className={styles.menuMobileItem} onClick={handleClick}>Menu</li>
        </Link>
        <Link href="/galeria">
          <li className={styles.menuMobileItem} onClick={handleClick}>Galeria</li>
        </Link>
        <Link href="/#contact">
          <li className={styles.menuMobileItem} onClick={handleClick}>Kontakt</li>
        </Link>
      </ul>
    </div>
  );
};

export default MobileNavbar;
