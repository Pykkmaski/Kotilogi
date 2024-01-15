import { getServerSession } from "next-auth";
import style from './page.module.scss';
import db from "kotilogi-app/dbconfig";
import { options } from "kotilogi-app/app/api/auth/[...nextauth]/options";
import { DataProvider } from "kotilogi-app/components/Experimental/DataProvider/DataProvider";
import { PropertyListItem } from "kotilogi-app/components/ListItem/ListItem";
import { Content } from "./page.components";
import { Gallery } from "kotilogi-app/components/new/Gallery/GalleryBase/Gallery";

/**A page-component fetching property data for the logged in user and renders a 
 * header containing controls as well as a Gallery-component to render the properties.
 */
export default async function PropertiesPage({searchParams}){
    const session = await getServerSession(options) as {user: {email: string}};
    if(!session) throw new Error('Pääsy evätty!');

    const properties = await db('properties').where({refId: session.user.email}) as Kotilogi.PropertyType[];
    
    return <Content properties={properties} user={session.user}/>
}