import { getServerSession } from "next-auth";
import PropertiesGallery from "kotilogi-app/components/new/Gallery/PropertiesGallery/PropertiesGallery";
import { options } from "kotilogi-app/app/api/auth/[...nextauth]/options";

type SessionT = {
    user: {
        email: string
    },
};

export default async function Page({searchParams}){
    const session = await getServerSession(options) as SessionT | null;
    if(!session) throw new Error('You need to be logged in to view this page!');

    return (
        <PropertiesGallery ownerId={session.user.email}/>
    );
}