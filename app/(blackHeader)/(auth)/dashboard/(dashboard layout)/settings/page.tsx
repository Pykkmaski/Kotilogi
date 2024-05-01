import { getServerSession } from 'next-auth';
import { options } from 'kotilogi-app/app/api/auth/[...nextauth]/options';
import { ContentCard } from '@/components/UI/RoundedBox';
import { EmailSettingsForm } from './_components/EmailSettingsForm';
import { PasswordSettingsForm } from 'kotilogi-app/app/(blackHeader)/(auth)/dashboard/(dashboard layout)/settings/_components/PasswordSettingsForm';
import { Heading } from '@/components/UI/Heading';

export default async function Page() {
  return (
    <main className='flex flex-col gap-4 pb-10'>
      <div className='flex justify-between items-center'>
        <Heading>Tilin asetukset</Heading>
      </div>

      <div className='w-full'>
        <ContentCard title='Turvallisuus'>
          <div className='w-full'>
            <EmailSettingsForm />

            <div className='bg-gray-500 border-t border-gray-200 w-full my-8' />
            <PasswordSettingsForm />
          </div>
        </ContentCard>
      </div>
    </main>
  );
}
