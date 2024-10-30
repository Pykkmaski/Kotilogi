import Header from '@/components/App/Header';

export default function BlackHeaderLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
