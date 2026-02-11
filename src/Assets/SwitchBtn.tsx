import { motion } from 'framer-motion';

import styles from './SwitchBtn.module.css';

interface Props {
  winner: string | null;
  isOn: boolean;
  onToggle: () => void;
}

export default function SwitchBtn(props: Props) {
  const { winner, isOn, onToggle } = props;

  let hasWinner;
  if (winner) {
    hasWinner = true;
  }

  return (
    <div
      className={`${styles.switch} ${isOn ? styles.on : styles.off} ${winner ? `${styles.disabled}` : ''}`}
      onClick={() => !winner && onToggle()}
    >
      <motion.button
        className={`${styles.handle} ${winner ? `${styles.disabled}` : ''}`}
        layout
        disabled={hasWinner}
        transition={{
          type: 'spring',
          stiffness: 700,
          damping: 30
        }}
      />
    </div>
  );
}
