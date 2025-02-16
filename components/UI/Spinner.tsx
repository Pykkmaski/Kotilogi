import { useMemo } from 'react';
import { RenderOnCondition } from '../Util/RenderOnCondition';
import { Spacer } from './Spacer';

export type SpinnerProps = {
  size?: string;
  message?: string;
  className?: string;
  animated?: boolean;
  color?: 'primary' | 'secondary';
};

/**Renders a spinner. */
export default function Spinner({ message, color = 'secondary', size = '1rem' }: SpinnerProps) {
  const spinnerClassName = useMemo(() => {
    const className = ['border-white border-[3px] animate-spin aspect-square w-4 rounded-full'];
    if (color === 'primary') {
      className.push('border-t-wf-primary');
    } else {
      className.push('border-t-wf-primary');
    }
    return className.join(' ');
  }, [color]);

  return (
    <Spacer
      items='center'
      gap='small'>
      <div
        className={spinnerClassName}
        //style={{ width: size, height: size }}
      />
      <RenderOnCondition condition={message != undefined}>
        <span className='tex-sm text-gray-500'>{message}</span>
      </RenderOnCondition>
    </Spacer>
  );
}
