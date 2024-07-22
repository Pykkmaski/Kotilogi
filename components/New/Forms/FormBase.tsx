export function FormBase({ children, ...props }: React.ComponentProps<'form'>) {
  return (
    <form
      {...props}
      className='flex flex-col lg:mx-64 xs:mx-0 gap-4 p-2 bg-white shadow-md rounded-lg'>
      {children}
    </form>
  );
}
