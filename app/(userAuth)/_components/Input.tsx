import { ReactNode } from 'react';
import style from './styles.module.css';

type InputProps = React.ComponentProps<'input'> & {
  badge?: ReactNode;
};

export const Input = ({ badge, ...props }: InputProps) => {
  return (
    <div className='relative flex items-center'>
      <input
        className={style['user-auth-input']}
        {...props}
      />

      <div className={style.inputBadge}>{badge}</div>
    </div>
  );
};
