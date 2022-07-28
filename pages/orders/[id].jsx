import styles from "../../styles/Order.module.css";
import Image from "next/image";
import axios from "axios";

const Order = ({order}) => {
  const status = order.status || 0;

  const statusClass = (index) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.undone;
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.row}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.trTitle}>
                <th>Numer zamówienia</th>
                <th>Kupujący</th>
                <th>Adres</th>
                <th>Suma</th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.tr}>
                <td>
                  <span className={styles.id}>{order?._id}</span>
                </td>
                <td>
                  <span className={styles.name}>{order?.customer}</span>
                </td>
                <td>
                  <span className={styles.address}>{order?.address}</span>
                </td>
                <td>
                  <span className={styles.total}>{order?.total} zł</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.row}>
          <div className={statusClass(0)}>
            <Image src="/assets/paid.png" width={50} height={50} alt="" />
            <span>Zapłacone</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/assets/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div className={statusClass(1)}>
            <Image src="/assets/bake.png" width={50} height={50} alt="" />
            <span>Przygotowywanie...</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/assets/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div className={statusClass(2)}>
            <Image src="/assets/bike.png" width={50} height={50} alt="" />
            <span>W drodze...</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/assets/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div className={statusClass(3)}>
            <Image src="/assets/delivered.png" width={50} height={50} alt="" />
            <span>Dostarczone</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/assets/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>Podsumowanie zamówienia</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Kwota całkowita:</b>{order.total} zł
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Zniżka:</b>0.00 zł
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Kwota całkowita:</b>{order.total} zł
          </div>
          <button disabled className={styles.button}>
            Zapłacone
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`http://localhost:3000/api/orders/${params.id}`);
  return {
    props: { order: res.data },
  };
};

export default Order;
