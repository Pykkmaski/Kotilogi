export function WFAuthForm({ children, ...props }: React.ComponentProps<'form'>) {
  return (
    <form
      {...props}
      className='flex flex-col gap-10'>
      {children}
    </form>
  );
}
