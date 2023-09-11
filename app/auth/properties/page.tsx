import { getServerSession } from "next-auth";
import { options } from "../../api/auth/[...nextauth]/options";
import PropertiesGallery from "kotilogi-app/components/new/Gallery/PropertiesGallery/PropertiesGallery";

type SessionType = {
    user: {
        email: string
    },
} | null;

export default async function PropertiesPage({params}){
    const session: SessionType = await getServerSession(options);

    return (
       <PropertiesGallery 
            ownerId={session!.user.email}
        />
    );
}