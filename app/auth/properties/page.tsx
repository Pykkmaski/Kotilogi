import { getServerSession } from "next-auth";
import { options } from "../../api/auth/[...nextauth]/options";
import Page from "kotilogi-app/components/Page/Page";
import Link from "next/link";
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
        <Page backgroundUrl="/img/Properties/default-bg.jpg">
            <PropertiesGallery ownerId={session.user.email}/>
        </Page>
    );
}