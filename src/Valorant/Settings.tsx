import * as React from 'react';
import { TbReload } from 'react-icons/tb';

import SwitchBtn from '../Assets/SwitchBtn.tsx';
import styles from './Settings.module.css';

interface Filters {
  duelist: boolean;
  initiator: boolean;
  controller: boolean;
  sentinel: boolean;
}

interface Props {
  filters: Filters;
  toggleFilter: (role: keyof Filters) => void;
  spinning: boolean;
  duration: number;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  DEFAULT_DURATION: number;
}

export default function Settings(props: Props) {
  const { filters, toggleFilter, spinning, duration, setDuration, DEFAULT_DURATION } = props;

  return (
    <>
      <div className={styles.settingsWrapper}>
        <div className={styles.settings}>
          <div className={styles.grid}>
            <div className={styles.classeContainer}>
              <img
                src="/img/valorant/classes/duelist.png"
                alt="duelist"
                className={styles.classes}
              />
              <SwitchBtn
                spinning={spinning}
                isOn={filters.duelist}
                onToggle={() => toggleFilter('duelist')}
              />
            </div>
            <div className={styles.classeContainer}>
              <img
                src="/img/valorant/classes/initiator.png"
                alt="initiator"
                className={styles.classes}
              />
              <SwitchBtn
                spinning={spinning}
                isOn={filters.initiator}
                onToggle={() => toggleFilter('initiator')}
              />
            </div>
            <div className={styles.classeContainer}>
              <img
                src="/img/valorant/classes/controller.png"
                alt="controller"
                className={styles.classes}
              />
              <SwitchBtn
                spinning={spinning}
                isOn={filters.controller}
                onToggle={() => toggleFilter('controller')}
              />
            </div>
            <div className={styles.classeContainer}>
              <img
                src="/img/valorant/classes/sentinel.png"
                alt="sentinel"
                className={styles.classes}
              />
              <SwitchBtn
                spinning={spinning}
                isOn={filters.sentinel}
                onToggle={() => toggleFilter('sentinel')}
              />
            </div>
          </div>
          <span className={styles.divider} />
          <div className={styles.timeSettings}>
            <p className={styles.durationText}>Duration in seconds : {duration}</p>
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
      </div>
    </>
  );
}
