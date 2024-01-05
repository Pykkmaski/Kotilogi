import { getServerSession } from "next-auth";
import style from './page.module.scss';
import db from "kotilogi-app/dbconfig";
import { Gallery } from "kotilogi-app/components/Experimental/Gallery/Gallery";
import { Controls, Header, ItemComponent, NavBar, PropertyPageContext, PropertyPageContextProvider } from "./page.components";
import { useSession } from "next-auth/react";
import { usePropertiesPage } from "./page.hooks";
import { usePageWithData } from "kotilogi-app/components/PageWithData/PageWithData.hooks";
import { PageWithDataWrapper } from "kotilogi-app/components/PageWithData/PageWithData";
import { options } from "kotilogi-app/app/api/auth/[...nextauth]/options";
import { PropertyListItem } from "kotilogi-app/components/ListItem/ListItem";

/**A page-component fetching property data for the logged in user and renders a 
 * header containing controls as well as a Gallery-component to render the properties.
 */
export default async function PropertiesPage({searchParams}){
    const session = await getServerSession(options) as {user: {email: string}};
    if(!session) throw new Error('Pääsy evätty!');

    const properties = await db('properties').where({refId: session.user.email});
    
    return (
        <main className={style.page}>
            <PageWithDataWrapper data={properties}>
                <PropertyPageContextProvider ownerId={session.user.email}>
                    <Header/>
                    <Gallery data={properties} itemComponent={PropertyListItem}/>
                </PropertyPageContextProvider>
            </PageWithDataWrapper>
        </main>
    );
}