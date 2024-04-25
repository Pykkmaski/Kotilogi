import ResetForm from 'kotilogi-app/app/(blackHeader)/login/reset/_components/ResetForm';
import { Padding } from '@/components/UI/Padding';

export default function ResetPage() {
  return (
    <main className='flex flex-col justify-center md:items-center sm:items-[none] flex-1'>
      <Padding>
        <ResetForm />
      </Padding>
    </main>
  );
}
