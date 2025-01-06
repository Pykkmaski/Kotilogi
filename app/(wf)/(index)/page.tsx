'use client';

import Link from 'next/link';
import { createInlineStyleObjectFromString } from 'kotilogi-app/utils/createInlineStyleObjectFromString';
import { Logo } from '@/components/App/Logo';
import { ReactNode, useState } from 'react';
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
import { useFormOnChangeObject } from '@/hooks/useFormOnChangeObject';
import axios from 'axios';
import { usePreventDefault } from '@/hooks/usePreventDefault';
import { useStatusWithAsyncMethod } from '@/hooks/useStatusWithAsyncMethod';
import { SubLabel } from '@/components/UI/FormUtils';
import { WFAuthSubmitButton } from '../(userAuth)/_components/WFAuthSubmitButton';

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
  const { data: messagePayload, updateData: updateMessagePayload } = useFormOnChangeObject(
    {} as any
  );
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');

  const onSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await axios.post('/api/public/contact', messagePayload);
      if (res && res.status == 200) {
        setStatus('success');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setStatus(prev => (prev == 'loading' ? 'idle' : prev));
    }
  };

  return (
    <section
      ref={contactRef}
      id='contact-section'
      className='px-wf-index py-wf-index w-full'>
      <div className='xl:grid xl:grid-cols-2 xl:grid-rows-1 xs:flex xs:flex-col gap-4'>
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
            <Link
              href='mailto:kotidok.service@gmail.com'
              className='text-wf-primary'>
              kotidok.service@gmail.com.
            </Link>
          </p>
        </div>
        <div
          id='contact-form-container'
          className='flex w-full'>
          <form
            className='flex flex-col gap-4 w-full'
            onSubmit={onSubmit}>
            <WFAuthInput
              name='name'
              placeholder='Nimi'
              onChange={updateMessagePayload}
            />
            <WFAuthInput
              name='email'
              placeholder='Sähköpostiosoite'
              required
              onChange={updateMessagePayload}
            />
            <WFAuthTextArea
              name='message'
              placeholder='Viesti'
              required
              onChange={updateMessagePayload}
            />

            <WFAuthSubmitButton
              type='submit'
              loading={status == 'loading'}
              disabled={status == 'loading' || status == 'success'}>
              Lähetä
            </WFAuthSubmitButton>

            {status == 'success' ? (
              <SubLabel>
                <span className='text-green-400'>Viestin lähetys onnistui!</span>
              </SubLabel>
            ) : status == 'error' ? (
              <SubLabel>
                <span className='text-red-400'>Tapahtui virhe!</span>
              </SubLabel>
            ) : null}
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
