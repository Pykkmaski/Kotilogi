import Link from 'next/link';
import Button from '../../../../components/UI/Button/Button';

export function CallToActionSection() {
  const Background = () => {
    return (
      <div className='absolute top-0 left-0 w-full h-full bg-room bg-center bg-cover opacity-50' />
    );
  };

  return (
    <section className='flex flex-col py-32 bg-transparent'>
      <div className='flex-col flex gap-4 text-primary-text relative py-32'>
        <Background />

        <div className='flex flex-col z-10 items-center bg-[#0005] py-8'>
          <h1 className='xl:text-8xl xs:text-4xl text-center xl:mb-20 xs:mb-20 z-10'>
            Perusta sinäkin kodillesi
            <br /> sähköinen huoltokirja
          </h1>

          <Link href='/register'>
            <Button variant='primary'>
              <span className='mx-8 my-2 text-black'>Rekisteröidy nyt</span>
            </Button>
          </Link>

          <p className='text-xl mt-10 w-full text-center text-hero'>
            Yksittäisen lisätyn talon vuosihinta on 9,90€.
          </p>
        </div>
      </div>
    </section>
  );
}
