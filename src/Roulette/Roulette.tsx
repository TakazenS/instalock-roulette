import { motion, useAnimation } from 'framer-motion';
import { useEffect, useMemo, useRef } from 'react';

import type { ValorantRouletteProps } from '../models.ts';
import AgentCard from './AgentCard.tsx';
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

export default function Roulette(valProps: ValorantRouletteProps) {
  const { agents, winnerId, isSpinning, resetKey, onFinish, duration } = valProps;
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  const shuffledAgents = useMemo(() => {
    return shuffleArray(agents);
  }, [agents, resetKey]);

  const visualItems = useMemo(() => {
    return Array.from({ length: MULTIPLIER }).flatMap(() => shuffledAgents);
  }, [shuffledAgents]);

  const cardsList = useMemo(() => {
    return visualItems.map((agent, index) => (
      <AgentCard
        key={`${agent.id}-${index}`}
        agent={agent}
        index={index}
        CARD_WIDTH={CARD_WIDTH}
        CARD_HEIGHT={CARD_HEIGHT}
      />
    ));
  }, [visualItems]);

  useEffect(() => {
    if (isSpinning && winnerId && shuffledAgents.length > 0) {
      const winnerIndex = shuffledAgents.findIndex((a) => a.id === winnerId);

      if (winnerIndex === -1) return;

      const targetRepeatBlock = MULTIPLIER - 5;
      const targetIndex = (shuffledAgents.length * targetRepeatBlock) + winnerIndex;

      const winnerPosition = targetIndex * (CARD_WIDTH + CARD_GAP);

      const containerWidth = containerRef.current?.offsetWidth || 0;
      const centerOffset = containerWidth / 2;

      const targetX = -winnerPosition + centerOffset - (CARD_WIDTH / 2);

      controls.start({
        x: targetX,
        transition: {
          duration: duration,
          ease: [0.15, 0.80, 0.35, 1],
        },
      }).then(() => {
        if (onFinish) onFinish();
      });
    } else if (!isSpinning && winnerId === null) {
      controls.set({ x: 0 });
    }
  }, [isSpinning, winnerId, shuffledAgents, controls, onFinish, duration]);

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
        {cardsList}
      </motion.div>
    </div>
  );
}
