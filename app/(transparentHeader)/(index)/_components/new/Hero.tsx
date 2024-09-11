import Link from 'next/link';
import { CSSProperties } from 'react';
import { HeroText as OldHeroText } from '../TextContent';

const HeroText = () => {
  return (
    <div className='flex flex-col mb-8 z-10'>
      <h1 className='lg:text-6xl xs:text-4xl font-semibold mb-4 w-full lg:text-left xs:text-center text-white tracking-wider'>
        Talosi Huoltokirja
      </h1>
      <p className='lg:text-2xl xs:text-xl xs:text-center lg:text-left lg:w-[70%] xs:w-full text-white'>
        <OldHeroText />
      </p>
    </div>
  );
};

const RegisterButton = () => {
  const buttonStyle = {
    width: '389px',
    height: '66px',
    borderRadius: '100px',

    boxShadow: '0px 2px 4px rgba(100,100,100,0.5)',
    fontSize: '24px',
    fontWeight: '600',
    color: 'black',
  };

  return (
    <Link href='/register'>
      <button
        style={buttonStyle}
        className='bg-gradient-to-r from-[#E3B14B] via-[#FFE5A9] to-[#FFF07C]'>
        REKISTERÖIDY
      </button>
    </Link>
  );
};

const Separator = () => {
  return (
    <div className='flex items-center relative justify-center'>
      <img src='/separator.png' />
      <span className='absolute'>TAI</span>
    </div>
  );
};
export const Hero = () => {
  return (
    <section className='lg:h-[1080px] xs:h-[720px] lg:px-48 xs:px-4 flex flex-col relative lg:items-start py-8 bg-black justify-center bg-[url("/hero_kitchen_background.jpg")] bg-cover'>
      <img
        src='/hero_background_shape.png'
        className='absolute top-0 left-0 z-10 xs:hidden lg:block'
      />

      <img
        src='/hero_kitchen_background.jpg'
        className='absolute top-0 right-0 lg:hidden xs:hidden'
      />

      <div className='flex flex-col gap-6 z-[10] lg:items-start xs:items-center xs:bg-[#0005] lg:bg-none xs:py-4 lg:py-0'>
        <HeroText />
        <div className='flex flex-col gap-[26px]'>
          <RegisterButton />
        </div>
      </div>
    </section>
  );
};
