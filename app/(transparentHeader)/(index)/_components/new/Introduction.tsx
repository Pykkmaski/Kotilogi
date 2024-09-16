import Image from 'next/image';
import { Paragraph } from './Paragraph';
import { Heading } from './Heading';
import { TextContainer } from './TextContainer';

export const Introduction = () => {
  return (
    <section className='flex xs:items-center xl:items-start xl:flex-row xs:flex-col-reverse w-full lg:px-36 2xl:px-36 xs:px-4 py-36 bg-white gap-24'>
      <img
        alt='introduction-image'
        loading='lazy'
        src='/img/kotidok_example.png'
        className='aspect-auto w-[500px] shadow-md rounded-xl'
      />

      <TextContainer>
        <Heading>Mikä Kotidok?</Heading>
        <Paragraph>
          Kotidok on ensimmäinen palvelu, joka tarjoaa sinulle mahdollisuuden tallentaa kaikki
          kotisi remontit, kulutustiedot, ylläpitotoimenpiteet ja niihin liittyvät asiakirjat yhteen
          paikkaan - digitaaliseen huoltokirjaan.
          <br />
          Kun talosi myynti koittaa voit siirtää koko historian seuraavalle omistajalle.
        </Paragraph>
      </TextContainer>
    </section>
  );
};
