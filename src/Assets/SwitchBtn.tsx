import { motion } from 'framer-motion';

import type { ValFilters } from '../models.ts';
import styles from './SwitchBtn.module.css';

interface Props {
  winner: string | null;
  filters: ValFilters;
  isOn: boolean;
  onToggle: () => void;
}

export default function SwitchBtn(props: Props) {
  const { winner, filters, isOn, onToggle } = props;

  const activeCount = Object.values(filters).filter(val => val).length;
  const isLastActive = isOn && activeCount === 1;
  const isLocked = !!winner || isLastActive;

  return (
    <div
      className={`
        ${styles.switch}
        ${isOn ? styles.on : styles.off}
        ${winner ? `${styles.disabled}` : ''}
      `}
      onClick={() => !isLocked && onToggle()}
      style={{ cursor: isLocked ? 'not-allowed' : 'pointer', opacity: isLocked ? 0.5 : 1 }}
    >
      <motion.button
        className={`
          ${styles.handle}
          ${winner ? `${styles.disabled}` : ''}
        `}
        style={{ cursor: isLocked ? 'not-allowed' : 'pointer' }}
        layout
        disabled={isLocked}
        transition={{
          type: 'spring',
          stiffness: 700,
          damping: 30
        }}
      />
    </div>
  );
}
