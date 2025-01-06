import { BaseCTASection, CTAHeading, CTAParagraph } from '@/components/WFIndex/BaseCTASection';
import { Footer } from '@/components/WFIndex/Footer';
import { Header } from '@/components/WFIndex/Header';
import { ServiceCard } from '@/components/WFIndex/ServicesSection';
import { Handshake, Settings, Timer } from '@mui/icons-material';
import Link from 'next/link';

function HeroSection() {
  return (
    <section
      id='business-hero-section'
      className='flex flex-col py-wf-index px-wf-index items-start gap-12'>
      <h1
        id='business-hero-heading'
        className='text-6xl text-white'>
        Rakennusalan
        <div
          id='busines-hero-heading-gradient'
          className='bg-gradient-to-r form-white via-white to-wf-primary-light bg-clip-text text-transparent'>
          ammattilaisille{' '}
        </div>
      </h1>

      <div className='grid grid-cols-3 grid-rows-1 gap-4 w-full'>
        <ServiceCard
          title='Huoltoraportti'
          description='Lisäämällä korjaustoimenpiteet yritystililtä asiakkaiden huoltokirjaan jää siitä luetettavampi jälki historiaan.'
          icon={Settings}
        />

        <ServiceCard
          title='Tarjouspyynnöt'
          description='Vastaanota tarjouspyyntöjä korjaustoimenpiteistä suoraan kotidokin käyttäjiltä.'
          icon={Timer}
        />

        <ServiceCard
          title='Lisäarvoa'
          description='Kun yritykselläsi on käytössä Koidok sähköinen huoltokirja asiakkaat todennäköisesti valitsevat sinun yrityksesi. '
          icon={Handshake}
        />
      </div>
    </section>
  );
}

export default async function BusinessPage() {
  return (
    <main className='bg-wf-background h-full flex flex-col w-full'>
      <Header>
        <Header.LogoContainer logoColor='white'></Header.LogoContainer>
      </Header>
      <HeroSection />
      <BaseCTASection>
        <CTAHeading>
          Yrityspuoli on vielä <br /> työn alla
        </CTAHeading>
        <CTAParagraph>
          Ole meihin yhteydessä mikäli haluat tiedon kun yritystilin
          <br /> voi luoda.
        </CTAParagraph>
        <Link href='/#contact-section'>
          <button className='bg-wf-primary rounded-md px-4 py-5 font-semibold'>Ota yhteyttä</button>
        </Link>
      </BaseCTASection>
      <Footer />
    </main>
  );
}
