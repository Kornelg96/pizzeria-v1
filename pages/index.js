import Head from 'next/head'
import Image from 'next/image'
import Abouts from '../components/Abouts'
import Slider from '../components/Slider'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizzeria XXX</title>
        <meta name="description" content="Najlepsza pizza we Wrocławiu" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <Slider/>
      <Abouts/>

    </div>
  )
}
