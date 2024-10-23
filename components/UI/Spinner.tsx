import { useMemo } from 'react';
import { RenderOnCondition } from '../Util/RenderOnCondition';
import { Spacer } from './Spacer';
import styles from './styles/Spinner.module.scss';

export type SpinnerProps = {
  size?: string;
  message?: string;
  className?: string;
  animated?: boolean;
};

export default function Spinner({ message, animated, size = '1rem' }: SpinnerProps) {
  return (
    <Spacer
      alignItems='center'
      gap='small'>
      <div
        className={[styles.spinner, 'border-white', 'border-t-secondary'].join(' ')}
        style={{ width: size, height: size }}
      />
      <RenderOnCondition condition={message != undefined}>
        <span className='tex-sm text-gray-500'>{message}</span>
      </RenderOnCondition>
    </Spacer>
  );
}

function useSpinnerClassName(animated: boolean) {
  return useMemo(
    () => (animated ? `${styles.container} ${styles.animated}` : styles.container),
    [animated]
  );
}
