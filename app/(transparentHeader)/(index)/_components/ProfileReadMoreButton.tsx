import Button from '@/components/UI/Button/Button';
import Link from 'next/link';

export function ProfileReadMoreButton() {
  return (
    <Link
      href='/about'
      className='mt-8 shadow-lg'>
      <Button variant='primary'>
        <span className='mx-32 my-4 text-lg font-semibold'>Lue Lisää</span>
      </Button>
    </Link>
  );
}
