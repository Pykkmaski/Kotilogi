import { MainAllCentered } from '@/components/UI/Main';
import { Padding } from '@/components/UI/Padding';
import { TitleWithParagraphLayout } from '@/components/UI/TitleWithParagraphLayout';

export default function RegisterSuccessPage() {
  return (
    <MainAllCentered id='register-success-page'>
      <TitleWithParagraphLayout>
        <>Rekisteröityminen onnistui!</>
        <>
          Olemme lähettäneet sähköpostiisi tilisi aktivoinitlinkin.
          <br />
          Linkin saapumiseen voi mennä muutama minuutti. Muista tarkistaa myös roskapostisi.
          <br />
        </>
      </TitleWithParagraphLayout>
    </MainAllCentered>
  );
}
