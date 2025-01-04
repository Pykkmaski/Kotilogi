'use client';

import { Bolt, Check, Handshake, Settings } from '@mui/icons-material';
import { useIndexPageContext } from 'kotilogi-app/app/IndexPageProvider';
import colors from 'kotilogi-app/colors';
import { ReactNode } from 'react';

type ServiceCardProps = {
  title: string;
  description: string;
  icon: (props: any) => ReactNode;
  rowSpan?: number;
};

function ServiceCard({ title, description, icon: Icon, rowSpan = 3 }: ServiceCardProps) {
  const className = [
    'rounded-lg bg-wf-secondary p-10 flex flex-col justify-between items-start gap-8 box-border',
    rowSpan == 4 ? 'row-span-3' : 'row-span-2',
  ].join(' ');

  const iconStyle = {
    color: colors['wf-primary'],
    width: '2rem',
    height: '2rem',
  };

  return (
    <div className={className}>
      <Icon sx={iconStyle} />
      <div className='flex flex-col gap-2'>
        <h1 className='text-white text-[2rem]'>{title}</h1>
        <p className='text-white opacity-75'>{description}</p>
      </div>
    </div>
  );
}

export function ServicesSection() {
  const { aboutRef } = useIndexPageContext();

  return (
    <section
      id='services-section'
      className='gap-10 w-full px-wf-index py-wf-index'
      ref={aboutRef}>
      <div
        id='services-content-container'
        className='flex flex-col gap-8 justify-center'>
        <div
          id='services-heading-container'
          className='bg-gradient-to-r from-white to-wf-primary bg-clip-text text-transparent'>
          <h1
            id='services-section-heading'
            className='text-5xl font-semibold'>
            Kotidokin toiminnot
          </h1>
        </div>

        <div
          id='services-grid'
          className='xs:flex xs:flex-col lg:grid lg:grid-cols-2 lg:grid-rows-[124px_124px_124px_124px_124px] auto-rows-min gap-5 grid-flow-row'>
          <ServiceCard
            title='Korjaushistoria'
            description='Oli sitten kyseessä suurempi peruskorjaus tai sitten vaan huoltomaalaus tai seinän tapetointi. Kannattaa se merkitä sähköiseen huoltokirjaan. Vuosien päästä kun olisi värikoodille tarvetta on se kätevä tarkistaa kotidokista.'
            icon={Check}
            rowSpan={4}
          />
          <ServiceCard
            title='Kulutus'
            description='Onkohan talon lisäeristys vaikuttanut lämmityskuluihin vuoden takaisesta? Seuraa kotisi juoksevia kuluja kulutusosion avulla. Sinne voit tallentaa niin sähkö, lämmitys kuin veden kulutustiedot.'
            icon={Bolt}
          />

          <ServiceCard
            title='Omistushistoria'
            description='Kun koittaa se päivä että olet ajatellut pistää talon myyntiin voi siitä olla huomattava etu että sinulla on kattava huoltohistoria jonka voit välittää seuraavalle omistajalle. Myös kiinteistönvälittäjäsi kiittää kun talon kunto ja arvo on helposti määriteltävissä. '
            icon={Handshake}
            rowSpan={4}
          />
          <ServiceCard
            title='Huoltoraportti'
            description='Esimerkiksi kun tulee tilanne että olet kilpailuttamassa kotivakuutusta. Ota kotidokista huoltoraportti pihalle ja lähetä se vakuutusyhtiölle. Tästä he saavat kattavat tiedot tehdyistä korjauksista.'
            icon={Settings}
          />
        </div>
      </div>
    </section>
  );
}
