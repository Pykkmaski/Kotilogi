import styles from './styles/Spinner.module.scss';

export type SpinnerProps = {
  size: string;
  message?: string;
  className?: string;
  animated?: boolean;
};

export default function Spinner({ message, animated, size, ...props }: SpinnerProps) {
  const className = animated ? `${styles.container} ${styles.animated}` : styles.container;

  return (
    <div className='flex items-center gap-2'>
      <div
        className={[styles.spinner, 'border-white', 'border-t-primary'].join(' ')}
        style={{ width: size, height: size }}
      />
      {message && <span className='tex-sm text-gray-500'>{message}</span>}
    </div>
  );
}
