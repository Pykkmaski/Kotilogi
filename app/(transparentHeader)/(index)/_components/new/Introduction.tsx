export const Introduction = () => {
  return (
    <section className='flex lg:flex-row xs:flex-col-reverse w-full lg:px-24 xs:px-4 py-36 bg-white gap-[100px] xs:items-center lg:items-start'>
      <img
        loading='lazy'
        src='/img/kotidok_example.png'
        className='aspect-auto w-[80%] shadow-md rounded-xl'
      />

      <div className='flex flex-col gap-8'>
        <h2 className='xs:text-4xl lg:text-5xl font-semibold w-full xs:text-center lg:text-start'>
          Mikä Kotidok?
        </h2>
        <p className='text-2xl'>
          Kotidok on ensimmäinen palvelu, joka tarjoaa sinulle mahdollisuuden tallentaa kaikki
          kotisi remontit, kulutustiedot, ylläpitotoimenpiteet ja niihin liittyvät asiakirjat yhteen
          paikkaan - digitaaliseen huoltokirjaan.
          <br />
          Kun talosi myynti koittaa voit siirtää koko historian seuraavalle omistajalle.
        </p>
      </div>
    </section>
  );
};
