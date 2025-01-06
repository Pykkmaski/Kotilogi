'use client';

import Link from 'next/link';
import { createInlineStyleObjectFromString } from 'kotilogi-app/utils/createInlineStyleObjectFromString';
import { Logo } from '@/components/App/Logo';
import { ReactNode } from 'react';
import {
  Add,
  Bolt,
  BoltOutlined,
  Check,
  Handshake,
  HandshakeOutlined,
  Settings,
  SettingsOutlined,
} from '@mui/icons-material';
import tailwindconfig from 'tailwind.config';
import * as colors from '@/colors';
import { Hero } from '@/components/WFIndex/Hero';
import { IndexHeader } from './IndexHeader';
import { IndexPageProvider, useIndexPageContext } from './IndexPageProvider';
import { ServicesSection } from '@/components/WFIndex/ServicesSection';
import { Footer } from '@/components/WFIndex/Footer';
import { CTAHeading, CTAParagraph } from '@/components/WFIndex/BaseCTASection';
import { WFAuthInput, WFAuthTextArea } from '../(userAuth)/_components/WFAuthInput';
import { PrimaryButton } from '@/components/WFIndex/Button';

function StorySection() {
  return (
    <section
      id='story-section'
      className='px-wf-index py-wf-index w-full flex items-center justify-center'>
      <div className='flex flex-col gap-8 max-w-[50rem]'>
        <h2 className='text-wf-primary'>Kotidok jutut</h2>
        <h1 className='text-white text-6xl font-semibold'>Idea omasta tarpeesta</h1>
        <p className='text-white opacity-75'>
          Omaa kotia etsiessä kiinnittyi huomio siihen kuinka monissa varteen otettavissa
          vaihtoehdoissa oli historia vähän hämärän peitossa. Tehtyjä korjauksia oli selkeästi tehty
          mutta tositteita ei ollut enää tallella. Lopulta ostetussa kohteessa oli se hyvä puoli
          että suurin osa tositteista löytyi isossa mapissa säilytettynä. Taloa tuli remontoitua
          heti oston jälkeen nopeasti oman maun mukaisesti. Myös suurempia peruskorjauksia tuli
          tehtyä, salaojat ja lämmitysmuodon vaihdos öljystä kaukolämpöön. Laskut tuli pyydettyä
          aina sähköpostilla että ne sai säilytettyä tietokoneelle. Tositteille oli käyttöä
          kotitalousvähennystä hakiessa sekä ely-keskukselta haettavaan tukeen lämmitysmuodon
          vaihdosta varten. Syntyi idea että kyllä taloillakin täytyisi olla sähköinen huoltokirja
          missä nämä tositteet säilyisi varmasti myös seuraavalle omistajalle vuosien päästä.
        </p>
      </div>
    </section>
  );
}

function CallToActionSection() {
  return (
    <section className='px-wf-index bg-wf-cta flex flex-col justify-center items-center py-wf-index relative'>
      <div className='absolute top-0 left-0 w-full h-full z-10 bg-[#000a]' />
      <div className='bg-cta grayscale bg-cover w-full h-full z-0 absolute top-0 left-0 xl:bg-[center_top_900px]' />
      <div className='flex flex-col gap-8 items-center z-20'>
        <CTAHeading>
          Aloita sinäkin
          <br /> Kotidokin käyttö
        </CTAHeading>
        <CTAParagraph>Kotidokin käyttö yksityishenkilöille on ilmaista.</CTAParagraph>
        <div className='flex justify-center'>
          <Link href='/register'>
            <button className='p-4 bg-wf-primary text-black rounded-lg'>Rekisteröidy</button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { contactRef } = useIndexPageContext();

  return (
    <section
      ref={contactRef}
      id='contact-section'
      className='px-wf-index py-wf-index w-full'>
      <div className='grid grid-cols-2 grid-rows-1 gap-4'>
        <div className='flex flex-col gap-4'>
          <h1 className='text-7xl text-white font-semibold'>
            Ota Yhteyttä
            <br />
            <div className='bg-gradient-to-r from white via-white to-wf-primary-light bg-clip-text text-transparent'>
              Kotidok tiimiin
            </div>
          </h1>
          <p className='text-2xl opacity-75 text-white'>
            Heräsikö kysyttävää? Ota meihin yhteyttä kirjoittamalla viestisi vierellä olevaan
            laatikkoon tai lähetä meille sähköpostia osoitteeseen{' '}
            <Link href='mailto:kotidok.service@gmail.com'>kotidok.service@gmail.com.</Link>
          </p>
        </div>
        <div
          id='contact-form-container'
          className='flex w-full'>
          <form className='flex flex-col gap-4 w-full'>
            <WFAuthInput
              name='name'
              placeholder='Nimi'
            />
            <WFAuthInput
              name='email'
              placeholder='Sähköpostiosoite'
              required
            />
            <WFAuthTextArea
              name='message'
              placeholder='Viesti'
            />

            <button className='px-4 py-5 bg-wf-primary rounded-md text-center'>Lähetä</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default async function IndexPage() {
  return (
    <main className='bg-wf-background h-full flex flex-col w-full'>
      <IndexHeader />
      <Hero />
      <ServicesSection />
      <StorySection />
      <CallToActionSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
