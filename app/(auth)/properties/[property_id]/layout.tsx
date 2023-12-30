import style from './layout.module.scss';
import db from 'kotilogi-app/dbconfig';
import PropertyContextProvider from './_util/PropertyContextProvider';
import NavBar from './_components/NavBar';
import { isUserTheOwnerOfProperty } from 'kotilogi-app/actions/isUserTheOwnerOfProperty';
import { getServerSession } from 'next-auth';
import { options } from 'kotilogi-app/app/api/auth/[...nextauth]/options';

export default async function Layout({children, params}){
    const property = await db('properties').where({id: params.property_id}).first();
    if(!property) throw new Error('Failed to load property!');

    const session = await getServerSession(options) as {user: {email: string}};
    if(!session) throw new Error('Failed to fetch user session!');

    const isLoggedInUserTheOwner = await isUserTheOwnerOfProperty(session.user.email, property.id);
    if(!isLoggedInUserTheOwner) throw new Error('You are not allowed to view this property!');
    
    const contextValue = {
        property,
    }

    return (
        <PropertyContextProvider value={contextValue}>
            <div className={style.propertyLayout}>
                <div className={style.layoutHeader}>
                    <h1>{property.title}</h1>
                </div>
                <div className={style.subCointainer}>
                    <NavBar/>
                    <section className={style.bodySection}>
                        {children}
                    </section>
                </div>
            </div>
        </PropertyContextProvider>
    )
}