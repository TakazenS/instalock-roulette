import { Link } from 'wouter';

import styles from './NavigationBar.module.css';

export default function NavigationBar() {
  return (
    <header className={styles.header}>
      <div>
        <Link
          className={styles.link}
          to={'/'}
        >
          <h1 className={styles.title}>INSTALOCK ROULETTE</h1>
        </Link>
      </div>
    </header>
  );
}
