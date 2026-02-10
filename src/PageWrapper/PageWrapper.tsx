import type { PropsWithChildren } from 'react';

import styles from './PageWrapper.module.css';

export default function PageWrapper(props: PropsWithChildren) {
  const { children } = props;

  return (
    <main className={styles.main}>
      {children}
    </main>
  );
}
