import { CallToAction } from './_components/CallToAction';
import { Footer } from './_components/Footer';
import { Hero } from './_components/Hero';
import { HouseProfile } from './_components/HouseProfile';
import { Profile } from './_components/Profile';

export default function AboutPage() {
  return (
    <>
      <main className='bg-primary'>
        <Hero />
        <Profile />
        <HouseProfile />
        <CallToAction />
      </main>

      <Footer />
    </>
  );
}
