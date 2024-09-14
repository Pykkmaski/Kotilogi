type LabelGridProps = React.PropsWithChildren & {
  header?: React.ReactNode;
};

export function LabelGrid({ children, header }: LabelGridProps) {
  return (
    <div className='flex flex-col w-full'>
      {header}
      <div className='md:flex md:flex-wrap xs:grid xs:grid-flow-dense xs:grid-cols-2 items-center md:gap-4 xs:gap-1 w-full'>
        {children}
      </div>
    </div>
  );
}

LabelGrid.Entry = ({ label, value }: any) => {
  return (
    <div className='flex flex-col text-left'>
      <span className='text-sm text-slate-500'>{label}</span>
      <span className='font-semibold text-primary xs:text-sm sm:text-base'>{value}</span>
    </div>
  );
};
