import Button from '@/components/UI/Button/Button';
import Link from 'next/link';

export function HeroRegisterButton() {
  return (
    <Link
      href='/register'
      className='shadow-lg'>
      <Button variant='accent'>
        <span className='mx-8 text-xl text-primary-text'>Rekisteröidy Ilmaiseksi</span>
      </Button>
    </Link>
  );
}
