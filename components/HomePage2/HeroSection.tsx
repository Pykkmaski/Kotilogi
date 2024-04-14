import Link from 'next/link';
import Button from '../Button/Button';

function HeroHeader() {
  const LoginButton = () => (
    <Link href='/login'>
      <Button variant='primary'>
        <span className='mx-8 my-2 text-lg'>Kirjaudu Sisään</span>
      </Button>
    </Link>
  );

  const RegisterButton = () => (
    <Link href='/register'>
      <Button variant='secondary'>Rekisteröidy</Button>
    </Link>
  );

  const NavBar = () => (
    <nav className='flex flex-row gap-4 font-semibold text-white'>
      <Link href='/'>Meistä</Link>
      <Link href='/register'>Rekisteröidy</Link>
      <Link href=''>Jutut</Link>
      <Link href=''>Ota Yhteyttä</Link>
    </nav>
  );

  return (
    <div className='flex flex-row justify-between items-center w-full z-10'>
      <Link href='/'>
        <img src='/logo.png' />
      </Link>
      <NavBar />
      <LoginButton />
    </div>
  );
}

export function HeroSection() {
  const Gradient = () => <div className='absolute top-0 left-0 w-full h-full bg-primary opacity-20' />;

  return (
    <section className='flex flex-col bg-heroSection px-32 relative bg-center bg-cover pt-8'>
      <Gradient />
      <HeroHeader />
      <div className='mt-32 mb-12 z-0 flex flex-col justify-center items-center font-serif text-primary-text'>
        <h1 className='text-[170px] w-full text-center'>Talosi Huoltokirja</h1>
        <Link href='/register' className='mt-32'>
          <Button variant='primary'>
            <span className='my-4 mx-8 text-2xl text-primary-text'>Kokeile Ilmaiseksi</span>
          </Button>
        </Link>
      </div>
    </section>
  );
}
