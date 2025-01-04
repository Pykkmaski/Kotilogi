'use client';

import Spinner from '@/components/UI/Spinner';
import { useMemo } from 'react';

type WFAuthSubmitButtonProps = Omit<React.ComponentProps<'button'>, 'className'> & {
  loading?: boolean;
  loadingMessage?: string;
};

/**Renders the submit-button of auth-forms. */
export function WFAuthSubmitButton({
  children,
  loading,
  loadingMessage,
  ...props
}: WFAuthSubmitButtonProps) {
  const content = useMemo(() => {
    return loading ? <Spinner message={loadingMessage} /> : children;
  }, [loading, children]);

  return (
    <button
      {...props}
      className='transition-colors duration-700 rounded-md bg-wf-primary py-4 px-7 flex justify-center items-center disabled:bg-wf-secondary'>
      {content}
    </button>
  );
}
