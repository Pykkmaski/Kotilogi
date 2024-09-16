import Image from 'next/image';
import { Paragraph } from './Paragraph';
import { Heading } from './Heading';

export const Introduction = () => {
  return (
    <section className='flex xs:items-center xl:items-start xl:flex-row xs:flex-col-reverse w-full 2xl:px-36 xs:px-4 py-36 bg-white gap-24'>
      <img
        alt='introduction-image'
        loading='lazy'
        src='/img/kotidok_example.png'
        className='aspect-auto w-[500px] shadow-md rounded-xl'
      />

      <div className='flex flex-col gap-8'>
        <Heading>Mikä Kotidok?</Heading>
        <Paragraph>
          Kotidok on ensimmäinen palvelu, joka tarjoaa sinulle mahdollisuuden tallentaa kaikki
          kotisi remontit, kulutustiedot, ylläpitotoimenpiteet ja niihin liittyvät asiakirjat yhteen
          paikkaan - digitaaliseen huoltokirjaan.
          <br />
          Kun talosi myynti koittaa voit siirtää koko historian seuraavalle omistajalle.
        </Paragraph>
      </div>
    </section>
  );
};
