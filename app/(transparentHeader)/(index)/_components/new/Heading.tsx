export const Heading = ({ children }: React.ComponentProps<'h1'>) => {
  return (
    <h1 className='xs:text-4xl 2xl:text-5xl font-semibold w-full xs:text-left 2xl:text-start'>
      {children}
    </h1>
  );
};
