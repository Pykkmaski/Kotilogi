export const Introduction = () => {
  return (
    <section className='flex flex-row w-full px-[100px] py-[100px] bg-white gap-[100px]'>
      <img
        loading='lazy'
        src='/img/kotidok_example.png'
        className='aspect-auto w-[80%] shadow-md rounded-[10px]'
      />
      <div className='flex flex-col gap-4'>
        <h2 className='text-[36px] font-semibold'>Mikä Kotidok?</h2>
        <p className='text-[24px]'>
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
