type LabelGridProps = React.PropsWithChildren & {
  header?: React.ReactNode;
};

export function LabelGrid({ children, header }: LabelGridProps) {
  return (
    <div className='flex flex-col w-full'>
      {header}
      <div className='flex flex-wrap items-center gap-4 w-full'>{children}</div>
    </div>
  );
}

LabelGrid.Entry = ({ label, value }: any) => {
  return (
    <div className='flex flex-col text-left'>
      <span className='text-sm text-slate-500'>{label}</span>
      <span className='font-semibold text-primary'>{value}</span>
    </div>
  );
};
