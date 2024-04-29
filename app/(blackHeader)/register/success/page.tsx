import { Padding } from '@/components/UI/Padding';

export default function RegisterSuccessPage() {
  return (
    <main
      id='register-success-page'
      className='flex flex-col justify-center items-center h-full px-32 flex-1'>
      <div className='flex flex-col'>
        <h1 className='text-5xl mb-4'>Rekisteröityminen onnistui!</h1>
        <p className='text-lg text-slate-500'>
          Olemme lähettäneet sähköpostiisi tilisi aktivoinitlinkin.
          <br />
          Linkin saapumiseen voi mennä muutama minuutti. Muista tarkistaa myös roskapostisi.
          <br />
        </p>
      </div>
    </main>
  );
}
