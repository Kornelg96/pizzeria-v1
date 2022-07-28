import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Menu.module.css'
import { useState } from 'react'
import AddToCart from '../components/AddToCart'
import axios from 'axios'

const menu = ({ pizzaList, extraOptionList }) => {
    const [close, setClose] = useState(true)
    const [pizza, setPizza] = useState()
    const handleClick = (e) => {
        setClose(false)
        const pizzaK = pizzaList.filter((item) => item._id === e.target.value);
        setPizza(pizzaK)
    }

    return (
        <>
            {!close && <AddToCart setClose={setClose} pizza={pizza} extraOptionList={extraOptionList} />}
            <div className={styles.container}>
                <h1>Menu</h1>
                <div className={styles.categoriesWrapper}>
                    <ul className={styles.categories}>
                        <li className={styles.categoriesItem}>
                            Pizza
                        </li>
                    </ul>
                </div>
                {/* nowy item ? component */}
                <ul className={styles.productsList}>
                    {pizzaList.map((pizza) => (
                        <li key={pizza._id} className={styles.productsWrapper}>
                            <div className={styles.div}>
                                <h2>{pizza.title}</h2>
                                {pizza.extraOptions.map((extra, index) => (
                                    <span key={index}>{extra.text}, </span>
                                ))}
                            </div>
                            <div className={styles.div2}>
                                <div className={styles.div3}>

                                {pizza.prices.map((price, index) => (
                                    <span key={index}>{price},00zł</span>
                                ))}
                                </div>
                                <button onClick={(e) => handleClick(e)} className={styles.buy} value={pizza._id}>Dodaj</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default menu

export const getServerSideProps = async () => {
    const res = await axios.get("http://localhost:3000/api/products")
    const res2 = await axios.get("http://localhost:3000/api/extra2")
    return {
        props: {
            pizzaList: res.data,
            extraOptionList: res2.data,
        }
    }
}
