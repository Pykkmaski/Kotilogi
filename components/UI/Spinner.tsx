import styles from './styles/Spinner.module.scss';

export type SpinnerProps = {
  size: string;
  message?: string;
  className?: string;
  animated?: boolean;
};

export default function Spinner(props: SpinnerProps) {
  const className = props.animated ? `${styles.container} ${styles.animated}` : styles.container;

  const classes = [className, 'border-green-500'];
  return (
    <div className={classes.join(' ')}>
      <div
        className={styles.spinner}
        style={{ width: props.size, height: props.size }}
      />
      <span className={styles.message}>{props.message}</span>
    </div>
  );
}
