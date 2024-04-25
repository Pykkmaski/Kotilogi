import { serviceName } from 'kotilogi-app/constants';
import Button from '../../../../components/UI/Button/Button';
import Link from 'next/link';
import { IntroVideo } from './IntroVideo';
import { ProfileText } from './TextContent';
import { ProfileReadMoreButton } from './ProfileReadMoreButton';

export function Profile() {
  return (
    <section className='xs:px-2 xl:px-32 py-32 flex flex-col bg-secondary text-primary-text'>
      <div className='flex xl:flex-row xs:flex-col-reverse gap-8'>
        <div className='flex flex-col flex-1 xs:items-center xl:items-start'>
          <h1 className='xl:text-7xl xs:text-4xl'>Mikä on Kotidok?</h1>
          <p className='mt-20 text-lg xs:text-center xl:text-left'>
            <ProfileText />
          </p>

          <ProfileReadMoreButton />
        </div>

        <div className='flex-1 object-contain items-center justify-center flex'>
          <IntroVideo />
        </div>
      </div>
    </section>
  );
}
