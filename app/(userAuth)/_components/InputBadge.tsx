import { ReactNode } from 'react';
import styles from './styles.module.css';
import { Check, Clear } from '@mui/icons-material';

type InputBadgeProps = {
  icon: ReactNode;
  variant?: 'success' | 'error';
};

export const InputBadge = ({ icon, variant = 'success' }: InputBadgeProps) => {
  const classes = [
    'lg:w-[41px] xs:w-8 aspect-square rounded-full flex items-center justify-center',
    variant === 'success' ? 'bg-[#28a728]' : 'bg-red-700',
    styles.inputIcon,
  ];
  return <div className={classes.join(' ')}>{icon}</div>;
};

export const ErrorBadge = () => {
  return (
    <InputBadge
      icon={<Clear sx={{ color: 'white' }} />}
      variant='error'
    />
  );
};

export const SuccessBadge = () => {
  return (
    <InputBadge
      icon={<Check sx={{ color: 'white' }} />}
      variant='success'
    />
  );
};
