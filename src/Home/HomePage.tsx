import { Helmet } from 'react-helmet';
import { Link } from 'wouter';

import styles from './HomePage.module.css';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Random Roulette</title>
        <meta name="description" content="Random Roulette for video games"/>
      </Helmet>
      <section className={styles.section}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>Choose roulette for your game !</h2>
        </div>
        <div className={styles.grid}>
          <div className={styles.links}>
            <Link to={'/valorant'} className={styles.valo}>
              Valorant
            </Link>
          </div>
          <div className={styles.links}>
            <Link to={'/'}  className={styles.lol}>
              League of Legends (soon)
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
