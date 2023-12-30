import { getServerSession } from "next-auth";
import { options } from "../../api/auth/[...nextauth]/options";
import style from './page.module.scss';
import PropertiesGallery from "kotilogi-app/components/new/Gallery/PropertiesGallery/PropertiesGallery";

type SessionType = {
    user: {
        email: string
    },
} | null;

export default async function PropertiesPage({searchParams}){
    const session: SessionType = await getServerSession(options);
    if(!session) throw new Error('Failed to fetch logged in user!');

    return (
        <main className={style.page}>
            <div className={style.gradient}/>
            <div className={style.bgImage}/>

            <PropertiesGallery ownerId={session.user.email}/>
        </main>
    );
}