/**@deprecated */
export function MobileMain({ children }: React.PropsWithChildren) {
  return (
    <div className='flex flex-col rounded-t-3xl w-full overflow-hidden overflow-y-scroll'>
      {children}
    </div>
  );
}

/**@deprecated */
export function MobileMainWhite({ children }: React.PropsWithChildren) {
  return (
    <div className='bg-slate-100 rounded-t-3xl'>
      <MobileMain>{children}</MobileMain>
    </div>
  );
}

/**@deprecated */
export function MobileMainSlateGradient({ children }: React.PropsWithChildren) {
  return (
    <div className='bg-gradient-to-b from:bg-white to:bg-slate-100'>
      <MobileMain>{children}</MobileMain>
    </div>
  );
}

/**@deprecated */
export function MobileMainPrimary({ children }: React.PropsWithChildren) {
  return (
    <div className='bg-primary rounded-t-3xl'>
      <MobileMain>{children}</MobileMain>
    </div>
  );
}

/**@deprecated */
export function MobileMainSecondary({ children }: React.PropsWithChildren) {
  return (
    <div className='bg-secondary rounded-t-3xl'>
      <MobileMain>{children}</MobileMain>
    </div>
  );
}

export function MainAllCentered({ children, id }: React.ComponentProps<'main'>) {
  return (
    <main
      className='flex flex-col justify-center items-center h-full px-32 flex-1'
      id={id}>
      {children}
    </main>
  );
}
