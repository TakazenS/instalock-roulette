import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { TbReload } from "react-icons/tb";

import { VALORANT_AGENTS } from '../datas.ts';
import type { Agent } from '../models.ts';
import AgentChips from './AgentChips.tsx';
import Roulette from './Roulette.tsx';
import styles from './ValorantPage.module.css';

const DEFAULT_DURATION = 5;

export default function ValorantPage() {
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [resetKey, setResetKey] = useState(0);
  const [duration, setDuration] = useState(DEFAULT_DURATION);
  const [history, setHistory] = useState<Agent[]>(() => {
    const saved = localStorage.getItem('valorant_history');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('valorant_history', JSON.stringify(history));
  }, [history]);

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
    if (winner) {
      const winningAgent = VALORANT_AGENTS.find(a => a.id === winner);
      if (winningAgent) {
        if (history.length >= 5) {
          history.pop();
        }
        setHistory((prevHistory) => {
          return [winningAgent, ...prevHistory].slice(0, 5);
        });
      }
    }
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
          duration={duration}
        />

        <div className={styles.settingsWrapper}>
          <div className={styles.settings}>
            <p>Duration in seconds : {duration}</p>
            <button
              disabled={spinning}
              className={`${styles.btn} ${styles.plus} ${spinning ? `${styles.disabled}` : ''}`}
              onClick={() => {
                if (duration === 30) return;
                setDuration(prev => prev + 1);
              }}
            >
              +
            </button>
            <button
              disabled={spinning}
              className={`${styles.btn} ${styles.less} ${spinning ? `${styles.disabled}` : ''}`}
              onClick={() => {
                if (duration === 1) return;
                setDuration(prev => prev - 1);
              }}
            >
              -
            </button>
            <button
              disabled={spinning}
              className={`${styles.reloadBtn} ${spinning ? `${styles.disabled}` : ''}`}
              onClick={() => setDuration(DEFAULT_DURATION)}
            >
              <TbReload className={`${styles.reloadIcon} ${spinning ? `${styles.disabled}` : ''}`} />
            </button>
          </div>
        </div>

        <div className={styles.btnContainer}>
          {!spinning && winner ? (
            <div className={styles.resetWrapper}>
              <button
                className={`${styles.btn} ${styles.reset}`}
                onClick={handleReset}
              >
                RESET
              </button>
            </div>
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

        <div className={styles.history}>
          <div>
            {history.length > 0 && (
              <h2 className={styles.historyTitle}>History</h2>
            )}
          </div>
          <div className={styles.historyChips}>
            {history.map((agent, index) => (
              <AgentChips
                key={`${agent.id}-${index}`}
                agent={agent}
                history={history}
                setHistory={setHistory}
                index={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
