'use client';
import React, { useId, useState } from 'react';
import clsx from 'clsx';
import {
  Play,
  Pause,
  RotateCcw,
} from 'react-feather';

import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';
import { motion, LayoutGroup } from 'framer-motion';

import styles from './CircularColorsDemo.module.css';

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

function CircularColorsDemo() {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const id = useId();
  const selectedColor = COLORS[timeElapsed % COLORS.length];


  React.useEffect(() => {
    if (!isPlaying) return;
    const id = window.setInterval(() => {
      setTimeElapsed((currentValue) => currentValue + 1)
    }, 1000)

    return () => window.clearInterval(id)
  }, [isPlaying])

  return (
    <LayoutGroup>
      <Card as="section" className={styles.wrapper}>
        <ul className={styles.colorsWrapper}>
          {COLORS.map((color, index) => {
            const isSelected =
              color.value === selectedColor.value;

            return (
              <li
                className={styles.color}
                key={index}
              >
                {isSelected && (
                  <motion.div
                    layoutId={`${id}-selected-color-outline}`}
                    className={
                      styles.selectedColorOutline
                    }
                  />
                )}
                <div
                  className={clsx(
                    styles.colorBox,
                    isSelected &&
                    styles.selectedColorBox
                  )}
                  style={{
                    backgroundColor: color.value,
                  }}
                >
                  <VisuallyHidden>
                    {color.label}
                  </VisuallyHidden>
                </div>
              </li>
            );
          })}
        </ul>

        <div className={styles.timeWrapper}>
          <dl className={styles.timeDisplay}>
            <dt>Time Elapsed</dt>
            <dd>{timeElapsed}</dd>
          </dl>
          <div className={styles.actions}>
            <button onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause /> : <Play />}
              <VisuallyHidden>Play</VisuallyHidden>
            </button>
            <button onClick={() => {
              setIsPlaying(!isPlaying)
              setTimeElapsed(0)
            }}>
              <RotateCcw />
              <VisuallyHidden>Reset</VisuallyHidden>
            </button>
          </div>
        </div>
      </Card>
    </LayoutGroup>
  );
}

export default CircularColorsDemo;
