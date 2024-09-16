import { Heading } from './Heading';
import { Paragraph } from './Paragraph';
import { TextContainer } from './TextContainer';

export const Story = () => {
  return (
    <section className='py-36 lg:px-36 flex xs:flex-col xl:flex-row w-full bg-gray-800 2xl:px-36 xs:px-4 gap-24 text-white xs:items-center xl:items-start'>
      <TextContainer>
        <Heading>Idea omasta tarpeesta</Heading>
        <Paragraph>
          Jani Ö ja Marika L ostivat rintamamiestalon Vaasassa vuonna 2021.
          <br />
          Omaa kotia etsiessä kiinnittyi huomio siihen kuinka monissa varteen otettavissa
          vaihtoehdoissa oli historia vähän hämärän peitossa.
          <br />
          Tehtyjä korjauksia oli selkeästi tehty mutta tositteita ei ollut enää tallella.
          <br />
          <br />
          Ostamassaan kohteessa oli se hyvä puoli että suurin osa tositteista löytyi isossa mapissa
          säilytettynä.
          <br /> Tämä tarkkuus johtuu varmasti Janin ammatista jossa huoltokuittien tarkistaminen on
          arkipäivää. <br />
          Taloa tuli remontoitua heti oston jälkeen nopeasti oman maun mukaisesti. Myös suurempia
          peruskorjauksia tuli tehtyä, salaojat ja lämmitysmuodon vaihdos öljystä kaukolämpöön.
          <br />
          <br />
          Laskut tuli pyydettyä aina sähköpostilla että ne sai säilytettyä tietokoneelle.
          <br />
          Tositteille oli käyttöä kotitalousvähennystä hakiessa sekä ely-keskukselta haettavaan
          tukeen lämmitysmuodon vaihdosta varten.
          <br /> Syntyi idea että kyllä taloillakin täytyisi olla sähköinen huoltokirja missä nämä
          tositteet säilyisi varmasti myös seuraavalle omistajalle vuosien päästä.
        </Paragraph>
      </TextContainer>
      <img
        alt='story-image'
        loading='lazy'
        src='/img/about_page/house.jpg'
        className='aspect-auto w-auto xl:h-[400px] xs:h-[250px] sm:h-[350px] shadow-md rounded-xl'
      />
    </section>
  );
};
