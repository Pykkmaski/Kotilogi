import { ReactNode } from 'react';
import style from './styles.module.css';

type InputProps = React.ComponentProps<'input'> & {
  badge?: ReactNode;
};

export const Input = ({ badge, ...props }: InputProps) => {
  return (
    <div className='relative flex items-center'>
      <input
        className='lg:pl-10 md:w-[665px] lg:h-20 xs:h-16 xs:w-full bg-white shadow-lg lg:text-2xl xs:text-xl font-normal text-gray-400'
        {...props}
      />

      <div className={style.inputBadge}>{badge}</div>
    </div>
  );
};
