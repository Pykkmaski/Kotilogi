import { serverGetDataById } from 'kotilogi-app/actions/serverGetData';
import styles from './page.module.scss';
import { throwErrorIfNull } from 'kotilogi-app/utils/throwErrorIfNull';
import Link from 'next/link';

export default async function InfoPage({params}){
    const property = await serverGetDataById(params.property_id, 'properties') as Kotilogi.PropertyType | null;
    throwErrorIfNull(property, 'Talon lataamienn epäonnistui!');

    const backgroundImage = `url(/api/files?dbTableName=propertyImages&id=${property?.mainImageId})`
    
    return (
        <div className={styles.container} style={{backgroundImage, backgroundSize: 'cover'}}>
            <Link href="edit" className={styles.editLink}>Muokkaa</Link>

            <div className={styles.subContainer}>
                <div className={styles.titleContainer} style={undefined}>
                    <h1>{property?.title}</h1>
                    <small>{property?.refId}</small>
                    <p>
                        {property!.description}
                    </p>
                </div>

                <div className={styles.infoContainer}>
                    <span>
                        Talotyyppi: 
                        <span className={styles.value}> {property!.buildingType}</span>
                    </span>

                    <span>
                        Rakennusvuosi: 
                        <span className={styles.value}> {property!.buildYear}</span>
                    </span>

                    <span>
                        Energialuokka: 
                        <span className={styles.value}> {property!.energyClass}</span>
                    </span>

                    <span>
                        Rakennusmateriaali: 
                        <span className={styles.value}> {property!.buildingMaterial}</span>
                    </span>
                </div>
            </div>
            
        </div>
    );
}