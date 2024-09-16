/**Renders its children within a rounded box, with padding and a shadow. */
export function ContentBox({ children }: React.PropsWithChildren) {
  return (
    <div className='flex rounded-lg shadow-sm lg:p-4 xs:p-2 flex-col bg-white'>{children}</div>
  );
}
