import { getServerSession } from "next-auth";
import PropertiesGallery from "./_components/PropertiesGallery";
import GalleryProvider from 'kotilogi-app/contexts/GalleryProvider';
import { options } from "../api/auth/[...nextauth]/options";

export async function getServerSideProps(context){
    const session = await getServerSession(options);
    if(!session){
        return {
            redirect : {
                destination: '/login',
                permanent: false,
            }

        }
    }

    return {
        props: {
            session,
        }
    }
}

export default async function PropertiesPage({session, params}){
    console.log(params);
    
    return (
        <GalleryProvider apiRoute={`/api/properties/owner/${session.user.email}`}>
            <PropertiesGallery />
        </GalleryProvider>
        
    );
}