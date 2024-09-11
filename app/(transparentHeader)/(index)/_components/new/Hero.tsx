import Link from 'next/link';
import { CSSProperties } from 'react';

const HeroText = () => {
  return <h1 className='text-[72px] font-[600]'>Talosi Huoltokirja</h1>;
};

const RegisterButton = () => {
  const buttonStyle = {
    width: '340.91px',
    height: '73.05px',
    borderRadius: '100px',
    background: 'linear-gradient(270deg, #363fb8 0%, #fd0095 100%)',
    backgroundBlendMode: 'normal',
    boxShadow: '0px 2px 4px rgba(100,100,100,0.5)',
    fontSize: '24px',
    fontWeight: '600',
    color: 'white',
  };

  return (
    <Link href='/register'>
      <button style={buttonStyle}>REKISTERÖIDY</button>
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
  const sectionStyle: CSSProperties = {
    background: 'linear-gradient(180deg, rgba(61,102,217,0.57) 0%, #ffffff 100%)',
  };

  return (
    <section
      className='h-screen px-[100px] flex flex-col relative items-start py-8'
      style={sectionStyle}>
      <img
        src='/hero_image.png'
        className='absolute right-[100px] top-[120px]'
      />
      <div className='flex flex-col gap-[26px] z-[10] mt-[300px] items-start'>
        <HeroText />
        <div className='flex flex-col gap-[26px]'>
          <RegisterButton />
          <Separator />
          <Link
            href='/login'
            className='w-full text-center font-[600] text-[18px]'>
            KIRJAUDU SISÄÄN
          </Link>
        </div>
      </div>
    </section>
  );
};
