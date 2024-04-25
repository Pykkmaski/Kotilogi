import Spinner from '@/components/UI/Spinner';

export default function Loading() {
  return (
    <div className='flex flex-col items-center justify-center flex-1 text-slate-500'>
      <Spinner size='2rem' />
    </div>
  );
}
