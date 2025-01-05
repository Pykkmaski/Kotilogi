/**Renders an input to be used in the new forms. */
export function WFAuthInput(props: React.ComponentProps<'input'>) {
  return (
    <input
      {...props}
      className='w-full bg-[#202221] px-5 py-4 rounded-md border-none text-white'
    />
  );
}
