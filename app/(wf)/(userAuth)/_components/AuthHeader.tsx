import { Header } from '@/components/WFIndex/Header';
import { PrimaryButton, SecondaryButton } from '@/components/WFIndex/Button';
import Link from 'next/link';

export function AuthHeader() {
  return (
    <Header>
      <Header.LogoContainer>
        <Header.MainNav>
          <Link href='/business'>Yrityksille</Link>
          <Link href='/blog'>Jutut</Link>
          <Link href='/#contact-section'>Ota Yhteyttä</Link>
        </Header.MainNav>
      </Header.LogoContainer>
      <nav className='flex items-center gap-3'>
        <Link href='/login'>
          <SecondaryButton>Kirjaudu</SecondaryButton>
        </Link>

        <Link href='/register'>
          <PrimaryButton>Rekisteröidy</PrimaryButton>
        </Link>
      </nav>
    </Header>
  );
}
