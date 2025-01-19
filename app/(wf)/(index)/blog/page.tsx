import { Footer } from '@/components/WFIndex/Footer';
import { Header } from '@/components/WFIndex/Header';
import { IndexHeader } from '../IndexHeader';

export default async function BlogPage() {
  return (
    <main className='bg-wf-background h-full flex flex-col w-full'>
      <IndexHeader />
      <section
        id='blog-hero'
        className='flex flex-col gap-12 px-wf-index py-wf-index'>
        <div className='flex flex-col gap-12 items-start'>
          <h1 className='text-white text-7xl'>
            Kotidok uutiset ja
            <br />
            <div className='bg-gradient-to-r from-white to-wf-primary-light text-transparent bg-clip-text'>
              artikkelit
            </div>
          </h1>
        </div>
      </section>

      <section
        id='blog-entries-section'
        className='flex flex-col gap-8 px-wf-index py-wf-index'>
        <div className='flex flex-col gap-8'>
          <div className='flex flex-col'>
            <h1 className='text-white text-5xl font-semibold'>Idea omasta tarpeesta</h1>
            <span className='text-wf-primary'>19.01.2025</span>
          </div>

          <p className='text-white opacity-75'>
            Omaa kotia etsiessä kiinnittyi huomio siihen kuinka monissa varteen otettavissa
            vaihtoehdoissa oli historia vähän hämärän peitossa. Tehtyjä korjauksia oli selkeästi
            tehty mutta tositteita ei ollut enää tallella. Lopulta ostetussa kohteessa oli se hyvä
            puoli että suurin osa tositteista löytyi isossa mapissa säilytettynä. Taloa tuli
            remontoitua heti oston jälkeen nopeasti oman maun mukaisesti. Myös suurempia
            peruskorjauksia tuli tehtyä, salaojat ja lämmitysmuodon vaihdos öljystä kaukolämpöön.
            Laskut tuli pyydettyä aina sähköpostilla että ne sai säilytettyä tietokoneelle.
            Tositteille oli käyttöä kotitalousvähennystä hakiessa sekä ely-keskukselta haettavaan
            tukeen lämmitysmuodon vaihdosta varten. Syntyi idea että kyllä taloillakin täytyisi olla
            sähköinen huoltokirja missä nämä tositteet säilyisi varmasti myös seuraavalle
            omistajalle vuosien päästä.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
