export const Form = ({ children, onSubmit, onChange, ...props }: React.ComponentProps<'form'>) => {
  return (
    <form
      onSubmit={onSubmit}
      onChange={onChange}
      className='z-10 flex flex-col gap-8 animate-slideup-fast lg:w-[665px] xs:w-full'>
      {children}
    </form>
  );
};
