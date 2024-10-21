import { RenderOnCondition } from '@/components/Util/RenderOnCondition';
import { Footer } from './_components/new/Footer';
import { Hero } from './_components/new/Hero';
import { Introduction } from './_components/new/Introduction';
import { Story } from './_components/new/Story';

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
