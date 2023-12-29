import style from './layout.module.scss';
import db from 'kotilogi-app/dbconfig';
import PropertyContextProvider from './_util/PropertyContextProvider';
import NavBar from './_components/NavBar';

export default async function Layout({children, params}){
    const property = await db('properties').where({id: params.property_id}).first();
    if(!property) throw new Error('Failed to load property!');

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