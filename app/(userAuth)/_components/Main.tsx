export const Main = ({ children, id }) => (
  <main
    id={id}
    className='flex flex-col gap-4 flex-1 justify-center'>
    {children}
  </main>
);
