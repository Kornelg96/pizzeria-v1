import { useState } from "react";
import styles from "../styles/AddToCart.module.css";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartSlice";

const AddToCart = ({ setClose, pizza, extraOptionList }) => {

  const dispatch = useDispatch()
  const [more, setMore] = useState(false);
  const [selected, setSelected] = useState('yes');
  const [price, setPrice] = useState(pizza[0].prices[0]);
  const [size, setSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState([]);
  const changePrice = (number) => {
    setPrice(price + number);
  };
  const handleSize = (sizeIndex,e) => {
    const difference = pizza[0].prices[sizeIndex] - pizza[0].prices[size];
    setSelected(e.target.value)
    setSize(sizeIndex);
    changePrice(difference);
  };
  const labelHandler = (e,option) => {
    const checked = e.target.checked

    if (checked) {
      changePrice(option.price)
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price)
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
    
  };
  const handleClick = () => {
dispatch(addProduct({...pizza,price:price*quantity,size,quantity,extras,price2:price}))
setClose(true)
  }

  return (
    <div className={styles.container}>
      <div className={styles.extraDiv}>
        <div className={styles.wrapper}>
          <div onClick={() => setClose(true)} className={styles.crossWrapper}>
            <Image src="/assets/cross.png" width={40} height={40} />
          </div>
          <h3 className={styles.productTitle}>{pizza[0].title}</h3>
          <div className={styles.productInfo}>
            <h4 className={styles.productSizeTitle}>Rozmiar :</h4>
            <div className={styles.productSizes}>
              <div >
                <input
                  type="radio"
                  id="35"
                  name="size"
                  value='yes'
                  onChange={(e) => handleSize(0,e)}
                  checked={selected === 'yes'}
                />
                <label className={styles.label} htmlFor="35">35cm - {pizza[0].prices[0]},00zł</label>
              </div>
              <div >
                <input
                  value='no'
                  type="radio"
                  id="45"
                  name="size"
                  onChange={(e) => handleSize(1,e)}
                  checked={selected === 'no'}
                />
                <label className={styles.label} htmlFor="45">45cm - {pizza[0].prices[1]},00zł</label>
              </div>
              <div >
                <input
                  value='maybe'
                  type="radio"
                  id="55"
                  name="size"
                  onChange={(e) => handleSize(2,e)}
                  checked={selected === 'maybe'}
                />
                <label className={styles.label} htmlFor="55">55cm - {pizza[0].prices[2]},00zł</label>
              </div>
            </div>
            <div className={styles.productQuantityWrapper}>
                <label className={styles.label} htmlFor="quantity" style={{"fontWeight":"bold",}}>Ilość :</label>
                <input type="number" id="quantity" defaultValue={1} className={styles.productQuantity} onChange={(e) => setQuantity((parseFloat(e.target.value)))} />
                </div>
            <div className={styles.productIngredients}>
              <h4 className={styles.productIngredientTitle}>Składniki :</h4>
              <div className={styles.ingredientsWrapper}>
                <p className={styles.ingredients}>{pizza[0].extraOptions.map((extra)=>extra.text + `, `)}</p>
                <button onClick={() => setMore(!more)}>
                  {more ? "Ukryj" : "Zmień"}
                </button>

              </div>
            </div>
          </div>
          {more && (
            <div className={styles.extraContainer}>
              {extraOptionList[0].category.map((cat,index) => (
                <div key={index} className={styles.extraWrapper}>
                  <div className={styles.extraCategory}>{cat.title}</div>
                  <div className={styles.extraItemWrapper}>
                    {cat.subCategory.map((subCat,index) => (
                      <div key={index} className={styles.extraItem}>
                        <input
                          type="checkbox"
                          id={subCat.subTitle}
                          value="5"
                          onChange={(e) => labelHandler(e, subCat)}
                        />
                        <label className={styles.labelExtra} htmlFor={subCat.subTitle}>{subCat.subTitle}</label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={styles.buttonsWrapper}>
          <button onClick={handleClick}>Dodaj do koszyka ({price * quantity} zł)</button>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
