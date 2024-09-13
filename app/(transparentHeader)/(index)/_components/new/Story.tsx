export const Story = () => {
  return (
    <section className='py-36 flex xs:flex-col 3xl:flex-row w-full bg-gray-800 2xl:px-36 xs:px-4 gap-24 text-white items-center'>
      <div className='flex flex-col gap-8'>
        <h2 className='xs:text-4xl 2xl:text-5xl font-semibold xs:text-center 3xl:text-left'>
          Idea omasta tarpeesta
        </h2>
        <p className='text-2xl xs:text-center 2xl:text-start'>
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
        </p>
      </div>
      <img
        alt='story-image'
        loading='lazy'
        src='/img/about_page/house.jpg'
        className='aspect-auto lg:h-[500px] xs:h-[250px] shadow-md rounded-xl'
      />
    </section>
  );
};
