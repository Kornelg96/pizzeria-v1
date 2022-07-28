import React from "react";
import styles from "../styles/Abouts.module.css";
import Image from "next/image";
import img from "../public/assets/outdoorPizza.jpg";

const Abouts = () => {
  return (
    <div className={styles.container} id='about'>
      <div className={styles.textWrapper}>
        <h2>
          Zapraszamy na prawdziwą Włoską pizzę Neapolitańską, wypiekaną tylko
          60-90sekund w temperaturze około 480 <span>&deg;C</span>
        </h2>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.content}>
          <div className={styles.imgWrapper}>
            <Image src={img} 
            layout='fill' objectFit="cover" />
          </div>
          <div className={styles.description}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
            exercitationem dolorum reiciendis adipisci eum, suscipit quaerat a,
            minus tenetur architecto consequatur quas. Totam facilis, cupiditate
            tenetur ut ullam fuga magnam?
          </div>
        </div>
      </div>
    </div>
    
  );
};


export default Abouts;
