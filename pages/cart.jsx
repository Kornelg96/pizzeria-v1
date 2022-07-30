import styles from "../styles/Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { reset } from "../redux/cartSlice";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import OrderDetails from "../components/OrderDetails";

const Cart = () => {
  const cart = useSelector((state) => state.shoppingCart);
  const amount = cart.total;
  const currency = "PLN";
  const style = { layout: "vertical" };
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const createOrder = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/orders", data);
      if (res.status === 201) {
        dispatch(reset());
        router.push(`/orders/${res.data._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const ButtonWrapper = ({ currency, showSpinner }) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              console.log(details);
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: cart.total,
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };

  return (
    <>
      {openModal && (
        <OrderDetails
          setOpenModal={setOpenModal}
          total={cart.total}
          createOrder={createOrder}
        />
      )}
      <div className={styles.container}>
        <div className={styles.left}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.trTitle}>
                <th>Nazwa</th>
                <th>Dodatki</th>
                <th>Cena</th>
                <th>Ilość</th>
                <th>Suma</th>
              </tr>
            </thead>
            <tbody>
              {cart.productsCart.map((item, index) => (
                <tr className={styles.tr} key={index}>
                  <td>
                    <span className={styles.name}>{item[0].title}</span>
                  </td>
                  <td>
                    <span className={styles.extras}>
                      {item.extras.map((extra) => extra.subTitle + ", ")}
                    </span>
                  </td>
                  <td>
                    <span className={styles.price}>{item.price2} zł</span>
                  </td>
                  <td>
                    <span className={styles.quantity}>{item.quantity}</span>
                  </td>
                  <td>
                    <span className={styles.total}>{item.price} zł</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.right}>
          <div className={styles.wrapper}>
            <h2 className={styles.title}>Kwota całkowita</h2>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Kwota :</b>
              {cart.total} zł
            </div>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Zniżka :</b>0,00zł
            </div>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Cena całkowita :</b>
              {cart.total} zł
            </div>
            {open ? (
              <div className={styles.openWrapper}>
                <button
                  className={styles.orderButton}
                  onClick={() => setOpenModal(true)}
                >
                  Płatność przy odbiorze
                </button>
                <PayPalScriptProvider
                  options={{
                    "client-id":
                      "AalrF5-LRRecYpoq3Ys2WElILYvmCT4b1cnE6cs4GQSwKVRhRjp4J8xD9M39YmIZkDC5qIQvIKUWvYpB",
                    components: "buttons",
                    currency: "PLN",
                    "disable-funding": "credit,card,p24",
                  }}
                >
                  <ButtonWrapper currency={currency} showSpinner={false} />
                </PayPalScriptProvider>
              </div>
            ) : (
              <button className={styles.button} onClick={() => setOpen(true)}>
                Przejdź do płatności
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Cart;
