import { VisibilityProvider } from '@/components/Util/VisibilityProvider';
import { Clear } from '@mui/icons-material';
import { IconButton } from '@mui/material';

function Backdrop({ children, ...props }: React.ComponentProps<'div'>) {
  const className = [
    !props.hidden ? 'flex' : '',
    'fixed top-0 left-0 bg-[#0005] w-screen h-screen backdrop-blur-sm z-100 items-center justify-center lg:py-4 xs:pb-14',
  ];

  return (
    <div
      hidden={props.hidden}
      className={className.join(' ')}>
      {children}
    </div>
  );
}

/**
 *
 * @param param0
 * @deprecated
 */
export function Modal({ children, ...props }: React.ComponentProps<'div'>) {
  return <Backdrop {...props}>{children}</Backdrop>;
}

Modal.Header = function ({ children }) {
  return (
    <div className='flex justify-between p-2 border-b border-slate-200 items-center'>
      {children}
    </div>
  );
};

Modal.HeaderWithTitle = function ({ title, icon }) {
  return (
    <Modal.Header>
      <div className='flex items-center gap-2 text-lg text-slate-500'>
        <i className={`fa ${icon}`} />
        <h1 className='text-lg text-slate-500'>{title}</h1>
      </div>

      <VisibilityProvider.Trigger>
        <IconButton>
          <Clear />
        </IconButton>
      </VisibilityProvider.Trigger>
    </Modal.Header>
  );
};

Modal.Footer = function ({ children }) {
  return (
    <div className='flex justify-end gap-4 items-center p-2 border-t border-slate-200'>
      {children}
    </div>
  );
};

Modal.Body = function ({ children }) {
  return <div className='w-full p-2 overflow-y-scroll'>{children}</div>;
};

Modal.DefaultContentContainer = function ({ children }) {
  return (
    <div className='animate-slideup-fast justify-self-center flex flex-col bg-white max-h-full rounded-lg shadow-lg text-black lg:w-[900px] xs:w-full xs:mx-2 overflow-y-scroll overflow-hidden'>
      {children}
    </div>
  );
};
