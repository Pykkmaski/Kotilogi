export const AddComponentForm = ({ children, ...props }: React.ComponentProps<'form'>) => {
  return (
    <form
      {...props}
      className='flex flex-col gap-4 w-[30%]'>
      {children}
    </form>
  );
};
