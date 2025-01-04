'use client';

import { useIndexPageContext } from 'kotilogi-app/app/IndexPageProvider';
import Link from 'next/link';
import { useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

/**Renders the hero-section. */
export function Hero() {
  const { aboutRef } = useIndexPageContext();
  const { inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const contentClassName = useMemo(() => {
    return ['flex flex-col gap-10 transition-opacity', inView ? 'opacity-1' : 'opacity-1'].join(
      ' '
    );
  }, [inView]);

  return (
    <section className='flex xs:flex-col lg:flex-row items-center px-wf-index py-wf-index justify-center w-full'>
      <div className='lg:grid lg:grid-cols-2 lg:gap-20 xs:flex xs:flex-col xs:gap-8'>
        <div className={contentClassName}>
          <h1
            id='hero-heading'
            className='lg:text-7xl xs:text-5xl text-white font-semibold'>
            Talosi Huoltokirja
          </h1>
          <p className='text-white opacity-75 text-xl'>
            Kotidok on ensimmäinen palvelu, joka tarjoaa sinulle mahdollisuuden tallentaa kotisi
            remontit, kulutustiedot, ylläpitotoimenpiteet ja niihin liittyvät asiakirjat yhteen{' '}
            paikkaan - digitaaliseen huoltokirjaan. Kun talosi myynti koittaa voit siirtää koko
            historian seuraavalle omistajalle.
          </p>
          <div
            id='hero-buttons'
            className='flex items-center gap-4 w-full'>
            <Link href='/register'>
              <button className='p-4 rounded-lg bg-[#ffc44d] text-black'>Aloita Nyt</button>
            </Link>

            <button
              className='p-4 rounded-lg bg-wf-secondary text-white'
              onClick={() => {
                aboutRef.current?.scrollIntoView({
                  behavior: 'smooth',
                });
              }}>
              Lue Lisää
            </button>
          </div>
        </div>

        <div id='hero-chart-image-container'>
          <img src='/images/hero_chart_image.avif' />
        </div>
      </div>
    </section>
  );
}
