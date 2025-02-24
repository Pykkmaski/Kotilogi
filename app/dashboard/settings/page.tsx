import { Heading } from '@/components/UI/Heading';
import { EmailSettingsForm } from './EmailSettingsForm';
import { PasswordSettingsForm } from './PasswordSettingsForm';
import { ContentBox } from '@/components/New/Boxes/ContentBox';
import { DeleteUserForm } from './DeleteUserForm';
import { BoxFieldset } from '@/components/UI/BoxFieldset';

export default async function SettingsPage() {
  return (
    <main className='flex flex-col w-full items-center'>
      <div className='xl:w-[90%] xs:w-full'>
        <BoxFieldset legend='Asetukset'>
          <div className='flex flex-col gap-10 w-full'>
            <EmailSettingsForm />
            <PasswordSettingsForm />
            <DeleteUserForm />
          </div>
        </BoxFieldset>
      </div>
    </main>
  );
}
