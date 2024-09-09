import { MainAllCentered } from '@/components/UI/Main';
import Link from 'next/link';

export default async function ActivatePage() {
  return (
    <MainAllCentered>
      <h1 className='text-[36px]'>Aktivoi tilisi</h1>
      <p className='text-lg'>
        Et ole vielä aktivoinut tiliäsi. Tarkista sähköpostisi, lähetimme sinulle rekisteröitymisesi
        yhteydessä aktivointilinkin.
        <br />
        Etkö saanut sitä? <Link href='/api/public/users/activate/send'>Klikkaa tähän.</Link>
        <br />
        <br />
        Aktivoimattomat tilit poistetaan kuukauden kuluttua rekisteröitymisestä.
      </p>
    </MainAllCentered>
  );
}
