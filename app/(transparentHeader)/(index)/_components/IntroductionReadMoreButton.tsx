import Button from '@mui/material/Button';
import Link from 'next/link';

export function IntroductionReadMoreButton() {
  return (
    <Link
      href='/about'
      className='mt-8 shadow-lg'>
      <Button
        variant='contained'
        color='secondary'>
        <span className='mx-32 my-4 text-lg font-semibold'>Lue Lisää</span>
      </Button>
    </Link>
  );
}
