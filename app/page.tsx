import WelcomeText from './_components/WelcomeText/WelcomeText';
import AppDescription from './_components/AppDescription/AppDescription';
import ProfileText from './_components/ProfileText/ProfileText';
import Footer from './_components/Footer/Footer';
import React from 'react';

export default function Page(props){
    return (
        <>
            <WelcomeText/>
            <AppDescription/>
            <ProfileText/>
            <Footer/>
        </>
    )
}