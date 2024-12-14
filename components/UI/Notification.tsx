'use client';

import { Clear, Warning, Check, Info, InfoOutlined } from '@mui/icons-material';
import { ReactNode, useMemo } from 'react';

type NotificationProps = React.ComponentProps<'div'> & {
  icon?: ReactNode;
  variant?: 'success' | 'error' | 'warning' | 'default';
  position?: 'start' | 'center' | 'end' | 'stretch';
};

export function Notification({
  variant = 'default',
  position = 'stretch',
  className,
  children,
  ...props
}: NotificationProps) {
  const _className = useMemo(() => {
    return [
      className,
      'border p-2 flex gap-2 items-center rounded-md justify-between',

      variant == 'success'
        ? 'bg-green-100 border-green-200 text-green-600'
        : variant == 'warning'
        ? 'bg-orange-100 border-orange-200 text-orange-600'
        : variant == 'error'
        ? 'bg-red-100 border-red-200 text-red-600'
        : 'bg-white bg-slate-200 text-black',
    ].join(' ');
  }, [variant]);

  const icon = useMemo(() => {
    const className = [
      variant == 'success'
        ? 'text-green-600'
        : variant == 'warning'
        ? 'text-orange-600'
        : variant == 'error'
        ? 'text-red-600'
        : 'text-black',
    ].join(' ');

    const iconProps = {
      sx: { fontSize: '1.2rem' },
      className: className,
    };

    return variant == 'success' ? (
      <Check {...iconProps} />
    ) : variant == 'warning' ? (
      <Warning {...iconProps} />
    ) : variant == 'error' ? (
      <Clear {...iconProps} />
    ) : (
      <InfoOutlined {...iconProps} />
    );
  }, [variant]);

  const content = useMemo(() => {
    return (
      <div
        {...props}
        className={_className}>
        {icon}
        {children}
      </div>
    );
  }, [children, icon, _className]);

  return position !== 'stretch' ? (
    <div
      className={[
        'flex w-full',
        position == 'start'
          ? 'justify-start'
          : position == 'center'
          ? 'justify-center'
          : position == 'end'
          ? 'justify-end'
          : '',
      ].join(' ')}>
      {content}
    </div>
  ) : (
    content
  );
}
