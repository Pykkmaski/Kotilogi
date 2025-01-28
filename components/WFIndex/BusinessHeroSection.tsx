import Settings from '@mui/icons-material/Settings';
import { ServiceCard } from './ServicesSection';
import Timer from '@mui/icons-material/Timer';
import Handshake from '@mui/icons-material/Handshake';

export function BusinessHeroSection() {
  return (
    <section
      id='business-hero-section'
      className='flex flex-col py-wf-index px-wf-index items-start gap-8'>
      <h1
        id='business-hero-heading'
        className='lg:text-5xl xs:text-5xl bg-gradient-to-r from-white via-white to-wf-primary-light bg-clip-text text-transparent'>
        Rakennusalan ammattilaisille
      </h1>

      <div className='grid lg:grid-cols-3 lg:grid-rows-1 xs:grid-cols-1 xs:grid-rows-3 gap-4 w-full'>
        <ServiceCard
          title='Huoltoraportti'
          description='Lisäämällä korjaustoimenpiteet yritystililtä asiakkaiden huoltokirjaan, jää siitä luetettavampi jälki historiaan.'
          icon={Settings}
        />

        <ServiceCard
          title='Tarjouspyynnöt'
          description='Vastaanota tarjouspyyntöjä korjaustoimenpiteistä suoraan kotidokin käyttäjiltä.'
          icon={Timer}
        />

        <ServiceCard
          title='Lisäarvoa'
          description='Kun yritykselläsi on käytössä Kotidok sähköinen huoltokirja, asiakkaat todennäköisesti valitsevat sinun yrityksesi. '
          icon={Handshake}
        />
      </div>
    </section>
  );
}
