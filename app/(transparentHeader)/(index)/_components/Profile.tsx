import { serviceName } from 'kotilogi-app/constants';
import Button from '../../../../components/UI/Button/Button';
import Link from 'next/link';
import { IntroVideo } from './IntroVideo';
import { IntroductionText } from './TextContent';
import { IntroductionReadMoreButton } from './IntroductionReadMoreButton';

export function Introduction() {
  return (
    <section className='xs:px-2 xl:px-64 py-32 flex flex-col text-black'>
      <div className='flex xl:flex-row xs:flex-col-reverse gap-8'>
        <div className='flex flex-col flex-1 xs:items-center xl:items-start'>
          <h1 className='xl:text-7xl xs:text-4xl'>Mikä on Kotidok?</h1>
          <p className='mt-20 text-lg xs:text-center xl:text-left'>
            <IntroductionText />
          </p>

          <IntroductionReadMoreButton />
        </div>

        <div className='flex-1 object-contain items-center justify-center flex'>
          <img src='/img/kotidok_example.png' />
        </div>
      </div>
    </section>
  );
}
