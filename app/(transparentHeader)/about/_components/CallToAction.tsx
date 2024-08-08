import Button from '@/components/UI/Button/Button';
import Link from 'next/link';

export function CallToAction() {
  return (
    <section className='flex flex-col justify-center items-center md:px-32 xs:px-4 py-32 bg-primary text-white'>
      <h1 className='md:text-7xl xs:text-5xl md:mb-10 xs:mb-20'>Aloita sinäkin nyt.</h1>
      <Link
        href='/register'
        className='shadow-lg'>
        <Button variant='accent'>
          <span className='mx-8'>Rekisteröidy</span>
        </Button>
      </Link>
    </section>
  );
}
