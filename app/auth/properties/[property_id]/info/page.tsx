import { serverGetDataById } from 'kotilogi-app/actions/serverGetData';
import styles from './page.module.scss';
import { throwErrorIfNull } from 'kotilogi-app/utils/throwErrorIfNull';
import Link from 'next/link';
import NavBar from 'kotilogi-app/components/NavBar/NavBar';

export default async function InfoPage({params}){
    const property = await serverGetDataById(params.property_id, 'properties') as Kotilogi.PropertyType | null;
    throwErrorIfNull(property, 'Talon lataamienn epäonnistui!');

    //const backgroundImage = `url(/api/files?dbTableName=propertyImages&id=${property?.mainImageId})`
    
    return (
        <div className={styles.container}>
            <Link href="edit" className={styles.editLink}>Muokkaa</Link>

            <div className={styles.subContainer}>
                <div className={styles.titleContainer} style={undefined}>
                    <small>{property?.refId}</small>

                    <p>
                        {property!.description}
                    </p>
                </div>

                <div className={styles.infoContainer}>
                    <span className={styles.infoEntry}>
                        Postinumero: 
                        <span className={styles.value}> {property!.zipCode}</span>
                    </span>

                    <span className={styles.infoEntry}>
                        Talotyyppi: 
                        <span className={styles.value}> {property!.buildingType}</span>
                    </span>

                    <span className={styles.infoEntry}>
                        Väri: 
                        <span className={styles.value}> {property!.color}</span>
                    </span>

                    <span className={styles.infoEntry}>
                        <span>Rakennusvuosi:</span>
                        <span className={styles.value} contentEditable={true}> {property!.buildYear}</span>
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
                        Katto: 
                        <span className={styles.value}> {property!.roofType}</span>
                    </span>

                    <span className={styles.infoEntry}>
                        Katon Materiaali: 
                        <span className={styles.value}> {property!.roofMaterial}</span>
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

                    <span className={styles.infoEntry}>
                        Ensisijainen Lämmitysjärjestelmä:
                        <span className={styles.value}> {property!.primaryHeatingSystem}</span>
                    </span>

                    <span className={styles.infoEntry}>
                        Toissijainen Lämmitysjärjestelmä:
                        <span className={styles.value}> {property!.secondaryHeatingSystem}</span>
                    </span>
                </div>
            </div>
            
        </div>
    );
}