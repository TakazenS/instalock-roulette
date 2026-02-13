import styles from './Github.module.css';

export default function Github() {
  return (
    <>
      <a className={styles.github} translate="no" href="https://github.com/TakazenS/instalock-roulette" target="_blank">
        <p>Github</p>
        <div className={styles.githubImg}>
          <img src="/github.jpg" alt="github"/>
        </div>
      </a>
    </>
  );
}
