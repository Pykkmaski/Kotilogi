import { PropertyForm } from './_components/PropertyForm';
import { verifySession } from 'kotilogi-app/utils/verifySession';
import { properties } from 'kotilogi-app/dataAccess/properties';
import { SecondaryHeading } from '@/components/New/Typography/Headings';
import { getPropertyRefs } from '../actions';
import { BoxFieldset } from '@/components/UI/Fieldset';

export default async function AddPropertyPage() {
  const session = await verifySession();
  try {
    await properties.verifyUserPropertyCount(session);
  } catch (err) {
    //return redirect('/dashboard');
  }

  const refs = await getPropertyRefs();

  return (
    <main className='flex justify-center w-full'>
      <div className='xs:w-full xl:w-[90%] flex flex-col gap-4'>
        <SecondaryHeading>Uuden talon luonti</SecondaryHeading>
        <PropertyForm refs={refs} />
      </div>
    </main>
  );
}
