import { memo } from 'react';

import type { Agent } from '../models.ts';
import styles from './AgentCard.module.css';

interface Props {
  agent: Agent;
  index: number;
  CARD_WIDTH: number;
  CARD_HEIGHT: number;
}

function AgentCard(props: Props) {
  const { agent, index, CARD_WIDTH, CARD_HEIGHT } = props;

  return (
    <>
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
    </>
  );
}

export default memo(AgentCard);
