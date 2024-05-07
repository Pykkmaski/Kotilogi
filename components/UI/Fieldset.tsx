export const Fieldset = ({
  children,
  legend,
}: React.ComponentProps<'fieldset'> & { legend: string }) => {
  return (
    <fieldset className='border border-slate-300 p-2 flex-col flex gap-4 rounded-md'>
      <legend className='px-2 text-slate-500 font-semibold'>{legend}</legend>
      {children}
    </fieldset>
  );
};
