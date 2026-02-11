import type { Agent } from '../models.ts';
import styles from './AgentChips.module.css';

interface Props {
  agent: Agent;
}

export default function AgentChips(props: Props) {
  const { agent } = props;

  return (
    <>
      <div className={styles.containerWrapper}>
        <div className={styles.container}>
          <img src={agent.image} alt={agent.id} className={styles.agentIcon}/>
          <div className={styles.agentInfo}>
            <p className={styles.name}>{agent.name}</p>
            <p className={styles.role}>{agent.role}</p>
          </div>
        </div>
      </div>
    </>
  );
}
