import { CloseButton } from '@/components/CloseButton';
import { VisibilityProvider } from '@/components/Util/VisibilityProvider';

function Backdrop({ children, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      {...props}
      className='fixed top-0 left-0 bg-[#0005] w-screen h-screen backdrop-blur-sm z-20'>
      {children}
    </div>
  );
}

function ModalContainer({ children, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className='flex items-center justify-center w-full h-full relative z-30 animate-slideup-fast overflow-hidden'>
      {children}
    </div>
  );
}

export function Modal({ children, ...props }: React.ComponentProps<'div'>) {
  return (
    <Backdrop {...props}>
      <ModalContainer hidden={props.hidden}>{children}</ModalContainer>
    </Backdrop>
  );
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
        <CloseButton />
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
  return <div className='w-full p-2'>{children}</div>;
};

Modal.DefaultContentContainer = function ({ children }) {
  return (
    <div className='flex flex-col bg-white rounded-lg overflow-hidden shadow-lg text-black lg:w-[800px] xs:w-full xs:mx-2'>
      {children}
    </div>
  );
};
