import { getServerSession } from "next-auth";
import { options } from "../../api/auth/[...nextauth]/options";
import style from './page.module.scss';
import Gallery from "kotilogi-app/components/Experimental/Gallery/Gallery";
import Modal from "kotilogi-app/components/Modals/Modal";
import Form from "kotilogi-app/components/Form";
import Button from "kotilogi-app/components/Button/Button";
import PropertiesGallery from "kotilogi-app/components/new/Gallery/PropertiesGallery/PropertiesGallery";

type SessionType = {
    user: {
        email: string
    },
} | null;

export default async function PropertiesPage({searchParams}){
    const session: SessionType = await getServerSession(options);
    if(!session) throw new Error('Failed to load dashboard!');

    return (
        <main className={style.page}>
            <div className={style.gradient}/>
            <div className={style.bgImage}/>

            <PropertiesGallery ownerId={session.user.email}/>
        </main>
    );
}