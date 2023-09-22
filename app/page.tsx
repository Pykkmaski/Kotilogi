import WelcomeText from './_components/WelcomeText/WelcomeText';
import AppDescription, { DescriptionElement } from './_components/AppDescription/AppDescription';
import ProfileText from './_components/ProfileText/ProfileText';
import Footer from './_components/Footer/Footer';
import React from 'react';
import Carousel from 'kotilogi-app/components/Carousel/Carousel';
import style from './page.module.scss';

export default function Page(props){
    return (
        <>
            <WelcomeText/>
            <section className={style.description}>
                <AppDescription/>
                <ProfileText/>
            </section>
           
            <Footer/>
        </>
    )
}