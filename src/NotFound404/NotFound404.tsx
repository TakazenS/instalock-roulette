import { useLocation } from 'wouter';

import styles from './NotFound404.module.css';

export default function NotFound404() {
  const url = useLocation();

  return (
    <>
      <section className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>404 - Page not found</h1>
          <p className={styles.text}>The url you are searching for does not exist :</p>
          <span className={styles.url}>{url[0]}</span>
        </div>
      </section>
    </>
  );
}
