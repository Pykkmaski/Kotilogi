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
      className='shadow-lg text-white bg-primary lg:text-2xl xs:text-xl lg:w-96 xs:w-full rounded-full py-4 font-semibold'>
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
