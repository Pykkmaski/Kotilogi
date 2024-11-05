import { SiteHeader } from '../../components/App/SiteHeader';

export default function BlackHeaderLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <SiteHeader variant='auth' />
      {children}
    </>
  );
}
