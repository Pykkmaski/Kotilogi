import { Footer } from './Footer';
import { Hero } from './Hero';
import { Introduction } from './Introduction';
import { Story } from './Story';

export default async function HomePage() {
  return (
    <main className='flex flex-col'>
      <Hero />
      <Introduction />
      <Story />
      <Footer />
    </main>
  );
}
