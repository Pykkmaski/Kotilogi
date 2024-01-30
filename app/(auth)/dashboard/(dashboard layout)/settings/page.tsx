import { useSession } from "next-auth/react";
import { Content, Header } from "./page.components";
import style from './page.module.scss';
import { getServerSession } from "next-auth";
import { options } from "kotilogi-app/app/api/auth/[...nextauth]/options";

export default async function Page(){
    const session = await getServerSession(options) as {user: {email: string}};
    if(!session) throw new Error('Käyttäjän varmennus epäonnistui!');
    
    return (
        <main className="flex flex-col mb-4 gap-4">
            <Header/>
            <Content user={session.user}/>
        </main>
    )
}