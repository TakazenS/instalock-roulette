import { motion } from 'framer-motion';
import * as React from 'react';
import { RxCross2 } from 'react-icons/rx';

import type { Agent } from '../models.ts';
import styles from './AgentChips.module.css';

interface Props {
  agent: Agent;
  history: Agent[];
  setHistory: React.Dispatch<React.SetStateAction<Agent[]>>;
  index: number;
  isNew: boolean;
}

export default function AgentChips(props: Props) {
  const { agent, history, setHistory, index, isNew } = props;

  const handleCrossClicked = () => {
    const newHistory = history.filter((_, i) => i !== index);
    setHistory(newHistory);
  };

  return (
    <>
      <motion.div
        initial={isNew ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }}
        animate={isNew ? { opacity: 1, scale: 1 } : { scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
          duration: 1
        }}
        className={styles.containerWrapper}
      >
        <div className={styles.container}>
          <img src={agent.image} alt={agent.id} className={styles.agentIcon}/>
          <div className={styles.agentInfo}>
            <div className={styles.info}>
              <p className={styles.name} translate="no">{agent.name}</p>
              <p className={styles.role}>{agent.role}</p>
            </div>
            <div className={styles.btnContainer}>
              <button className={styles.btn} onClick={handleCrossClicked} type="button">
                <RxCross2 className={styles.crossCircled}/>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
