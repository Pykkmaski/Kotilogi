'use client';

import { useSession } from "next-auth/react";
import { Content, Header } from "./page.components";
import style from './page.module.scss';

export default function Page(){
    const session = useSession();
    if(!session.data || !session.data.user) return <h3>Ladataan tilin asetuksia...</h3>
    
    return (
        <main className={style.page}>
            <Header/>
            <Content user={session.data.user}/>
        </main>
    )
}