import { VisibilityProvider } from './Util/VisibilityProvider/VisibilityProvider';

function DottedButton() {
  return (
    <div className='flex flex-col gap-1'>
      <div className='rounded-[50%] aspect-square w-2 bg-slate-500' />
      <div className='rounded-[50%] aspect-square w-2 bg-slate-500' />
      <div className='rounded-[50%] aspect-square w-2 bg-slate-500' />
    </div>
  );
}

export function DottedButtonMenu({ children }: React.PropsWithChildren) {
  return (
    <VisibilityProvider>
      <div className='flex flex-col gap-2 relative'>
        <VisibilityProvider.Trigger>
          <DottedButton />
        </VisibilityProvider.Trigger>

        <VisibilityProvider.Target>{children}</VisibilityProvider.Target>
      </div>
    </VisibilityProvider>
  );
}
