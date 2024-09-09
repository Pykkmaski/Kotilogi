import { ReactNode } from 'react';
import styles from './styles.module.css';
import Spinner from '@/components/UI/Spinner';

type ButtonProps = React.ComponentProps<'button'> & {
  icon?: ReactNode;
};

export const Button = ({ children, ...props }: ButtonProps) => {
  const classes = [props.className, styles.button, 'shadow-md'];

  return (
    <button
      {...props}
      className={classes.join(' ')}>
      {children}
    </button>
  );
};

type SubmitButtonProps = ButtonProps & {
  loading?: boolean;
};

export const SubmitButton = ({ children, loading = false, ...props }: SubmitButtonProps) => {
  return (
    <Button
      {...props}
      className={styles.submitButton}>
      {loading ? <Spinner size='2rem' /> : children}
    </Button>
  );
};
