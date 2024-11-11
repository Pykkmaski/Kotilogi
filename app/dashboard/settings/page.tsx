import { Heading } from '@/components/UI/Heading';
import { EmailSettingsForm } from './EmailSettingsForm';
import { PasswordSettingsForm } from './PasswordSettingsForm';
import { ContentBox } from '@/components/New/Boxes/ContentBox';
import { DeleteUserForm } from './DeleteUserForm';

export default async function SettingsPage() {
  return (
    <main className='flex flex-col w-full items-center'>
      <div className='md:w-[50%] xs:w-full'>
        <ContentBox>
          <div className='flex flex-col gap-10'>
            <div className='flex justify-start w-full'>
              <Heading>Asetukset</Heading>
            </div>
            <EmailSettingsForm />
            <PasswordSettingsForm />
            <DeleteUserForm />
          </div>
        </ContentBox>
      </div>
    </main>
  );
}
