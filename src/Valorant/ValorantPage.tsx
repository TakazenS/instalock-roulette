import { useState } from 'react';
import { Helmet } from 'react-helmet';

import { VALORANT_AGENTS } from '../datas.ts';
import Roulette from '../Roulette/Roulette.tsx';
import styles from './ValorantPage.module.css';

export default function ValorantPage() {
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [resetKey, setResetKey] = useState(0);

  const handleRandomPick = () => {
    if (spinning || winner) return;

    const randomIndex = Math.floor(Math.random() * VALORANT_AGENTS.length);
    setWinner(VALORANT_AGENTS[randomIndex].id);
    setSpinning(true);
  };

  const handleReset = () => {
    setWinner(null);
    setResetKey(prev => prev + 1);
    setSpinning(false);
  };

  const onAnimationComplete = () => {
    setSpinning(false);
  };

  return (
    <>
      <Helmet>
        <title>Instalock Roulette | Valorant</title>
        <meta name="description" content="Random agent picker for valorant"/>
      </Helmet>

      <div className={styles.container}>
        <h1 className={styles.title}>VALORANT ROULETTE</h1>

        <Roulette
          agents={VALORANT_AGENTS}
          winnerId={winner}
          isSpinning={spinning}
          resetKey={resetKey}
          onFinish={onAnimationComplete}
        />

        <div style={{ marginTop: 20 }}>

          {!spinning && winner ? (
            <button
              className={styles.btn}
              onClick={handleReset}
              style={{ backgroundColor: '#fff', color: '#0f1923' }}
            >
              RESET / RETRY
            </button>
          ) : (
            <button
              className={`${styles.btn} ${spinning ? `${styles.disabled}` : ''}`}
              onClick={handleRandomPick}
              disabled={spinning}
            >
              {spinning ? 'SPINNING...' : 'LOCK IN AGENT'}
            </button>
          )}

        </div>
      </div>
    </>
  );
}
