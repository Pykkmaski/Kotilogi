import Button from '@/components/UI/Button/Button';
import Link from 'next/link';

export function HeroRegisterButton() {
  return (
    <Link
      href='/register'
      className='shadow-lg'>
      <Button variant='secondary-filled'>
        <span className='mx-8 text-xl text-primary-text'>Kokeile Ilmaiseksi</span>
      </Button>
    </Link>
  );
}
