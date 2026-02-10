import { motion, useAnimation } from 'framer-motion';
import { useEffect, useMemo, useRef } from 'react';

import type { ValorantRouletteProps } from '../models.ts';
import styles from './Roulette.module.css';

const CARD_WIDTH = 200;
const CARD_HEIGHT = 260;
const CARD_GAP = 15;
const MULTIPLIER = 30;

function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export default function Roulette(props: ValorantRouletteProps) {
  const { agents, winnerId, isSpinning, resetKey, onFinish } = props;
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  const shuffledAgents = useMemo(() => {
    if (agents.length === 0) return [];
    return shuffleArray(agents);
  }, [agents, resetKey]);

  const visualItems = useMemo(() => {
    if (shuffledAgents.length === 0) return [];
    return Array.from({ length: MULTIPLIER }).flatMap(() => shuffledAgents);
  }, [shuffledAgents]);

  useEffect(() => {
    if (isSpinning && winnerId && shuffledAgents.length > 0) {
      const winnerIndex = shuffledAgents.findIndex((a) => a.id === winnerId);

      if (winnerIndex === -1) return;

      const targetRepeatBlock = MULTIPLIER - 5;
      const targetIndex = (shuffledAgents.length * targetRepeatBlock) + winnerIndex;

      const winnerPosition = targetIndex * (CARD_WIDTH + CARD_GAP);

      const randomOffset = Math.floor(Math.random() * (CARD_WIDTH * 0.6)) - (CARD_WIDTH * 0.3);

      const containerWidth = containerRef.current?.offsetWidth || 0;
      const centerOffset = containerWidth / 2;

      const targetX = -winnerPosition + centerOffset - (CARD_WIDTH / 2) + randomOffset;

      controls.start({
        x: targetX,
        transition: {
          duration: 10,
          ease: [0.15, 0.80, 0.35, 1],
        },
      }).then(() => {
        if (onFinish) onFinish();
      });
    }else if (!isSpinning && winnerId === null) {
      controls.set({ x: 0 });
    }
  }, [isSpinning, winnerId, shuffledAgents, controls, onFinish]);

  return (
    <div className={styles.rouletteContainer}>
      <div className={styles.selectorLine} />
      <div className={styles.selectorArrowTop}>▼</div>
      <div className={styles.selectorArrowBottom}>▲</div>

      <div className={styles.overlayLeft} />
      <div className={styles.overlayRight} />

      <motion.div
        ref={containerRef}
        animate={controls}
        initial={{ x: 0 }}
        className={styles.track}
        style={{ gap: `${CARD_GAP}px` }}
      >
        {visualItems.map((agent, index) => (
          <div
            key={`${agent.id}-${index}`}
            className={styles.card}
            style={{
              width: `${CARD_WIDTH}px`,
              height: `${CARD_HEIGHT}px`,
            }}
          >
            <div className={styles.imageContainer}>
              <img className={styles.agentIcon} src={agent.image} alt={agent.id}/>
            </div>
            <div className={styles.infoContainer}>
              <span className={styles.agentName}>{agent.name}</span>
              <span className={styles.agentRole}>{agent.role}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
