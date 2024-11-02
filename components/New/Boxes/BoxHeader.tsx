import { Spacer } from '../../UI/Spacer';
import { SecondaryHeading } from '../Typography/Headings';

export function BoxHeader({ children }: React.PropsWithChildren) {
  return <div className='flex items-center justify-between lg:mb-8 xs:mb-4 w-full'>{children}</div>;
}

export function BoxTitle({ icon, text }) {
  return (
    <div className='text-slate-500 text-lg'>
      <Spacer
        gap={'small'}
        items='center'>
        {icon}
        <SecondaryHeading>{text}</SecondaryHeading>
      </Spacer>
    </div>
  );
}
