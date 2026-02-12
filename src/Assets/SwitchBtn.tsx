import { motion } from 'framer-motion';

import styles from './SwitchBtn.module.css';

interface Props {
  spinning: boolean;
  isOn: boolean;
  onToggle: () => void;
}

export default function SwitchBtn(props: Props) {
  const { spinning, isOn, onToggle } = props;

  return (
    <div
      className={`${styles.switch} ${isOn ? styles.on : styles.off} ${spinning ? `${styles.disabled}` : ''}`}
      onClick={() => !spinning && onToggle()}
    >
      <motion.button
        className={`${styles.handle} ${spinning ? `${styles.disabled}` : ''}`}
        layout
        disabled={spinning}
        transition={{
          type: 'spring',
          stiffness: 700,
          damping: 30
        }}
      />
    </div>
  );
}
