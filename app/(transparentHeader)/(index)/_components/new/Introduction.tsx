import Image from 'next/image';

export const Introduction = () => {
  return (
    <section className='flex xs:items-center 2xl:items-start 2xl:flex-row xs:flex-col-reverse w-full 2xl:px-36 xs:px-4 py-36 bg-white gap-[100px]'>
      <img
        alt='introduction-image'
        loading='lazy'
        src='/img/kotidok_example.png'
        className='aspect-auto w-[50%] shadow-md rounded-xl'
      />

      <div className='flex flex-col gap-8'>
        <h2 className='xs:text-4xl 2xl:text-5xl font-semibold w-full xs:text-center 2xl:text-start'>
          Mikä Kotidok?
        </h2>
        <p className='text-2xl xs:text-center 2xl:text-start'>
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
