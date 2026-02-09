import { Helmet } from 'react-helmet';
import { Link } from 'wouter';

//import styles from './HomePage.module.css'

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Random Roulette</title>
        <meta name="description" content="Random Roulette for video games"/>
      </Helmet>
      <main>
        <section>
          <div>

          </div>
          <div>
            <Link
              to={'/valorant'}
            >
              Valorant roulette
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
