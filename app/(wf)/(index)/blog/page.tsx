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
          <p className='text-xl opacity-75 text-white'>
            Sivusto on vielä työn alla. Tulemme tulevaisuudessa julkaisemaan tälle
            <br /> sivulle aiheeseen liittyviä uutisia sekä artikkeleita.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
