import { serviceName } from 'kotilogi-app/constants';
import Link from 'next/link';
import { ReloginButton } from './ReloginButton';
import { TitleWithParagraphLayout } from '@/components/UI/TitleWithParagraphLayout';

export default async function EmailConfirmSuccessPage() {
  return (
    <main className='w-full h-full flex flex-row gap-4 items-center justify-center flex-1'>
      <TitleWithParagraphLayout>
        <>Tilin aktivointi onnistui!</>
        <>Tilisi on nyt aktiivinen! Sinun on kirjauduttava ulos että muutokset tulevat voimaan.</>
        <>
          <Link href='/checkout?cp=trial'>
            <ReloginButton>
              <span className='mx-8 font-semibold'>Kirjaudu ulos nyt</span>
            </ReloginButton>
          </Link>
        </>
      </TitleWithParagraphLayout>
    </main>
  );
}
