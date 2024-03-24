import Footer from 'kotilogi-app/components/HomePage/Footer/Footer';
import {Hero} from 'kotilogi-app/components/HomePage/Hero';
import ProfileText from 'kotilogi-app/components/HomePage/ProfileText';
import { Padding } from 'kotilogi-app/components/Util/Padding';
import { CSSProperties } from 'react';
import { HeroSection as HeroSection2 } from '@/components/HomePage2/HeroSection';
import { Profile2 } from '@/components/HomePage2/Profile2';
import { DescriptionSection } from '@/components/HomePage2/DescriptionSection';
import { CallToActionSection } from '@/components/HomePage2/CallToActionSection';
import { IndexHeader } from '@/components/App/IndexHeader';

function HeroGradient(){
    return (
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r opacity-50 from-black to-transparent z-10"/>
    )
}

function HeroBgImage(){
    const style: CSSProperties = {
        background: "url('/index_blur.jpg')",
        backgroundPositionY: 'center',
        backgroundSize: 'cover'
    }

    return (
        <div className="absolute top-0 left-0 w-full h-full z-0" style={style}/>
    )
}

function HeroSection(){
    return (
        <div className="flex flex-row items-center w-full relative py-32 min-h-[500px]">
            <HeroBgImage/>
            <HeroGradient/>
            <div className="mt-10 z-20">
                <Padding>
                    <Hero/>
                </Padding>
            </div>
        </div>
    );
}

function IntroBg(){
    return <div className="bg-houses z-0 w-full h-full absolute top-0"/>
}

function IntroGradient(){
    return <div className="z-10 absolute top-0 w-full h-full bg-gradient-to-r from-slate-200 via-slate-200 to-transparent"/>
}

function IntroSection(){
    return (
        <div className="pt-10 pb-10 flex w-full relative">
            <IntroBg/>
            <IntroGradient/>
            <div className="z-20">
                <Padding>
                    <ProfileText/>
                </Padding>
            </div>
        </div>
    );
}

function ContactSection(){
    return (
        <div className="flex w-full">
            <Footer/>
        </div>
    )
}

function Customers(){

    type CustomerType = {
        name: string;
        imageUrl: string;
        text?: string;
    }

    const customerItems: CustomerType[] = [
        {
            name: 'Asiakas 1',
            imageUrl: '/',
            text: `    Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, repellendus incidunt pariatur et sunt neque iure. Maxime assumenda eius provident? Adipisci libero rerum eveniet temporibus, ad nisi perspiciatis impedit ullam.
            Non molestias dignissimos eos, impedit iusto deleniti. Earum quaerat animi, ducimus repellat fuga quidem consectetur nulla velit distinctio iure ut a, exercitationem nobis est accusantium reprehenderit commodi sequi mollitia excepturi.
            Natus hic, eligendi saepe magni reiciendis nostrum praesentium voluptatum neque nihil tenetur. Dignissimos vitae pariatur expedita accusamus explicabo eius, adipisci, fugit delectus facilis qui animi sit est id, corporis officiis?
        `
        },

        {
            name: 'Asiakas 2',
            imageUrl: '/',
            text: `    Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, repellendus incidunt pariatur et sunt neque iure. Maxime assumenda eius provident? Adipisci libero rerum eveniet temporibus, ad nisi perspiciatis impedit ullam.
            Non molestias dignissimos eos, impedit iusto deleniti. Earum quaerat animi, ducimus repellat fuga quidem consectetur nulla velit distinctio iure ut a, exercitationem nobis est accusantium reprehenderit commodi sequi mollitia excepturi.
            Natus hic, eligendi saepe magni reiciendis nostrum praesentium voluptatum neque nihil tenetur. Dignissimos vitae pariatur expedita accusamus explicabo eius, adipisci, fugit delectus facilis qui animi sit est id, corporis officiis?
        `
        },
    ];

    const CustomerProfile = ({imageUrl, name, flipped, text}) => {

        const className = [
            "flex gap-8 w-full justify-center",
            flipped ? 'flex-row-reverse' : 'flex-row',
        ];

        const textClassName = [
            'text-5xl w-full',
        ];

        const pClassName = [
            'text-lg',
        ];

        return (
            <div className={className.join(' ')}>
                <div className="object-contain w-[500px]">
                    <img src={imageUrl} className="aspect-auto flex-1 object-contain"/>
                </div>
                
                <div className="flex flex-col gap-4 flex-1">
                    <h2 className={textClassName.join(' ')}>{name}</h2>
                    <p className={pClassName.join(' ')}>
                        {text}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <section className="flex flex-col px-64 py-20 bg-primary gap-32">
            <h1 className="text-7xl text-secondary text-center mb-32">Mitä asiakkaamme sanovat?</h1>
            {
                customerItems.map((item, index) => {
                    return (
                        <CustomerProfile imageUrl={'/blank_profile.png'} name={item.name} text={item.text} flipped={index % 2 == 0}/>
                    )
                })
            }
        </section>
    )
}

export default function HomePage(){
    return (
        <main>
            <HeroSection/>
            <Profile2/>
            <DescriptionSection/>
            <Customers/>
            <CallToActionSection/>
            <ContactSection/>
        </main>
    );

}