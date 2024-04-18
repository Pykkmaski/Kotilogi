export function CloseButton(props: React.ComponentProps<'div'>) {
  return (
    <div {...props} className='cursor-pointer' title='Sulje'>
      <div className='relative w-[32px] aspect-square flex justify-center items-center'>
        <div className='bg-slate-500 absolute w-[2px] h-6 -rotate-45'></div>
        <div className='bg-slate-500 absolute w-[2px] h-6 rotate-45'></div>
      </div>
    </div>
  );
}
