import Footer from 'kotilogi-app/app/(transparentHeader)/(index)/_components/Footer';
import { Hero } from 'kotilogi-app/app/(transparentHeader)/(index)/_components/Hero';
import { Padding } from '@/components/UI/Padding';
import {
  FeaturesSection,
  FeaturesSection2,
} from 'kotilogi-app/app/(transparentHeader)/(index)/_components/FeaturesSection';
import { CallToActionSection } from 'kotilogi-app/app/(transparentHeader)/(index)/_components/CallToActionSection';
import { Introduction } from 'kotilogi-app/app/(transparentHeader)/(index)/_components/Profile';
import { Main } from '@/components/New/Main';

const Logo = () => (
  <img
    src='/hero_logo_white.png'
    className='aspect-auto w-[90%]'
  />
);
const Gradient = () => (
  <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-r from-secondary from-50% to-transparent z-10' />
);

function HeroBgImage() {
  return (
    <div className='absolute top-0 left-0 w-full h-full bg-houses bg-center bg-cover grayscale xs:hidden lg:block' />
  );
}

function HeroSection() {
  return (
    <section className='flex flex-row items-center w-full relative py-32 min-h-[500px] bg-secondary overflow-hidden shadow-lg'>
      <Gradient />
      <HeroBgImage />
      <div className='z-10'>
        <div className='xl:px-64 xs:px-2'>
          <div className='mt-10 flex flex-col-reverse gap-2 lg:items-start xs:items-center'>
            <Hero />
            <div className='flex flex-col gap-2 lg:items-start xs:items-center'>
              <Logo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <div className='flex w-full'>
      <Footer />
    </div>
  );
}

function Customers() {
  type CustomerType = {
    name: string;
    imageUrl: string;
    text?: string;
  };

  const customerItems: CustomerType[] = [
    {
      name: 'Asiakas 1',
      imageUrl: '/',
      text: `    Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, repellendus incidunt pariatur et sunt neque iure. Maxime assumenda eius provident? Adipisci libero rerum eveniet temporibus, ad nisi perspiciatis impedit ullam.
            Non molestias dignissimos eos, impedit iusto deleniti. Earum quaerat animi, ducimus repellat fuga quidem consectetur nulla velit distinctio iure ut a, exercitationem nobis est accusantium reprehenderit commodi sequi mollitia excepturi.
            Natus hic, eligendi saepe magni reiciendis nostrum praesentium voluptatum neque nihil tenetur. Dignissimos vitae pariatur expedita accusamus explicabo eius, adipisci, fugit delectus facilis qui animi sit est id, corporis officiis?
        `,
    },

    {
      name: 'Asiakas 2',
      imageUrl: '/',
      text: `    Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, repellendus incidunt pariatur et sunt neque iure. Maxime assumenda eius provident? Adipisci libero rerum eveniet temporibus, ad nisi perspiciatis impedit ullam.
            Non molestias dignissimos eos, impedit iusto deleniti. Earum quaerat animi, ducimus repellat fuga quidem consectetur nulla velit distinctio iure ut a, exercitationem nobis est accusantium reprehenderit commodi sequi mollitia excepturi.
            Natus hic, eligendi saepe magni reiciendis nostrum praesentium voluptatum neque nihil tenetur. Dignissimos vitae pariatur expedita accusamus explicabo eius, adipisci, fugit delectus facilis qui animi sit est id, corporis officiis?
        `,
    },
  ];

  const CustomerProfile = ({ imageUrl, name, flipped, text }) => {
    const className = [
      'flex gap-8 w-full xs:items-center md:items-start xs:flex-col',
      flipped ? 'md:flex-row-reverse' : 'md:flex-row',
    ];

    const textClassName = ['text-5xl w-full md:text-left xs:text-center'];

    const pClassName = ['text-lg md:text-left xs:text-center'];

    return (
      <div className={className.join(' ')}>
        <div className='object-contain md:w-[500px] xs:w-[300px]'>
          <img
            src={imageUrl}
            className='aspect-auto flex-1 object-contain'
          />
        </div>

        <div className='flex flex-col gap-4 flex-1'>
          <h2 className={textClassName.join(' ')}>{name}</h2>
          <p className={pClassName.join(' ')}>{text}</p>
        </div>
      </div>
    );
  };

  return (
    <section className='flex flex-col md:px-64 xs:px-4 py-20 bg-primary'>
      <h1 className='md:text-7xl xs:text-4xl text-secondary text-center md:mb-32 xs:mb-10'>
        Mitä asiakkaamme sanovat?
      </h1>
      <div className='flex flex-col gap-32'>
        {customerItems.map((item, index) => {
          return (
            <CustomerProfile
              imageUrl={'/blank_profile.png'}
              name={item.name}
              text={item.text}
              flipped={index % 2 == 0}
            />
          );
        })}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main className='flex flex-col w-full'>
      <HeroSection />
      <Introduction />
      <FeaturesSection2 />
      <CallToActionSection />
      <ContactSection />
    </main>
  );
}
