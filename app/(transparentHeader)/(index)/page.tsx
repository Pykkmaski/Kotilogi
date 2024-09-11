import { Hero } from './_components/new/Hero';
import { Introduction } from './_components/new/Introduction';
import { Story } from './_components/new/Story';

export default function HomePage() {
  return (
    <main className='flex flex-col'>
      <Hero />
      <Introduction />
      <Story />
    </main>
  );
}
