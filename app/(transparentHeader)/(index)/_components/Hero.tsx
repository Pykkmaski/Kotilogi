import Link from 'next/link';
import { Group } from '@/components/UI/Group';
import { PrimaryButton } from '@/components/UI/Button/PrimaryButton';
import { serviceName } from 'kotilogi-app/constants';
import Button from '../../../../components/UI/Button/Button';
import { HeroText, HeroTitleText } from './TextContent';
import { HeroRegisterButton } from './HeroRegisterButton';

export async function Hero() {
  return (
    <section className='flex flex-col gap-5 relative text-primary-text'>
      <span className='xl:text-8xl xs:text-5xl text-primary-text xs:text-center xl:text-left'>
        <HeroTitleText />
      </span>
      <p className='text-xl mb-5 xs:text-center xl:text-left'>
        <HeroText />
      </p>

      <div className='flex flex-1 xs:justify-center lg:justify-start items-center gap-4'>
        <HeroRegisterButton />
      </div>
    </section>
  );
}
