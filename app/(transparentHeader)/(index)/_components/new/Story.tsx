export const Story = () => {
  return (
    <section className='flex w-full bg-blue-100 p-24 gap-24'>
      <div className='flex flex-col gap-4'>
        <h2 className='text-3xl font-semibold'>Idea omasta tarpeesta</h2>
        <p className='text-2xl'>
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
        loading='lazy'
        src='/img/about_page/house.jpg'
        className='aspect-auto h-[50%] shadow-md rounded-xl'
      />
    </section>
  );
};
