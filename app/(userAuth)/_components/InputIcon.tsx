import { ReactNode } from 'react';
import styles from '../styles.module.css';

type InputBadgeProps = {
  icon: ReactNode;
  variant?: 'success' | 'error';
};

export const InputBadge = ({ icon, variant = 'success' }: InputBadgeProps) => {
  const classes = [
    'w-[41px] aspect-square rounded-full flex items-center justify-center',
    variant === 'success' ? 'bg-[#28a728]' : 'bg-red-700',
    styles.inputIcon,
  ];
  return <div className={classes.join(' ')}>{icon}</div>;
};
