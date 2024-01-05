'use client';

import Form from "kotilogi-app/components/Form/Form";
import { useSession } from "next-auth/react";
import { EmailSettingsForm, Header, PasswordSettingsForm } from "./page.components";
import { useState } from "react";
import style from './page.module.scss';

export default function Page(){
    const session = useSession();
    if(!session.data || !session.data.user) return <h3>Ladataan tilin asetuksia...</h3>
    
    
    return (
        <main className={style.page}>
            <Header/>
            <EmailSettingsForm email={session.data.user.email}/>
            <PasswordSettingsForm/>
        </main>
    )
}