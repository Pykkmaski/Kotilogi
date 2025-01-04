import { useMemo } from 'react';
import { RenderOnCondition } from '../Util/RenderOnCondition';
import { Spacer } from './Spacer';
import styles from './styles/Spinner.module.scss';

export type SpinnerProps = {
  size?: string;
  message?: string;
  className?: string;
  animated?: boolean;
  color?: 'primary' | 'secondary';
};

export default function Spinner({ message, color = 'secondary', size = '1rem' }: SpinnerProps) {
  const spinnerClassName = useMemo(() => {
    const className = [styles.spinner, 'border-white'];
    if (color === 'primary') {
      className.push('border-t-wf-primary');
    } else {
      className.push('border-t-wf-primary');
    }
    return className.join(' ');
  }, [color]);

  return (
    <Spacer
      items='center'
      gap='small'>
      <div
        className={spinnerClassName}
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
