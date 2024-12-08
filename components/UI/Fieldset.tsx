import { PassProps } from '../Util/PassProps';

export const Fieldset = ({
  children,
  legend,
}: React.ComponentProps<'fieldset'> & { legend: string }) => {
  return (
    <fieldset className='border p-2 flex-col flex gap-4 rounded-md bg-white'>
      <legend className='px-2 text-slate-500 font-semibold'>{legend}</legend>
      {children}
    </fieldset>
  );
};

export const BoxFieldset = ({ children, legend }) => {
  return (
    <div className='flex flex-col w-full bg-white'>
      <div className='flex xs:px-4 md:px-8 py-4 w-full border-b border-slate-200 text-xl font-semibold'>
        {legend}
      </div>
      <div className='xs:px-4 md:px-8 py-4 w-full h-full flex'>{children}</div>
    </div>
  );
};
