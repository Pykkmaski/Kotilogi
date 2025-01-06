export function BaseCTASection({ children }: React.PropsWithChildren) {
  return (
    <section className='px-wf-index bg-wf-cta flex flex-col justify-center items-center py-wf-index relative'>
      <div className='absolute top-0 left-0 w-full h-full z-10 bg-[#000a]' />
      <div className='bg-cta grayscale bg-cover w-full h-full z-0 absolute top-0 left-0 xl:bg-[center_top_900px]' />
      <div className='flex flex-col gap-8 items-center z-20'>{children}</div>
    </section>
  );
}

export function CTAHeading({ children }: Omit<React.ComponentProps<'h1'>, 'className'>) {
  return <h1 className='text-7xl text-white text-center'>{children}</h1>;
}

export function CTAParagraph({ children }: Omit<React.ComponentProps<'h1'>, 'className'>) {
  return <p className='text-3xl text-center text-white'>{children}</p>;
}
