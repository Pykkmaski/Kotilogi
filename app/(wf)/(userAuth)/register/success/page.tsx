import { MainAllCentered } from '@/components/UI/Main';
import { TitleWithParagraphLayout } from '@/components/UI/TitleWithParagraphLayout';
import Link from 'next/link';

export default function RegisterSuccessPage() {
  return (
    <MainAllCentered id='register-success-page'>
      <div className='flex z-30 text-white'>
        <TitleWithParagraphLayout>
          <>Rekisteröityminen onnistui!</>
          <>
            Olemme lähettäneet sähköpostiisi tilisi aktivoinitlinkin.
            <br />
            Linkin saapumiseen voi mennä muutama minuutti. Muista tarkistaa myös roskapostisi.
            <br />
            Jos vahvistuslinkki ei ole saapunut 30min kuluessa, klikkaa{' '}
            <Link
              className='text-wf-primary'
              href='/api/public/users/activate/send'>
              tähän.
            </Link>
          </>
        </TitleWithParagraphLayout>
      </div>
    </MainAllCentered>
  );
}
