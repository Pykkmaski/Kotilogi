import Footer from 'kotilogi-app/components/Pages/Index/Footer/Footer';
import {Hero} from 'kotilogi-app/components/Pages/Index/Hero/Hero';
import ProfileText from 'kotilogi-app/components/Pages/Index/ProfileText/ProfileText';
import { Padding } from 'kotilogi-app/components/Util/Padding';
import { CSSProperties } from 'react';

function HeroGradient(){
    return (
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black to-transparent z-10"/>
    )
}

function HeroBgImage(){
    const style: CSSProperties = {
        background: "url('/index.jpg')",
        backgroundPositionY: 'center',
        backgroundSize: 'cover'
    }

    return (
        <div className="absolute top-0 left-0 w-full h-full z-0" style={style}/>
    )
}

function HeroSection(){
    return (
        <div className="flex flex-row items-center w-full relative pb-10 min-h-[500px]">
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
        <div className="flex w-full justify-center">
            <Footer/>
        </div>
    )
}

export default function HomePage(){
    return (
        <main className="flex-auto">
            <HeroSection/>
            <IntroSection/>
            <ContactSection/>
        </main>
    )
}