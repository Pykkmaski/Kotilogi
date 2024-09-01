import { Padding } from '@/components/UI/Padding';
import ResetForm from './_components/ResetForm';

export default function ResetPage() {
  return (
    <main className='flex flex-col justify-center md:items-center sm:items-[none] flex-1'>
      <Padding>
        <ResetForm />
      </Padding>
    </main>
  );
}
