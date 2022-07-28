import Image from "next/image";
import { useState,useEffect } from "react";
import styles from "../styles/Slider.module.css";
import Link from "next/link";

const Slider = () => {
  const [index, setIndex] = useState(0);
  const autoscroll = true;
  let slideIterval;
  let intervalTime = 5000;
  const images = [
    "/assets/pizza-slider.jpg",
    "/assets/pizza-slider2.jpg",
    "/assets/pizza-slider3.jpg",
  ];


  const handleArrow = (direction) => {
    if (direction === "l") {
      setIndex(index !== 0 ? index - 1 : 2);
    }
    if (direction === "r") {
      setIndex(index !== 2 ? index + 1 : 0);
    } else{
      setIndex(index<2 ? index +1 : 0);
    }
  };

  const runSlider = () => {
    slideIterval = setInterval(handleArrow, intervalTime);
  };
  useEffect(() => {
    autoscroll && runSlider();
    return () => clearInterval(slideIterval);
  }, [index]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.titleContainer}>
          <h1>Witamy w Pizzeria Florina</h1>
          <h2>Najlepsza pizza we Wrocławiu</h2>
        </div>
      </div>
          <div className={styles.instruction}>
            <h2>LUB</h2>
          </div>
          <Link href='/menu'>
      <button className={styles.button_menu}>Zobacz nasze Menu</button>
          </Link>
          <Link href='/menu'>
      <button className={styles.button_buy}>Złóż zamówienie online</button>
          </Link>
      <button className={styles.button_buy_online} >
      <a href="tel:+48555-555-555">Zadzwoń : 555 555 555</a>
        </button>
      <div
        className={styles.wrapper}
        style={{ transform: `translateX(${-100 * index}vw)` }}
      >
        {images.map((img, i) => (
          <div className={styles.imgContainer} key={i}>
            <Image src={img} alt="" layout="fill" objectFit="cover" priority="true" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
