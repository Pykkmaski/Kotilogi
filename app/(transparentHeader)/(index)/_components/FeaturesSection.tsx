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
          title='Kulutusseuranta'
          description='Voit tallentaa talosi sähkön, lämmityksen ja veden kulutuksen ja seurata kokonaismenoja helposti.'
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
    icon,
    description,
  }: {
    title: string;
    description: string;
    icon: React.ReactElement;
  }) => {
    return (
      <div className='flex flex-col gap-4 w-full'>
        <div className='flex gap-4 items-center xs:justify-center xl:justify-start w-full'>
          {React.cloneElement(icon, {
            ...icon.props,
            sx: {
              fontSize: '2rem',
            },
          })}
          <h1 className='xl:text-3xl xs:text-2xl'>{title}</h1>
        </div>
        <p className='text-xl xs:text-center xl:text-left'>{description}</p>
      </div>
    );
  };

  return (
    <section className='w-full xl:px-64 xs:px-2 bg-secondary text-white xl:py-32 xs:py-8 flex flex-col gap-4'>
      <div className='flex-col flex gap-4'>
        <h1 className='xl:text-7xl xs:text-3xl mb-20 z-10 font-semibold w-full text-center'>
          Kaikki yhdessä paikassa
        </h1>
        <div className='xl:grid xl:grid-flow-row xl:grid-cols-2 xs:flex xs:flex-col gap-16 w-full'>
          <FeatureItem
            title='Tiedot'
            description='Tallenna kiinteistösi tai huoneistosi tiedot myöhempää viittausta varten.'
            icon={<Info />}
          />
          <FeatureItem
            title='Tapahtumat'
            description='Tapahtumiin voit tallentaa niin pienet kuin suuremmat remontit joita taloosi tehdään tai on tehty. Lisää muutama hyvä kuva, kirjoita kattava kuvaus remontista ja liitteisiin vielä laskut ja muut kuitit.'
            icon={<History />}
          />

          <FeatureItem
            title='Tiedostot'
            description='Pidä kiinteistösi tiedostot ja kuvat säästössä samassa paikassa, esimerkiksi rakennuspiirustukset, tontin lunastuskuitti vuosien takaa jne.'
            icon={<FileCopy />}
          />

          <FeatureItem
            title='Kulutus'
            icon={<Bolt />}
            description='Kulutusosiossa saat seurattua kiinteistösi kulumenoja. Saat lisättyä tärkeimmät: sähkö, vesi ja lämmityskulut.'
          />
        </div>
      </div>
    </section>
  );
};
