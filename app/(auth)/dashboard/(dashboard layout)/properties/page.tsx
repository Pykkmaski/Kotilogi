import { getServerSession } from "next-auth";
import db from "kotilogi-app/dbconfig";
import { options } from "kotilogi-app/app/api/auth/[...nextauth]/options";
import { Content } from "./page.components";
import * as database from '@/actions/database';

/**A page-component fetching property data for the logged in user and renders a 
 * header containing controls as well as a Gallery-component to render the properties.
 */
export default async function PropertiesPage({searchParams}: any){
    const session = await getServerSession(options as any) as {user: {email: string}};
    if(!session) throw new Error('Pääsy evätty!');

    const propertyData = await database.get('properties', {refId: session.user.email} as Partial<Kotilogi.PropertyType>) as unknown as Kotilogi.PropertyType[];
    
    return <Content propertyData={propertyData} user={session.user}/>
}