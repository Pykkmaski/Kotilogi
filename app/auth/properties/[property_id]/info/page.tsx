import { serverGetDataById } from 'kotilogi-app/actions/serverGetData';
import styles from './page.module.scss';
import { throwErrorIfNull } from 'kotilogi-app/utils/throwErrorIfNull';
import Link from 'next/link';

export default async function InfoPage({params}){
    const property = await serverGetDataById(params.property_id, 'properties') as Kotilogi.PropertyType | null;
    throwErrorIfNull(property, 'Talon lataamienn epäonnistui!');

    //const backgroundImage = `url(/api/files?dbTableName=propertyImages&id=${property?.mainImageId})`
    
    return (
        <div className={styles.container}>
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
                    <span className={styles.infoEntry}>
                        Talotyyppi: 
                        <span className={styles.value}> {property!.buildingType}</span>
                    </span>

                    <span className={styles.infoEntry}>
                        <span>Rakennusvuosi:</span>
                        <span className={styles.value}> {property!.buildYear}</span>
                    </span>

                    <span className={styles.infoEntry}>
                        Energialuokka: 
                        <span className={styles.value}> {property!.energyClass}</span>
                    </span>

                    <span className={styles.infoEntry}>
                        Rakennusmateriaali: 
                        <span className={styles.value}> {property!.buildingMaterial}</span>
                    </span>

                    <span className={styles.infoEntry}>
                        Huoneiden Lukumäärä:
                        <span className={styles.value}> {property!.roomCount}</span>
                    </span>

                    <span className={styles.infoEntry}>
                        Kerrosten Lukumäärä:
                        <span className={styles.value}> {property!.floorCount}</span>
                    </span>

                    <span className={styles.infoEntry}>
                        Vessojen Lukumäärä:
                        <span className={styles.value}> {property!.wcCount}</span>
                    </span>

                    <span className={styles.infoEntry}>
                        Neliöt:
                        <span className={styles.value}> {property!.livingArea}</span>
                    </span>
                </div>
            </div>
            
        </div>
    );
}