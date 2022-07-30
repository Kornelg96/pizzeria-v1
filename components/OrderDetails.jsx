import React from "react";
import styles from "../styles/OrderDetails.module.css";
import Image from "next/image";
import { useState } from "react";

const OrderDetails = ({ setOpenModal, total, createOrder }) => {
  const [customer, setCustomer] = useState({
    customerInfo: "",
    address: "",
    number: "",
  });
  const handleInfo = (e) => {
    setCustomer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = () => {
    createOrder({
      customer: customer.customerInfo,
      address: customer.address,
      total,
      method: 0,
      number: customer.number,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div
          className={styles.crossWrapper}
          onClick={() => setOpenModal(false)}
        >
          <Image src="/assets/cross.png" height={32} width={32} />
        </div>
        <div className={styles.title}>
          <h2>Przy odbiorze pizzy zapłacisz : {total} zł dostawcy</h2>
        </div>
        <div className={styles.item}>
          <label className={styles.label} htmlFor="">
            Imię oraz Nazwisko:
          </label>
          <input
            onChange={(e) => handleInfo(e)}
            className={styles.input}
            placeholder="Jan Kowalski"
            type="text"
            name="customerInfo"
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Numer telefonu:</label>
          <input
            onChange={(e) => handleInfo(e)}
            type="text"
            placeholder="+1 234 567 89"
            className={styles.input}
            name="number"
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Adres:</label>
          <textarea
            rows={5}
            placeholder="Wrocław ul.Joanitów 30/2"
            type="text"
            className={styles.textarea}
            onChange={(e) => handleInfo(e)}
            name="address"
          />
        </div>
        <div className={styles.wrapperButton}>
          <button className={styles.button} onClick={handleClick}>
            Złóż zamówienie
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
