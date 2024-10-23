import { Spacer } from '../UI/Spacer';

type LabelGridProps = React.PropsWithChildren & {
  header?: React.ReactNode;
};

export function LabelGrid({ children, header }: LabelGridProps) {
  return (
    <Spacer
      direction='col'
      width='full'
      gap='small'>
      {header}
      <div className='md:flex md:flex-wrap xs:grid xs:grid-flow-dense xs:grid-cols-2 items-center md:gap-4 xs:gap-1 w-full'>
        {children}
      </div>
    </Spacer>
  );
}

LabelGrid.Entry = ({ label, value }: any) => {
  return (
    <div className='text-left'>
      <Spacer
        direction='col'
        gap='small'>
        <span className='text-sm text-slate-500'>{label}</span>
        <span className='font-semibold text-secondary xs:text-sm sm:text-base'>{value}</span>
      </Spacer>
    </div>
  );
};
