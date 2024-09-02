export const Form = ({ children, onSubmit, onChange, ...props }: React.ComponentProps<'form'>) => {
  return (
    <form
      onSubmit={onSubmit}
      onChange={onChange}
      className='z-10 flex flex-col gap-8 animate-slideup-fast w-[665px]'>
      {children}
    </form>
  );
};
