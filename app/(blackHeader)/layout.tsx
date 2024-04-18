import Header from '@/components/App/Header';

export default function TransparentHeaderLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
