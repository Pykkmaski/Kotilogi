import Header from '@/components/App/Header';

export default function TransparentHeaderLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <div className='z-20 w-full'>
        <Header variant='transparent' />
      </div>

      {children}
    </>
  );
}
