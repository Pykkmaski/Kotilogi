import { RenderOnCondition } from '../Util/RenderOnCondition';
import styles from './styles/Spinner.module.scss';

export type SpinnerProps = {
  size?: string;
  message?: string;
  className?: string;
  animated?: boolean;
};

export default function Spinner({ message, animated, size = '1rem', ...props }: SpinnerProps) {
  const className = animated ? `${styles.container} ${styles.animated}` : styles.container;

  return (
    <div className='flex items-center gap-2'>
      <div
        className={[styles.spinner, 'border-white', 'border-t-secondary'].join(' ')}
        style={{ width: size, height: size }}
      />
      <RenderOnCondition condition={message != undefined}>
        <span className='tex-sm text-gray-500'>{message}</span>
      </RenderOnCondition>
    </div>
  );
}
