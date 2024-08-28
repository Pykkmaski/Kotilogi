import { Bolt, FileCopy, History, Info } from '@mui/icons-material';
import Image from 'next/image';
import React from 'react';

export function FeaturesSection() {
  const FeaturesList = () => {
    const FeatureCard = ({ title, description }) => (
      <div className='flex flex-col text-center'>
        <h2 className='text-2xl xl:mb-8 xs:mb-2 font-semibold'>{title}</h2>
        <p className='text-xl'>{description}</p>
      </div>
    );

    return (
      <div className='flex xl:flex-row xs:flex-col gap-8 z-10'>
        <FeatureCard
          title='Remonttihistoria'
          description='Tallenna kaikki korjaustoimenpiteet kuvien ja kuittien kanssa.'
        />

        <FeatureCard
          title='Asiakirjat'
          description='Esimerkiksi talon pohjapiirustukset on hyvä pitää tallessa.'
        />
        <FeatureCard
          title='Kuvat'
          description='Ota kuvia talostasi vuosien varrella ja talleta ne tähän osioon.'
        />
      </div>
    );
  };

  const Background = () => (
    <div className='bg-kitchen bg-cover bg-center absolute top-0 left-0 w-full h-full' />
  );

  return (
    <section className='flex flex-col gap-4 xl:py-0 xs:py-0 overflow-hidden shadow-lg'>
      <div className='flex flex-col text-white items-center xl:py-32 xs:py-10 relative gap-4'>
        <Background />
        <div className='w-full bg-[#0006] py-20 flex flex-col items-center justify-center z-10 xl:px-32 xs:px-4'>
          <h1 className='xl:text-7xl xs:text-3xl mb-20 z-10 font-semibold text-center w-full'>
            Kaikki yhdessä paikassa
          </h1>
          <FeaturesList />
        </div>
      </div>
    </section>
  );
}

export const FeaturesSection2 = () => {
  const FeatureItem = ({
    title,
    imageUrl,
    description,
    inverted = false,
    icon,
  }: {
    title: string;
    description: string;
    imageUrl: string;
    inverted?: boolean;
    icon?: React.ReactNode;
  }) => {
    const containerClasses = [
      'flex gap-4 w-full justify-center items-start',
      inverted ? 'flex-row-reverse' : 'flex-row',
    ];
    return (
      <div className={containerClasses.join(' ')}>
        <div className='flex flex-col gap-2 xs:justify-center xl:justify-start w-full h-full pt-4'>
          <h1 className='md:text-4xl xs:text-2xl'>{title}</h1>
          <p className='text-2xl xs:text-center xl:text-left'>{description}</p>
        </div>
      </div>
    );
  };

  const Images = () => {
    const Container = ({ children, offset = 0 }) => {
      const classes = ['aspect-square w-[100px]', `translate-x-${offset}`];
      return <div className={classes.join(' ')}>{children}</div>;
    };

    return (
      <div className='w-full h-full flex flex-col relative'>
        <Container>
          <Image
            alt=''
            src='/features/data.png'
            objectFit='contain'
            fill
          />
        </Container>

        <Container offset={2}>
          <Image
            alt=''
            src='/features/utility.png'
            objectFit='contain'
            fill
          />
        </Container>

        <Container offset={4}>
          <Image
            alt=''
            src='/features/data.png'
            objectFit='contain'
            fill
          />
        </Container>
      </div>
    );
  };

  return (
    <section className='w-full xl:px-64 xs:px-2 bg-secondary text-white xl:py-32 xs:py-8 flex flex-col gap-4'>
      <div className='flex-col flex gap-4'>
        <h1 className='xl:text-7xl xs:text-3xl mb-20 z-10 font-semibold w-full'>
          Kaikki yhdessä paikassa
        </h1>
        <div className='flex gap-4 w-full'>
          <div className='flex flex-col w-full gap-10'>
            <FeatureItem
              title='Tiedot'
              description='Tallenna kiinteistösi tai huoneistosi tiedot myöhempää viittausta varten.'
              imageUrl='/features/data.png'
            />
            <FeatureItem
              title='Tapahtumat'
              description='Tapahtumiin voit tallentaa niin pienet kuin suuremmat remontit joita taloosi tehdään tai on tehty. Lisää muutama hyvä kuva, kirjoita kattava kuvaus remontista ja liitteisiin vielä laskut ja muut kuitit.'
              imageUrl='/features/event.png'
            />

            <FeatureItem
              title='Kulutus'
              description='Pidä kirjaa talosi juoksevista kuluista, kuten lämmitys- vesi- ja sähkökulut.'
              imageUrl='/features/utility.png'
            />

            <FeatureItem
              title='Tiedostot'
              description='Pidä kiinteistösi tiedostot ja kuvat säästössä samassa paikassa, esimerkiksi rakennuspiirustukset, tontin lunastuskuitti vuosien takaa jne.'
              imageUrl='/features/files.png'
            />
          </div>
        </div>
      </div>
    </section>
  );
};
