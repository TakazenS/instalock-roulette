import { Helmet } from "react-helmet";

import styles from './HomePage.module.css'

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Random Roulette</title>
        <meta name="description" content="Random Roulette for video games"/>
      </Helmet>
      <main>
        Home
      </main>
    </>
  );
}
