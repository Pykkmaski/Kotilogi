import Link from 'next/link';
import { CSSProperties } from 'react';
import { HeroText as OldHeroText } from './TextContent';

const HeroText = () => {
  return (
    <div className='flex flex-col mb-8 z-10'>
      <h1 className='2xl:text-6xl xs:text-3xl font-semibold mb-4 w-full 2xl:text-left xs:text-center text-white tracking-wider'>
        Talosi Huoltokirja
      </h1>
      <p className='2xl:text-2xl xs:text-xl xs:text-center 2xl:text-left 2xl:w-[70%] xs:w-full text-white'>
        <OldHeroText />
      </p>
    </div>
  );
};

const RegisterButton = () => {
  return (
    <Link
      href='/register'
      className={`
        flex 
        items-center 
        justify-center 
        shadow-lg 
        bg-gradient-to-r
        from-[#E3B14B] via-[#FFE5A9] to-[#FFF07C] 
        sm:w-[389px] 
        xs:w-full
        h-[64px] 
        rounded-full 
        text-black 
        font-semibold 
        xs:text-xl
        2xl:text-2xl`}>
      <span>REKISTERÖIDY</span>
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
    <section className='h-screen 2xl:px-36 xs:px-4 flex flex-col relative 2xl:items-start py-8 bg-black justify-center lg:bg-right xs:bg-center bg-[url("/hero_kitchen_background.jpg")] bg-cover'>
      <img
        src='/hero_background_shape.png'
        className='absolute top-0 left-0 z-10 xs:hidden 2xl:block h-screen aspect-auto'
      />

      <div className='flex flex-col gap-6 z-[10] xs:px-2 lg:px-0 2xl:items-start xs:items-center xs:bg-[#0006] 2xl:bg-transparent xs:py-4 2xl:py-0 rounded-md'>
        <HeroText />
        <div className='flex flex-col gap-[26px] xs:w-full sm:w-auto'>
          <RegisterButton />
        </div>
      </div>
    </section>
  );
};
