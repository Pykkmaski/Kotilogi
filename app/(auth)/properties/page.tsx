import { getServerSession } from "next-auth";
import { options } from "../../api/auth/[...nextauth]/options";
import style from './page.module.scss';
import PropertiesGallery from "kotilogi-app/components/new/Gallery/PropertiesGallery/PropertiesGallery";
import db from "kotilogi-app/dbconfig";
import { Gallery } from "kotilogi-app/components/Experimental/Gallery/Gallery";
import Card from "kotilogi-app/components/new/Gallery/GalleryBase/Components/Body/Components/Card/Card";

type SessionType = {
    user: {
        email: string
    },
} | null;

/**A page-component responsible fro fetching property data fro the logged in user and rendering a 
 * header containing controls as well as a gallery to render the data.
 */
export default async function PropertiesPage({searchParams}){
    const session: SessionType = await getServerSession(options);
    if(!session) throw new Error('Failed to fetch logged in user!');

    const properties = await db('properties').where({refId: session.user.email});

    return (
        <main className={style.page}>
            <div className={style.gradient}/>
            <div className={style.bgImage}/>

            <PropertiesGallery ownerId={session.user.email}/>
        </main>
    );
}