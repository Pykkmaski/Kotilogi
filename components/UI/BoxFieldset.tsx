'use client';

import { ReactNode, useMemo, useState } from 'react';
import { ToggleProvider } from '../Util/ToggleProvider';
import { ArrowDownward, ArrowUpward, ExpandLess, ExpandMore } from '@mui/icons-material';

function Body({ children, isToggled = true }) {
  return isToggled ? (
    <div className='xs:px-4 md:px-8 py-4 w-full h-full flex'>{children}</div>
  ) : null;
}

type BoxFieldsetProps = React.PropsWithChildren & {
  legend: ReactNode;
  closeable?: boolean;
};

/**Renders an optionally closeable box with a title. */
export function BoxFieldset({ children, legend, closeable }: BoxFieldsetProps) {
  const [isOpen, setIsOpen] = useState(closeable ? false : true);

  const Header = ({ onClick = null }) => {
    const className = useMemo(() => {
      return [
        'flex xs:px-4 md:px-8 py-4 w-full border-b border-slate-200 text-xl font-semibold flex justify-between items-center',
        closeable ? 'cursor-pointer' : '',
      ].join(' ');
    }, [onClick, legend, closeable]);

    const ToggleButton = !isOpen ? ExpandMore : ExpandLess;

    return (
      <div
        title={isOpen ? 'Piilota' : 'Laajenna'}
        className={className}
        onClick={onClick}>
        <span>{legend}</span>
        {closeable ? <ToggleButton /> : null}
      </div>
    );
  };

  const body = closeable ? (
    <ToggleProvider
      state={isOpen}
      onChange={state => setIsOpen(state)}>
      <ToggleProvider.Trigger>
        <Header />
      </ToggleProvider.Trigger>
      <ToggleProvider.Target>
        <Body>{children}</Body>
      </ToggleProvider.Target>
    </ToggleProvider>
  ) : (
    <>
      <Header />
      <Body>{children}</Body>
    </>
  );

  return <div className='flex flex-col w-full bg-white'>{body}</div>;
}
