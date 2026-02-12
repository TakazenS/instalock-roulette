import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';

import { VALORANT_AGENTS } from '../datas.ts';
import type { Agent } from '../models.ts';
import AgentChips from './AgentChips.tsx';
import Roulette from './Roulette.tsx';
import Settings from './Settings.tsx';
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
  const [filters, setFilters] = useState({
    duelist: true,
    initiator: true,
    controller: true,
    sentinel: true,
  });

  useEffect(() => {
    localStorage.setItem('valorant_history', JSON.stringify(history));
  }, [history]);

  const filteredAgents = useMemo(() => {
    return VALORANT_AGENTS.filter((agent) => {
      const roleKey = agent.role.toLowerCase() as keyof typeof filters;
      return filters[roleKey];
    });
  }, [filters]);

  const toggleFilter = (role: keyof typeof filters) => {
    if (spinning) return;
    setFilters(prev => ({
      ...prev,
      [role]: !prev[role]
    }));
  };

  const isAtLeastOneSelected = Object.values(filters).some(val => val);

  const handleRandomPick = () => {
    if (!isAtLeastOneSelected) {
      alert('You have to check at least one role');
      return;
    }

    if (spinning || winner) return;

    const randomIndex = Math.floor(Math.random() * filteredAgents.length);
    setWinner(filteredAgents[randomIndex].id);
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
        if (history.length >= 10) {
          history.pop();
        }
        setHistory((prevHistory) => {
          return [winningAgent, ...prevHistory].slice(0, 10);
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
          agents={filteredAgents}
          winnerId={winner}
          isSpinning={spinning}
          resetKey={resetKey}
          onFinish={onAnimationComplete}
          duration={duration}
        />

        <Settings
          filters={filters}
          toggleFilter={toggleFilter}
          spinning={spinning}
          duration={duration}
          setDuration={setDuration}
          DEFAULT_DURATION={DEFAULT_DURATION}
        />

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
                index={index}
                isNew={index === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
