import { getServerSession } from "next-auth";
import style from './page.module.scss';
import PropertiesGallery from "kotilogi-app/components/new/Gallery/PropertiesGallery/PropertiesGallery";
import { options } from "kotilogi-app/app/api/auth/[...nextauth]/options";

type SessionType = {
    user: {
        email: string
    },
} | null;

export default async function Page({searchParams}){
    const session: SessionType = await getServerSession(options);
    if(!session) throw new Error('Failed to load dashboard!');

    return (
        <PropertiesGallery ownerId={session.user.email}/>
    );
}