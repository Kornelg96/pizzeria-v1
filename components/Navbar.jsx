import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  if (typeof window !=="undefined"){
    const userWidth = window.innerWidth
    useEffect(() => {
      if (userWidth <= 1000) {
        setMobile(true);
      }
    }, [userWidth]);
  }
  

  const quantity = useSelector((state) => state.shoppingCart.cartquantity);
  return (
    <>
      {open && <MobileNavbar setOpen={setOpen} />}
      <div className={styles.container}>
        {mobile && (
          <div className={styles.item} onClick={() => setOpen(true)}>
            <Image
              src="/assets/menu-left.png"
              alt=""
              width="32"
              height="32"
            />
          </div>
        )}
        <div className={styles.item}>
          <div className={styles.telephone}>
            <Image src="/assets/telephone.png" alt="" width="32" height="32" />
          </div>
          <div className={styles.text}>
            <p>555 555 555</p>
          </div>
        </div>
        <div className={styles.item}>
          <ul className={styles.menuItems}>
            <Link href="/#about">
              <li className={styles.menuItem}>o Nas</li>
            </Link>
            <Link href="/menu">
              <li className={styles.menuItem}>Menu</li>
            </Link>
            <Link href="/">
              <div className={styles.logoWrapper}>
                <p className={styles.logo}>Pizza Florina</p>
              </div>
            </Link>
            <li className={styles.menuItem}>Galeria</li>
            <Link href='/#contact'>
            <li className={styles.menuItem}>Kontakt</li>
            </Link>
          </ul>
        </div>
        <div className={styles.item}>
          <Link href="/cart">
            <div className={styles.shoppingbagWrapper}>
              <Image
                src="/assets/shoppingbag_white_.png"
                height="32"
                width="32"
              />
              <div className={styles.bagQuantity}>
                <p>{quantity}</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );

};

export default Navbar;
