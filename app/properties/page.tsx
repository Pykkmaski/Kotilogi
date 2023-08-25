import { getServerSession } from "next-auth";
import PropertiesGallery from "./_components/PropertiesGallery";
import { options } from "../api/auth/[...nextauth]/options";
import db from "kotilogi-app/dbconfig";
import GalleryProvider from "kotilogi-app/contexts/GalleryProvider";

export async function getServerSideProps(context){
    console.log('Running getServerSideProps');
}

type SessionType = {
    user: {
        email: string
    },
} | null;

export default async function PropertiesPage({params}){
    const session: SessionType = await getServerSession(options);
    const properties = await db('properties').where({owner: session!.user.email});

    return (
        <GalleryProvider>
            <PropertiesGallery properties={properties}/>
        </GalleryProvider>
    );
}