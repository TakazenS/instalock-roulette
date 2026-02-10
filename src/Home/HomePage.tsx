import { Helmet } from 'react-helmet';
import { Link } from 'wouter';

import styles from './HomePage.module.css';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Instalock Roulette</title>
        <meta name="description" content="Random character picker for valorant and league of legends"/>
      </Helmet>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>CHOOSE YOUR GAME</h2>
            <div className={styles.subtitle}>Select a game to start the roulette</div>
          </div>

          <div className={styles.grid}>
            <div className={styles.links}>
              <Link to={'/valorant'} className={styles.valo}>
                <span className={styles.btnText}>VALORANT</span>
              </Link>
            </div>

            <div className={styles.links}>
              <Link to={'/'} className={styles.lol}>
                <span className={styles.btnText}>LEAGUE OF LEGENDS</span>
                <span className={styles.badge}>SOON</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
